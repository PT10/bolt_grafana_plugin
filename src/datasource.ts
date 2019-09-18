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
  rawCollection = '';
  timestampField = 'timestamp';
  backendSrv: any;
  qTemp: any;
  $q: any;
  templateSrv: any;

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

  constructor(instanceSettings: DataSourceInstanceSettings<BoltOptions>, $q: any, templateSrv: any) {
    super(instanceSettings);

    this.$q = $q;
    this.templateSrv = templateSrv;

    this.baseUrl = instanceSettings.url;
    if (this.baseUrl.endsWith('/')) {
      this.baseUrl += 'solr'; //this.baseUrl.substr(0, this.baseUrl.length - 1);
    } else {
      this.baseUrl += '/solr';
    }

    if (instanceSettings.jsonData) {
      this.anCollection = instanceSettings.jsonData.anCollection;
      this.rawCollection = instanceSettings.jsonData.rawCollection;
      this.timestampField = instanceSettings.jsonData.timestampField;
    }

    this.backendSrv = getBackendSrv();
  }

  metricFindQuery(query: string) {
    if (!query || query.length === 0) {
      return Promise.resolve([]);
    }

    const pattern1 = /^(.*)\((.*)\)$/;
    const pattern2 = /^getPageCount$/;

    const matches: any = query.match(pattern1);

    if (matches && matches.length === 3) {
      return this.getFields(matches);
    } else if (query.match(pattern2)) {
      return this.getTotalCount();
    } else {
      return Promise.reject({
        status: 'error',
        message: 'Supported options are: <collection_name>(<field_name>) and getPageCount',
        title: 'Error while adding the variable',
      });
    }
  }

  query(options: DataQueryRequest<BoltQuery>): any {
    const targetPromises = options.targets
      .map((query: BoltQuery) => {
        const collection = _.keys(this.facets).includes(query.queryType) ? this.anCollection : query.collection;
        if (!query.query) {
          return Promise.resolve([]);
        }
        const q = Utils.queryBuilder(this.templateSrv.replace(query.query, options.scopedVars));
        const start = this.templateSrv.replace(query.start, options.scopedVars);
        let numRows = this.templateSrv.replace(query.numRows.toString(), options.scopedVars) || 100;

        numRows = ['single', 'facet'].includes(query.queryType) ? 0 : numRows;
        const startTime = options.range.from.toISOString();
        const endTime = options.range.to.toISOString();

        const solrQuery: any = {
          fq: this.timestampField + ':[' + startTime + ' TO ' + endTime + ']',
          q: q,
          fl: this.timestampField + (query.fl ? ',' + query.fl : ''),
          rows: +numRows,
          start: start,
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

  getFields(matches: any) {
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

  getTotalCount() {
    const searchQuery = _(this.templateSrv.variables).find(v => v.name === 'Search');
    const url =
      this.baseUrl +
      '/' +
      this.rawCollection +
      '/select?q=' +
      searchQuery.query +
      '&rows=0' +
      '&fq=timestamp:[' +
      this.templateSrv.timeRange.from.toJSON() +
      ' TO ' +
      this.templateSrv.timeRange.to.toJSON() +
      ']';

    const options = {
      url: url,
      method: 'GET',
    };

    return this.backendSrv.datasourceRequest(options).then((data: any) => {
      const pageSize = _(this.templateSrv.variables).find(v => v.name === 'PageSize');

      let arr: any[] = [];
      for (let i = 0; i < Math.round(data.data.response.numFound / Number(pageSize.query)); i++) {
        arr.push(i);
      }
      arr = arr.map(ele => {
        return {
          text: ele + 1,
          value: ele,
        };
      });
      const firstNResults = arr.slice(0, 10);
      const lastNResults = arr.splice(arr.length - 11, arr.length - 1);

      if (firstNResults.length === 0 && lastNResults.length === 0) {
        return [
          {
            text: 0,
            value: 0,
          },
        ];
      }

      return firstNResults.concat(lastNResults);
    });
  }
}

export default BoltDatasource;
