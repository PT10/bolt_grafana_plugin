import { DataQueryRequest, DataSourceApi, DataSourceInstanceSettings } from '@grafana/ui';
import { DataFrame } from '@grafana/data';
import { BoltQuery, BoltOptions } from './types';
import { getBackendSrv } from '@grafana/runtime';
import { Utils } from 'datasourceUtils';

import _ from 'lodash';

export class BoltDatasource extends DataSourceApi<BoltQuery, BoltOptions> {
  data: DataFrame[] = [];
  baseUrl: any = '';
  anCollection = '';
  timestampField = 'timestamp';
  backendSrv: any;
  qTemp: any;

  facets: any = {
    aggAnomaly:
      '{"heatMapFacet":{"numBuckets":true,"offset":0,"limit":10000,"type":"terms","field":"jobId","facet":{"Day0":{"type":"range",' +
      '"field":"timestamp","start":"__START_TIME__","end":"__END_TIME__","gap":"+1HOUR","facet":{"score":{"type":"query","q":"*:*",' +
      '"facet":{"score":"max(score_value)"}}}}}}}',
    indvAnomaly:
      '{"lineChartFacet":{"numBuckets":true,"offset":0,"limit":10,"type":"terms","field":"jobId","facet":{"group":{"numBuckets":true,' +
      '"offset":0,"limit":10,"type":"terms","field":"partition_fields","sort":"s desc","ss":"sum(s)","facet":{"s":"sum(score_value)",' +
      '"timestamp":{"type":"terms","limit":-1,"field":"timestamp","sort":"index","facet":{"actual":{"type":"terms","field":"actual_value"}, ' +
      '"score":{"type":"terms","field":"score_value"},"anomaly":{"type":"terms","field":"is_anomaly"}}}}}}}}',
  };

  constructor(instanceSettings: DataSourceInstanceSettings<BoltOptions>) {
    super(instanceSettings);

    this.baseUrl = instanceSettings.url;
    if (this.baseUrl.endsWith('/')) {
      this.baseUrl = this.baseUrl.substr(0, this.baseUrl.length - 1);
    }
    if (instanceSettings.jsonData) {
      this.anCollection = instanceSettings.jsonData.anCollection;
      this.timestampField = instanceSettings.jsonData.timestampField;
    }

    this.backendSrv = getBackendSrv();
  }

  metricFindQuery(query: string) {
    if (!query || query.length === 0) {
      return Promise.resolve([]);
    }

    const pattern = /^(.*)\((.*)\)$/;

    const matches = query.match(pattern);

    if (!matches || matches.length !== 3) {
      return Promise.reject({
        status: 'error',
        message: 'Supported format is: <collection_name>(<field_name>)',
        title: 'Error while adding the variable',
      });
    }

    const collection = matches[1];
    const field = matches[2];

    const url = this.baseUrl + '/' + collection + '/select?q=*:*&facet=true&facet.field=' + field + '&wt=json&rows=0';
    const params = {
      url: url,
      method: 'GET',
    };
    return this.backendSrv.datasourceRequest(params).then((response: any) => {
      if (response.status === 200) {
        return Utils.mapToTextValue(response);
      } else {
        return Promise.reject([
          {
            status: 'error',
            message: 'Error',
            title: 'Error',
          },
        ]);
      }
    });
  }

  query(options: DataQueryRequest<BoltQuery>): any {
    const targetPromises = options.targets
      .map((query: BoltQuery) => {
        const collection = _.keys(this.facets).includes(query.queryType) ? this.anCollection : query.collection;
        const q = query.query;
        if (!q) {
          return Promise.resolve([]);
        }

        const numRows = ['single', 'facet'].includes(query.queryType) ? 0 : query.numRows;
        const startTime = options.range.from.toISOString();
        const endTime = options.range.to.toISOString();

        const solrQuery: any = {
          fq: this.timestampField + ':[' + startTime + ' TO ' + endTime + ']',
          q: q,
          fl: this.timestampField + (query.fl ? ',' + query.fl : ''),
          rows: numRows,
          start: 0,
          getRawMessages: query.queryType === 'table' ? true : false,
        };

        if (query.sortField) {
          solrQuery['sort'] = query.sortField + ' ' + query.sortOrder;
        } else if (query.queryType === 'chart') {
          solrQuery['sort'] = 'timestamp asc';
        }

        if (_.keys(this.facets).includes(query.queryType)) {
          solrQuery['facet'] = true;
          solrQuery['json.facet'] = this.facets[query.queryType].replace('__START_TIME__', startTime).replace('__END_TIME__', endTime);
        } else {
          delete solrQuery['facet'];
          delete solrQuery['json.facet'];
        }

        const params = {
          url: this.baseUrl + '/' + collection + '/select?wt=json',
          method: 'GET',
          params: solrQuery,
        };

        return this.backendSrv.datasourceRequest(params).then((response: any) => {
          if (response.status === 200) {
            return Utils.processResponse(response, query.queryType, this.timestampField);
          } else {
            return Promise.reject([
              {
                status: 'error',
                message: 'Error',
                title: 'Error',
              },
            ]);
          }
        });
      })
      .values();

    return Promise.all(targetPromises).then(responses => {
      const result = {
        data: responses.map(response => {
          return response.data;
        }),
      };

      result.data = _.flatten(result.data);

      return result;
    });
  }

  testDatasource() {
    const options = {
      url: this.baseUrl,
      method: 'GET',
    };
    return this.backendSrv
      .datasourceRequest(options)
      .then((response: any) => {
        if (response.status === 200) {
          return {
            status: 'success',
            message: 'Data source is working',
            title: 'Success',
          };
        } else {
          return {
            status: 'error',
            message: 'Data source is NOT working',
            title: 'Error',
          };
        }
      })
      .catch((error: any) => {
        return {
          status: 'success',
          message: 'Data source is working',
          title: 'Success',
        };
      });
  }
}

export default BoltDatasource;
