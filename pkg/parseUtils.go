package main

import (
	"encoding/json"
	"time"

	simplejson "github.com/bitly/go-simplejson"
	"github.com/grafana/grafana-plugin-model/go/datasource"
)

func (ds *BoltDatasource) ParseChartResponse(body []byte, resultSeries map[string]datasource.TimeSeries, fields []string) error {
	jBody, err := simplejson.NewJson(body)
	if err != nil {
		return err
	}

	arr := jBody.Get("response").Get("docs").MustArray()
	for _, v := range arr {
		j, err := json.Marshal(v)
		if err != nil {
			return err
		}

		doc, err := simplejson.NewJson(j)
		if err != nil {
			return err
		}

		for _, v := range fields {
			ts := doc.Get("timestamp").MustString()
			unixTs, _ := time.Parse("2006-01-02T15:04:05-0700", ts)
			val := doc.Get(v).MustFloat64()

			p := datasource.Point{
				Value:     val,
				Timestamp: unixTs.Unix() * 1000,
			}

			var tmp = resultSeries[v]
			tmp.Points = append(tmp.Points, &p)

			resultSeries[v] = tmp
		}
	}
	return nil
}

func (ds *BoltDatasource) ParseIndvAnomalyFacetResponse(body []byte, resultSeries map[string]datasource.TimeSeries, fields []string) error {
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

		jobId := bucket.Get("val").MustString()
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

			seriesName := jobId + "_" + aggr_field
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

				scoreArr := aggrFieldsTsBucketObj.Get("score").Get("buckets").MustArray()

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
