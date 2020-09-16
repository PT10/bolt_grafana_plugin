/*
 *
 *  Copyright (C) 2019 Bolt Analytics Corporation
 *
 *      Licensed under the Apache License, Version 2.0 (the "License");
 *      you may not use this file except in compliance with the License.
 *      You may obtain a copy of the License at
 *
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 *      Unless required by applicable law or agreed to in writing, software
 *      distributed under the License is distributed on an "AS IS" BASIS,
 *      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *      See the License for the specific language governing permissions and
 *      limitations under the License.
 *
 */

import { DataQueryRequest, DataSourceApi, DataSourceInstanceSettings } from '@grafana/data';
import { DataFrame } from '@grafana/data';
import { BoltQuery, BoltOptions } from './types';
import { getBackendSrv } from '@grafana/runtime';
import { Utils } from 'datasourceUtils';

//import _ from 'lodash';

export class BoltDatasource extends DataSourceApi<BoltQuery, BoltOptions> {
  data: DataFrame[] = [];
  baseUrl: any = '';
  anCollection = '';
  jobConfigCollection = '';
  rawCollection = '';
  rawCollectionType = 'single';
  timestampField = 'timestamp';
  anomalyThreshold = 5;
  topN = 10;
  rawCollectionWindow = 1;
  backendSrv: any;
  qTemp: any;
  $q: any;
  templateSrv: any;

  jobIdMappings: { dashboards: any; panels: any };

  totalCount?: number = undefined;

  facets: any = {
    aggAnomaly:
      '{"heatMapFacet":{"numBuckets":true,"offset":0,"limit":__TOPN__,"sort":"s desc","type":"terms","field":"jobId",' +
      '"facet":{"s": "max(score_value)", "Day0":{"type":"range",' +
      '"field":"timestamp","start":"__START_TIME__","end":"__END_TIME__","gap":"__AGG_INTERVAL__","facet":{"score":{"type":"query",' +
      '"q":"score_value:[__SCORE_THRESHOLD__ TO *]", "facet":{"score":"max(score_value)"}}}}}}}',
    aggAnomalyByPartFields:
      '{"heatMapByPartFieldsFacet":{"numBuckets":true,"offset":0,"limit": __TOPN__,"type":"terms","field":"jobId",' +
      '"facet":{"partField":{"type":"terms","field":"partition_fields","limit": __TOPN__,"sort":"s desc",' +
      '"facet":{"s":"max(score_value)","Day0":{"type":"range","field":"timestamp","start":"__START_TIME__","end":"__END_TIME__",' +
      '"gap":"__AGG_INTERVAL__",' +
      '"facet":{"score":{"type":"query","q":"score_value:[__SCORE_THRESHOLD__ TO *]","facet":{"score":"max(score_value)"}}}}}}}}}',
    indvAnomaly:
      '{"lineChartFacet":{"numBuckets":true,"offset":0,"limit":__TOPN__,"type":"terms","field":"jobId","facet":{"group":{"numBuckets":true,' +
      '"offset":0,"limit":__TOPN__,"type":"terms","field":"partition_fields","sort":"s desc","ss":"sum(s)","facet":{"s":"max(score_value)",' +
      '"timestamp":{"type":"terms","limit":-1,"field":"timestamp","facet":{"actual":{"type":"terms","field":"actual_value"}, ' +
      '"score":{"type":"terms","field":"score_value"},"anomaly":{"type":"terms","field":"is_anomaly"},' +
      '"expected":{"type":"terms","field":"expected_value"}}}}}}}}',
    correlation:
      '{"correlation":{"numBuckets":true,"offset":0,"limit":__TOPN__,"type":"terms","field":"jobId","facet":{"group":{"numBuckets":true,' +
      '"offset":0,"limit":__TOPN__,"type":"terms","field":"partition_fields","sort":"s desc","ss":"sum(s)","facet":{"s":"sum(score_value)",' +
      '"timestamp":{"type":"terms","limit":-1,"field":"timestamp","sort":"index","facet":{"actual":{"type":"terms","field":"actual_value"}}}}}}}}',
  };

  stats: any = {
    metaBar:
      'stats=true&stats.field=hourly_avg_0_f&stats.field=hourly_avg_1_f&stats.field=hourly_avg_2_f&stats.field=hourly_avg_3_f&' +
      'stats.field=hourly_avg_4_f&stats.field=hourly_avg_5_f&stats.field=hourly_avg_6_f&stats.field=hourly_avg_7_f&' +
      'stats.field=hourly_avg_8_f&stats.field=hourly_avg_9_f&stats.field=hourly_avg_10_f&stats.field=hourly_avg_11_f&' +
      'stats.field=hourly_avg_12_f&stats.field=hourly_avg_13_f&stats.field=hourly_avg_14_f&stats.field=hourly_avg_15_f&' +
      'stats.field=hourly_avg_16_f&stats.field=hourly_avg_17_f&stats.field=hourly_avg_18_f&stats.field=hourly_avg_19_f&' +
      'stats.field=hourly_avg_20_f&stats.field=hourly_avg_21_f&stats.field=hourly_avg_22_f&stats.field=hourly_avg_23_f',
  };

  constructor(instanceSettings: DataSourceInstanceSettings<BoltOptions>, $q: any, templateSrv: any) {
    super(instanceSettings);

    this.jobIdMappings = { dashboards: {}, panels: {} };
    this.$q = $q;
    this.templateSrv = templateSrv;

    this.baseUrl = instanceSettings.url;
    if (this.baseUrl.endsWith('/')) {
      this.baseUrl += 'solr';
    } else {
      this.baseUrl += '/solr';
    }

    if (instanceSettings.jsonData) {
      this.anCollection = instanceSettings.jsonData.anCollection;
      this.jobConfigCollection = instanceSettings.jsonData.jobConfigCollection;
      this.rawCollection = instanceSettings.jsonData.rawCollection;
      this.timestampField = instanceSettings.jsonData.timestampField;
      this.rawCollectionType = instanceSettings.jsonData.rawCollectionType;
      this.rawCollectionWindow = instanceSettings.jsonData.rawCollectionWindow;

      if (instanceSettings.jsonData.anomalyThreshold) {
        this.anomalyThreshold = instanceSettings.jsonData.anomalyThreshold;
      }

      if (instanceSettings.jsonData.topN) {
        this.topN = parseInt(instanceSettings.jsonData.topN, 10);
      }
    }

    this.backendSrv = getBackendSrv();

    this.buildValuesMap();
  }

  metricFindQuery(query: string) {
    if (!query || query.length === 0) {
      return Promise.resolve([]);
    }

    const pattern1 = /^getPageCount\(\$(.*),\s*\$(.*)\)$/;
    const pattern2 = /^(.*)\((.*):\s*(.*),\s*(.*)\)$/;

    const matches1: any = query.match(pattern1);
    const matches2: any = query.match(pattern2);

    if (matches1 && matches1.length === 3) {
      return this.getTotalCount(matches1);
    } else if (matches2 && matches2.length === 5) {
      return this.getFields(matches2);
    } else {
      return Promise.reject({
        status: 'error',
        message: 'Supported options are: <collection_name>(<filter>,<field_name>) and getPageCount($PageSize, $Search)',
        title: 'Error while adding the variable',
      });
    }
  }

  query(options: DataQueryRequest<BoltQuery>): any {
    const targetPromises = options.targets
      .map((query: BoltQuery) => {
        // If user has added page number variable the count is computed in template init (metricFindQuery) No need to fire the Query on solr again
        if (query.queryType === 'count' && this.totalCount) {
          return Promise.resolve([
            {
              data: [
                {
                  target: 'Number of docs',
                  datapoints: [[this.totalCount, '']],
                },
              ],
            },
          ]);
        }

        const collection = Object.keys(this.facets).includes(query.queryType)
          ? this.anCollection
          : ['metaBar', 'metaCp'].includes(query.queryType)
          ? this.anCollection
          : query.collection;
        if (!query.query) {
          return Promise.resolve([]);
        }

        let q = this.getQueryString(query, options);

        // Provision for empty series filter
        if (q.match(/AND\s*$/)) {
          q = q.slice(0, q.lastIndexOf('AND'));
        }

        let start = this.templateSrv.replace(query.start, options.scopedVars);
        let numRows = this.templateSrv.replace(query.numRows.toString(), options.scopedVars) || 100;
        if (query.queryType === 'chart') {
          numRows = 1000; // Cursor page size
        } else {
          numRows = ['count', 'facet'].includes(query.queryType) ? 0 : numRows;
        }
        numRows = Number(numRows);
        start = numRows * Number(start);

        const startTime = options.range.from.toISOString();
        const endTime = options.range.to.toISOString();

        const solrQueryBody: any = {};
        solrQueryBody.query = q;

        // Add basic query fields
        const solrQueryParams: any = {
          fq: this.timestampField + ':[' + startTime + ' TO ' + endTime + ']',
          fl: this.timestampField + (query.fl ? ',' + query.fl : ',*'),
          rows: numRows,
          start: start,
        };

        // Add fields specific to raw logs and single stat on raw logs
        if (query.queryType === 'rawlogs' || query.queryType === 'count' || query.queryType === 'slowQueries') {
          solrQueryParams['collectionWindow'] = this.rawCollectionWindow;
          solrQueryParams['startTime'] = startTime;
          solrQueryParams['endTime'] = endTime;
          solrQueryParams['getRawMessages'] = true;
        }

        if (query.queryType === 'slowQueries') {
          solrQueryParams['rex.message.q'] = query.rexQuery;
          solrQueryParams['rex.message.outputfields'] = query.rexOutFields;
        }

        // Set facet fields for heatmap, linechart and count (only in case of multi collection mode due to plugin numFound limitation)
        // TODO: Find out why numFound is returned only after specifying the facet
        if (query.queryType === 'count' && this.rawCollectionType === 'multi') {
          solrQueryParams['facet'] = true;
          solrQueryParams['facet.field'] = 'id';
          solrQueryParams['facet.limit'] = 2;
        } else if (Object.keys(this.facets).includes(query.queryType)) {
          const aggInterval = this.templateSrv.replace(query.aggInterval, options.scopedVars) || '+1HOUR';
          solrQueryParams['facet'] = true;
          solrQueryParams['json.facet'] = this.facets[query.queryType]
            .replace('__AGG_INTERVAL__', aggInterval)
            .replace('__START_TIME__', startTime)
            .replace('__END_TIME__', endTime)
            .replace(/__TOPN__/g, this.topN)
            .replace('__SCORE_THRESHOLD__', this.anomalyThreshold);
        } else {
          delete solrQueryParams['facet'];
          delete solrQueryParams['json.facet'];
        }

        let statsQueryString = '';
        if (query.queryType === 'metaBar') {
          statsQueryString += 'q=' + q + '&rows=0&fq=' + solrQueryParams['fq'] + '&stats=true&';
          [...Array(24).keys()].forEach(hour => {
            if (hour === 23) {
              statsQueryString += 'stats.field=hourly_avg_' + hour + '_f';
            } else {
              statsQueryString += 'stats.field=hourly_avg_' + hour + '_f&';
            }
          });
        }

        // for cursor to work. Will sort by ts later
        if (query.queryType === 'chart') {
          solrQueryParams['sort'] = 'id asc';
        } else if (query.sortField) {
          solrQueryParams['sort'] =
            this.templateSrv.replace(query.sortField, options.scopedVars) +
            ' ' +
            this.templateSrv.replace(query.sortOrder, options.scopedVars);
        }

        const httpOpts = {
          url: this.baseUrl + '/' + collection + '/select' + (statsQueryString ? '?' + statsQueryString : ''),
          method: 'POST',
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
          params: statsQueryString ? undefined : solrQueryParams,
          data: statsQueryString ? undefined : JSON.stringify(solrQueryBody), // There can be a big query due to long jobIds and hence it is sent in post request body
        };

        const cursor = query.queryType === 'chart' ? '*' : null;

        return this.sendQueryRequest([], httpOpts, query, startTime, cursor); // cursor mark or charts
      })
      .values();

    const series: any = {};
    const resultSeries: any[] = [];

    return Promise.all(targetPromises).then(responses => {
      responses.forEach(resp => {
        resp.forEach((r: any) => {
          r.data.forEach((s: any) => {
            if (s.type === 'table') {
              resultSeries.push(s);
            } else {
              series[s.target] = !series[s.target] ? s.datapoints : series[s.target].concat(s.datapoints);
            }
          });
        });
      });

      Object.keys(series).forEach((key: any) => {
        resultSeries.push({
          target: key,
          datapoints: series[key].sort((a: any, b: any) => {
            return a[1] - b[1];
          }),
        });
      });

      const result = {
        data: resultSeries,
      };

      return result;
    });
  }

  testDatasource() {
    const options = {
      url: this.baseUrl + '/' + this.anCollection + '/select?wt=json',
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
          status: 'error',
          message: error.status + ': ' + error.statusText,
          title: 'Error',
        };
      });
  }

  sendQueryRequest(respArr: any[], options: any, query: BoltQuery, startTime: string, cursor?: any) {
    /*params.method = 'POST';
    params.headers = { 'Content-Type': 'application/json' };*/

    if (cursor) {
      options.params['cursorMark'] = cursor;
    }
    return this.backendSrv
      .datasourceRequest(options)
      .then((response: any) => {
        if (response.status === 200) {
          const groupMap = this.jobIdMappings;

          const processedData = Utils.processResponse(
            response,
            this.timestampField,
            this.anomalyThreshold,
            groupMap,
            JSON.parse(query.groupEnabled),
            this.topN,
            query,
            startTime
          );

          respArr.push(processedData);

          if (cursor && response.data.nextCursorMark && cursor !== response.data.nextCursorMark) {
            return this.sendQueryRequest(respArr, options, query, startTime, response.data.nextCursorMark);
          } else {
            return respArr;
          }
        } else {
          return Promise.reject([
            {
              status: 'error',
              message: 'Error',
              title: 'Error',
            },
          ]);
        }
      })
      .catch((error: any) => {
        return Promise.reject([
          {
            status: 'error',
            message: error.status + ': ' + error.statusText,
            title: 'Error while accessing data',
          },
        ]);
      });
  }

  getFields(matches: any) {
    const collection = matches[1];
    const filterField = matches[2];
    let filterFieldVal = matches[3].replace('$', '');
    const field = matches[4];

    const variable = this.templateSrv.variables.find((v: any) => v.name === filterFieldVal);
    if (variable) {
      let resolvedFilterValues: string[] = [];
      if (typeof variable.current.value !== 'object') {
        resolvedFilterValues.push(variable.current.value);
      } else {
        resolvedFilterValues = variable.current.value;
      }

      if (resolvedFilterValues[0] === '$__all') {
        if (!variable || !variable.options || variable.options.length < 2) {
          filterFieldVal = '';
        } else {
          const allValues = variable.options
            .slice(1)
            .map((opt: any) => {
              let fieldName = opt.text;
              if (filterField === 'jobId') {
                Object.keys(this.jobIdMappings.panels).forEach((k: string) => {
                  if (this.jobIdMappings.panels[k] === fieldName) {
                    fieldName = k;
                  }
                });
              }
              return fieldName;
            })
            .join(' OR ');
          filterFieldVal = '(' + allValues + ')';
        }
      } else {
        resolvedFilterValues = resolvedFilterValues.map(dashboard => {
          let fieldName = dashboard;
          if (filterField === 'jobId') {
            Object.keys(this.jobIdMappings.panels).forEach((k: string) => {
              if (this.jobIdMappings.panels[k] === fieldName) {
                fieldName = k;
              }
            });
          }
          return fieldName;
        });
        filterFieldVal = '(' + resolvedFilterValues.join(' OR ') + ')';
      }
    }

    const url =
      this.baseUrl + '/' + collection + '/select?facet=true&facet.field=' + field + '&wt=json&rows=0&facet.limit=-1';
    const params = {
      url: url,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: { query: filterField + ': ' + filterFieldVal },
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

  buildValuesMap() {
    const url =
      this.baseUrl + '/' + this.jobConfigCollection + '/select?q=jobId:*&fl=jobId,name,searchGroup&rows=10000';
    const params = {
      url: url,
      method: 'GET',
    };
    return this.backendSrv.datasourceRequest(params).then((response: any) => {
      if (response.status === 200) {
        this.jobIdMappings = { dashboards: {}, panels: {} };
        response.data.response.docs.forEach((doc: any) => {
          this.jobIdMappings.dashboards[doc.jobId] = '"' + doc.searchGroup[0] + '"';
          this.jobIdMappings.panels[doc.jobId] = '"' + doc.name + '"';
        });
      }
    });
  }

  getTotalCount(matches: any) {
    const pageSizeVar = matches[1];
    const searchVar = matches[2];

    const searchQuery = this.templateSrv.variables.find((v: any) => v.name === searchVar);
    if (!searchQuery) {
      this.totalCount = undefined;
      return Promise.reject({
        status: 'error',
        message: '$' + searchVar + ' not found in variables',
        title: 'Error while adding the variable',
      });
    }

    const pageSize = this.templateSrv.variables.find((v: any) => v.name === pageSizeVar);
    if (!pageSize) {
      this.totalCount = undefined;
      return Promise.reject({
        status: 'error',
        message: '$' + pageSizeVar + ' not found in variables',
        title: 'Error while adding the variable',
      });
    }

    const params = {
      q: searchQuery.query,
      rows: 0,
      fq:
        'timestamp:[' +
        this.templateSrv.timeRange.from.toJSON() +
        ' TO ' +
        this.templateSrv.timeRange.to.toJSON() +
        ']',
      getRawMessages: true,
      startTime: this.templateSrv.timeRange.from.toJSON(),
      endTime: this.templateSrv.timeRange.to.toJSON(),
      facet: true,
      'facet.field': 'id',
      'facet.limit': 2,
    };

    const options = {
      url: this.baseUrl + '/' + this.rawCollection + '/select?wt=josn',
      method: 'GET',
      params: params,
    };

    return this.backendSrv.datasourceRequest(options).then((data: any) => {
      this.totalCount = data.data.response.numFound;
      return Utils.getFirstAndLastNResults(data, pageSize);
    });
  }

  getQueryString(query: BoltQuery, options: DataQueryRequest<BoltQuery>) {
    let q: string;
    const queryStr = this.templateSrv.replace(query.query, options.scopedVars);
    const matches = queryStr.match(/__dashboard__:\s*(.*)/);
    let matches2 = queryStr.match(/__panel__:\s*(.*) AND .*/);
    if (!matches2) {
      matches2 = queryStr.match(/__panel__:\s*(.*)/);
    }

    if (matches && matches.length === 2) {
      // Dashboard case
      const dahsboardName: string = matches[1];
      if (dahsboardName === '*') {
        q = queryStr.replace('__dashboard__', 'jobId');
      } else if (dahsboardName.startsWith('{')) {
        // All option
        const jobIdList: any[] = [];
        const dashboards = dahsboardName
          .replace('{', '')
          .replace('}', '')
          .split(',');

        dashboards.forEach(dashboard => {
          const jobId: string[] = Object.keys(this.jobIdMappings.dashboards).filter(jobId => {
            return this.jobIdMappings.dashboards[jobId] === dashboard;
          });

          if (jobId) {
            jobId.forEach(job => jobIdList.push(job));
          }
        });

        const jobIdStr = '(' + jobIdList.join(' OR ') + ')';
        q = queryStr.replace('__dashboard__', 'jobId').replace(dahsboardName, jobIdStr);
      } else {
        // particular option
        const jobIdList: string[] = Object.keys(this.jobIdMappings.dashboards).filter((jobId: string) => {
          return this.jobIdMappings.dashboards[jobId] === dahsboardName;
        });

        const jobIdStr = '( ' + jobIdList.join(' OR ') + ' )';
        q = queryStr.replace('__dashboard__', 'jobId').replace(dahsboardName, jobIdStr);
      }
      q = Utils.queryBuilder(q);
    } else if (matches2 && matches2.length === 2) {
      // Panel case
      const panelName: string = matches2[1];

      if (panelName === '*') {
        q = queryStr.replace('__panel__', 'jobId');
      } else if (panelName.startsWith('{')) {
        // All option
        const jobIdList: any[] = [];
        const panels = panelName
          .replace('{', '')
          .replace('}', '')
          .split(',');

        panels.forEach(panel => {
          const jobId = Object.keys(this.jobIdMappings.panels).filter(jobId => {
            return this.jobIdMappings.panels[jobId] === panel;
          });

          if (jobId) {
            jobIdList.push(jobId);
          }
        });

        const jobIdStr = '(' + jobIdList.join(' OR ') + ')';
        q = queryStr.replace('__panel__', 'jobId').replace(panelName, jobIdStr);
      } else {
        // particular option
        const jobIdList: string[] = Object.keys(this.jobIdMappings.panels).filter((jobId: string) => {
          return this.jobIdMappings.panels[jobId] === panelName;
        });

        const jobIdStr = '( ' + jobIdList.join(' OR ') + ' )';
        q = queryStr.replace('__panel__', 'jobId').replace(panelName, jobIdStr);
      }
      q = Utils.queryBuilder(q);
    } else {
      q = Utils.queryBuilder(queryStr);
    }

    return q;
  }
}

export default BoltDatasource;
