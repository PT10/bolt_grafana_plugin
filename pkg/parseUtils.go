package main

import (
	"encoding/json"
	"time"

	simplejson "github.com/bitly/go-simplejson"
	"github.com/grafana/grafana-plugin-model/go/datasource"
)

func ParseChartResponse(body []byte, resultSeries map[string]datasource.TimeSeries, fields []string) error {
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

func ParseIndvAnomalyFacetResponse(body []byte, resultSeries map[string]datasource.TimeSeries, fields []string) error {
	_, err := simplejson.NewJson(body)
	if err != nil {
		return err
	}

	return nil
}
