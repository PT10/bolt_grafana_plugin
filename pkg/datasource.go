package main

import (
	"net/http"
	"net/url"
	"strings"

	simplejson "github.com/bitly/go-simplejson"
	"github.com/grafana/grafana-plugin-model/go/datasource"
	hclog "github.com/hashicorp/go-hclog"
	plugin "github.com/hashicorp/go-plugin"
	"golang.org/x/net/context"
)

type BoltDatasource struct {
	plugin.NetRPCUnsupportedPlugin
	logger hclog.Logger
}

const indvAnomalyFacet = `{"lineChartFacet":{"numBuckets":true,"offset":0,"limit":20,"type":"terms","field":"jobId","facet":{"group":{"numBuckets":true,
"offset":0,"limit":20,"type":"terms","field":"partition_fields","sort":"s desc","ss":"sum(s)","facet":{"s":"max(score_value)",
"timestamp":{"type":"terms","limit":-1,"field":"timestamp","facet":{"actual":{"type":"terms","field":"actual_value"},
"score":{"type":"terms","field":"score_value"},"anomaly":{"type":"terms","field":"is_anomaly"},
"expected":{"type":"terms","field":"expected_value"}}}}}}}}`

func (ds *BoltDatasource) Query(ctx context.Context, tsdbReq *datasource.DatasourceRequest) (*datasource.DatasourceResponse, error) {
	ds.logger.Info("Query", "datasource", tsdbReq.Datasource.Name, "TimeRange", tsdbReq.TimeRange)

	return ds.SearchQuery(ctx, tsdbReq)
}

func (ds *BoltDatasource) SearchQuery(ctx context.Context, tsdbReq *datasource.DatasourceRequest) (*datasource.DatasourceResponse, error) {
	var resultSeries map[string]datasource.TimeSeries = make(map[string]datasource.TimeSeries)

	var cursorMark string = "*"
	var nextCursorMark string
	done := false
	for !done {
		remoteDsReq, outFields, qType, err := ds.CreateSearchRequest(tsdbReq, cursorMark)
		if err != nil {
			return nil, err
		}

		body, err := ds.MakeHttpRequest(ctx, remoteDsReq)
		if err != nil {
			return nil, err
		}

		nextCursorMark, err = ds.ParseSearchResponse(body, resultSeries, outFields, qType, cursorMark)
		if err != nil {
			return nil, err
		}

		if cursorMark == nextCursorMark {
			ds.logger.Debug("Found end of records", cursorMark, nextCursorMark)
			done = true
		}
		cursorMark = nextCursorMark
	}

	values := make([]*datasource.TimeSeries, 0, len(resultSeries))

	for _, v := range resultSeries {
		var val = v
		values = append(values, &val)
	}

	return &datasource.DatasourceResponse{
		Results: []*datasource.QueryResult{
			&datasource.QueryResult{
				RefId:  "search",
				Series: values,
			},
		},
	}, nil
}

func (ds *BoltDatasource) CreateSearchRequest(tsdbReq *datasource.DatasourceRequest, cursor string) (*RemoteDatasourceRequest, []string, string, error) {
	modelJson, err := simplejson.NewJson([]byte(tsdbReq.Queries[0].ModelJson))
	if err != nil {
		return nil, nil, "", err
	}

	toTime := getRelativeTimeString(tsdbReq.TimeRange.ToRaw, false)
	fromTime := getRelativeTimeString(tsdbReq.TimeRange.FromRaw, true)

	ds.logger.Debug("Times", "to Time", toTime, "fromTime", fromTime)

	outFields := strings.Split(modelJson.Get("fl").MustString(), ",")
	processedoutFields := make([]string, len(outFields))
	for i, v := range outFields {
		if strings.Contains(v, ":") {
			j := strings.Index(v, ":")
			v = v[:j]
		}
		processedoutFields[i] = v
	}
	outFields = processedoutFields

	collection := modelJson.Get("collection").MustString("bolt_an")
	query := modelJson.Get("query").MustString()
	fl := "timestamp," + modelJson.Get("fl").MustString()
	rbody := modelJson.Get("data")
	//refId := modelJson.Get("refId")
	qType := modelJson.Get("queryType").MustString("chart")

	urlStr := tsdbReq.Datasource.Url + "/solr/" + collection + "/select"

	var Url *url.URL
	Url, err = url.Parse(urlStr)

	parameters := url.Values{}
	parameters.Add("wt", "json")
	parameters.Add("q", query)
	parameters.Add("fq", "timestamp:["+fromTime+" TO "+toTime+"]")

	if qType == "indvAnomaly" {
		outFields = []string{modelJson.Get("indvAnOutField").MustString("all")}
		parameters.Add("facet", "true")
		parameters.Add("json.facet", indvAnomalyFacet)
	} else if qType == "chart" {
		parameters.Add("fl", fl)
		parameters.Add("rows", "1000")
		parameters.Add("cursorMark", cursor)
		parameters.Add("sort", "id asc")
	} else {

	}

	Url.RawQuery = parameters.Encode()

	ds.logger.Debug("Bolt Alert Query", "URL", Url.String())

	req, err := http.NewRequest(http.MethodPost, Url.String(), strings.NewReader(rbody.MustString()))
	if err != nil {
		return nil, nil, "", err
	}

	req.Header.Add("Content-Type", "application/json")

	return &RemoteDatasourceRequest{
		queryType: "search",
		req:       req,
		queries:   tsdbReq.Queries,
	}, outFields, qType, nil
}

func (ds *BoltDatasource) ParseSearchResponse(body []byte, resultSeries map[string]datasource.TimeSeries, fields []string, qType string, cursor string) (string, error) { //(*datasource.DatasourceResponse, error) {
	var nextCursorMark string
	var err error
	if qType != "indvAnomaly" {
		for _, v := range fields {
			if resultSeries[v].Name == "" {
				resultSeries[v] = datasource.TimeSeries{
					Name:   v,
					Points: make([]*datasource.Point, 0),
				}
			}
		}
		nextCursorMark, err = ds.ParseChartResponse(body, resultSeries, fields, cursor)
		if err != nil {
			return nextCursorMark, err
		}
		ds.logger.Debug("ParseSearchResponse", "Next cursor mark", nextCursorMark)
	} else {
		nextCursorMark = cursor
		err = ds.ParseIndvAnomalyFacetResponse(body, resultSeries, fields)
		if err != nil {
			return cursor, err
		}
	}

	return nextCursorMark, nil
}
