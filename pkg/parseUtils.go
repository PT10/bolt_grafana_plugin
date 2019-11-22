package main

import (
	"encoding/json"
	"fmt"
	"time"

	simplejson "github.com/bitly/go-simplejson"
	"github.com/grafana/grafana-plugin-model/go/datasource"
)

func (ds *BoltDatasource) ParseChartResponse(body []byte, resultSeries map[string]datasource.TimeSeries, fields []string, cursor string, mappings map[string]map[string]string) (string, error) {
	jBody, err := simplejson.NewJson(body)
	if err != nil {
		return cursor, err
	}

	nextCursorMark := jBody.Get("nextCursorMark").MustString(cursor)

	arr := jBody.Get("response").Get("docs").MustArray()
	for _, v := range arr {
		j, err := json.Marshal(v)
		if err != nil {
			return nextCursorMark, err
		}

		doc, err := simplejson.NewJson(j)
		if err != nil {
			return nextCursorMark, err
		}

		var jobId string = doc.Get("jobId").MustString("")
		jobId = "Dashboard: " + mappings[jobId]["dashboard"] + ", Panel: " + mappings[jobId]["panel"]

		for _, v := range fields {
			ts := doc.Get("timestamp").MustString()
			unixTs, _ := time.Parse("2006-01-02T15:04:05-0700", ts)
			val := doc.Get(v).MustFloat64()

			p := datasource.Point{
				Value:     val,
				Timestamp: unixTs.Unix() * 1000,
			}

			timeSeriesName := jobId + ", Timeseries: " + v
			var tmp = resultSeries[timeSeriesName]

			if tmp.Name == "" {
				tmp.Name = timeSeriesName
			}

			tmp.Points = append(tmp.Points, &p)

			resultSeries[timeSeriesName] = tmp
		}
	}
	return nextCursorMark, nil
}

func (ds *BoltDatasource) ParseIndvAnomalyFacetResponse(body []byte, resultSeries map[string]datasource.TimeSeries, fields []string, jobIdMappings map[string]map[string]string) error {
	outField := fields[0]
	if fields[0] == "all" {
		outField = "score"
	}

	jBody, err := simplejson.NewJson(body)
	if err != nil {
		return err
	}

	arr := jBody.Get("facets").Get("lineChartFacet").Get("buckets").MustArray()

	for _, v := range arr {
		j, err := json.Marshal(v)
		if err != nil {
			return err
		}

		bucket, err := simplejson.NewJson(j)
		if err != nil {
			return err
		}

		jobId := bucket.Get("val").MustString("")
		jobId = "Dashboard: " + jobIdMappings[jobId]["dashboard"] + ", Panel: " + jobIdMappings[jobId]["panel"]
		aggrFieldsBuckets := bucket.Get("group").Get("buckets").MustArray()
		for _, aggrFieldsBucket := range aggrFieldsBuckets {
			k, err := json.Marshal(aggrFieldsBucket)
			if err != nil {
				return err
			}

			aggrFieldsBucketObj, err := simplejson.NewJson(k)
			if err != nil {
				return err
			}

			aggr_field := aggrFieldsBucketObj.Get("val").MustString()

			seriesName := jobId + ", Timeseries: " + aggr_field
			resultSeries[seriesName] = datasource.TimeSeries{
				Name:   seriesName,
				Points: make([]*datasource.Point, 0),
			}

			aggrFieldsTsBuckets := aggrFieldsBucketObj.Get("timestamp").Get("buckets").MustArray()

			for _, aggrFieldsTsBucket := range aggrFieldsTsBuckets {
				k, err := json.Marshal(aggrFieldsTsBucket)
				if err != nil {
					return err
				}

				aggrFieldsTsBucketObj, err := simplejson.NewJson(k)
				if err != nil {
					return err
				}

				ts := aggrFieldsTsBucketObj.Get("val").MustString()
				unixTs, _ := time.Parse("2006-01-02T15:04:05-0700", ts)

				scoreArr := aggrFieldsTsBucketObj.Get(outField).Get("buckets").MustArray()

				l, err := json.Marshal(scoreArr[0])
				if err != nil {
					return err
				}

				valObj, err := simplejson.NewJson(l)
				if err != nil {
					return err
				}

				value := valObj.Get("val").MustFloat64()

				p := datasource.Point{
					Value:     value,
					Timestamp: unixTs.Unix() * 1000,
				}

				var tmp = resultSeries[seriesName]
				tmp.Points = append(tmp.Points, &p)

				resultSeries[seriesName] = tmp
			}
		}
	}
	return nil
}

func (ds *BoltDatasource) parseJobIdMappings(body []byte) (map[string]map[string]string, error) {
	jBody, err := simplejson.NewJson(body)
	if err != nil {
		return nil, err
	}

	var results map[string]map[string]string = make(map[string]map[string]string)
	arr := jBody.Get("response").Get("docs").MustArray()
	for _, v := range arr {
		j, err := json.Marshal(v)
		if err != nil {
			return nil, err
		}

		doc, err := simplejson.NewJson(j)
		if err != nil {
			return nil, err
		}

		jobId := doc.Get("jobId").MustString()
		dashboardArr := doc.Get("searchGroup").MustArray()

		var dashboard string = ""
		if len(dashboardArr) > 0 {
			dashboard = fmt.Sprintf("%v", dashboardArr[0])
		}

		panel := doc.Get("name").MustString()

		results[jobId] = make(map[string]string)

		results[jobId]["dashboard"] = dashboard
		results[jobId]["panel"] = panel
	}

	return results, nil
}
