package main

import (
	"crypto/tls"
	"fmt"
	"io/ioutil"
	"net"
	"net/http"
	"time"

	"github.com/grafana/grafana-plugin-model/go/datasource"

	b64 "encoding/base64"
	"golang.org/x/net/context"
	"golang.org/x/net/context/ctxhttp"
)

var httpClient = &http.Client{
	Transport: &http.Transport{
		TLSClientConfig: &tls.Config{
			Renegotiation: tls.RenegotiateFreelyAsClient,
		},
		Proxy: http.ProxyFromEnvironment,
		Dial: (&net.Dialer{
			Timeout:   30 * time.Second,
			KeepAlive: 30 * time.Second,
			DualStack: true,
		}).Dial,
		TLSHandshakeTimeout:   10 * time.Second,
		ExpectContinueTimeout: 1 * time.Second,
		MaxIdleConns:          100,
		IdleConnTimeout:       90 * time.Second,
	},
	Timeout: time.Duration(time.Second * 30),
}

func (ds *BoltDatasource) MakeHttpRequest(ctx context.Context, remoteDsReq *RemoteDatasourceRequest, tsdbReq *datasource.DatasourceRequest) ([]byte, error) {
	secureData := tsdbReq.Datasource.DecryptedSecureJsonData
	passwd := secureData["basicAuthPassword"]
	user := "bolt"
	authToken := b64.StdEncoding.EncodeToString([]byte(user + ":" + passwd))

	remoteDsReq.req.Header.Add("Authorization", "Basic "+authToken)

	res, err := ctxhttp.Do(ctx, httpClient, remoteDsReq.req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("invalid status code. status: %v", res.Status)
	}

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}
	return body, nil
}
