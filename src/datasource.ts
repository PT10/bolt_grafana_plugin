import { DataQueryRequest, DataSourceApi, DataSourceInstanceSettings, MetricFindValue } from '@grafana/ui';
import { DataFrame } from '@grafana/data';
import { BoltQuery, BoltOptions } from './types';
import { getBackendSrv } from '@grafana/runtime';
import { Utils } from 'datasourceUtils';

export class BoltDatasource extends DataSourceApi<BoltQuery, BoltOptions> {
  data: DataFrame[] = [];
  baseUrl: any = '';
  anCollection = '';
  rawCollection = '';
  backendSrv: any;

  constructor(instanceSettings: DataSourceInstanceSettings<BoltOptions>) {
    super(instanceSettings);

    this.baseUrl = instanceSettings.url;
    if (this.baseUrl.endsWith('/')) {
      this.baseUrl = this.baseUrl.substr(0, this.baseUrl.length - 1);
    }
    if (instanceSettings.jsonData) {
      this.anCollection = instanceSettings.jsonData.anCollection;
      this.rawCollection = instanceSettings.jsonData.rawCollection;
    }

    this.backendSrv = getBackendSrv();
  }

  metricFindQuery(query: string, options?: any): Promise<MetricFindValue[]> {
    return new Promise((resolve, reject) => {
      const names = [];
      for (const series of this.data) {
        for (const field of series.fields) {
          names.push({
            text: field.name,
          });
        }
      }
      resolve(names);
    });
  }

  query(options: DataQueryRequest<BoltQuery>): any {
    for (const query of options.targets) {
      const collection = query.collection;
      const q = query.query;

      if (!q || !collection) {
        continue;
      }

      const numRows = ['single', 'facet'].includes(query.queryType) ? 0 : query.numRows;

      const startTime = options.range.from.toISOString();
      const endTime = options.range.to.toISOString();
      const solrQuery: any = {
        fq: query.timeField + ':[' + startTime + ' TO ' + endTime + ']',
        q: q,
        fl: query.timeField + (query.fl ? ',' + query.fl : ''),
        rows: numRows,
        start: 0,
        sort: query.sortField + ' ' + query.sortOrder,
        getRawMessages: query.queryType === 'table' ? true : false,
      };

      if (query.queryType === 'facet' && query.facetQuery) {
        solrQuery['facet'] = true;
        solrQuery['json.facet'] = query.facetQuery.replace('__START_TIME__', startTime).replace('__END_TIME__', endTime);
      }

      const params = {
        url: this.baseUrl + '/' + collection + '/select?wt=json',
        method: 'GET',
        params: solrQuery,
      };

      return this.backendSrv.datasourceRequest(params).then((response: any) => {
        if (response.status === 200) {
          return Utils.processResponse(response, query.queryType, query.timeField);
        } else {
          return {
            status: 'error',
            message: 'Error',
            title: 'Error',
          };
        }
      });
    }
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
