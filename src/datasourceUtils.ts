import { BoltQuery } from 'types';
import { AnnotationEvent } from '@grafana/data';

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

export class Utils {
  static processResponse(
    response: any,
    timeField: string,
    anomalyThreshold: number,
    groupMap: any,
    grouppingEmabled: boolean,
    topN: number,
    query: BoltQuery,
    startTime: string
  ) {
    const indvAnOutField = query.indvAnOutField;
    const correlationMetric = query.baseMetric;
    const format = query.queryType;
    const data = response.data;
    let seriesList: any;
    const series: any = {};

    // Process line chart facet response
    if (data.facets && data.facets.lineChartFacet) {
      seriesList = [];
      let sortBaselineSeries: any[] = [];
      const jobs = data.facets.lineChartFacet.buckets;
      let prefix = false;
      jobs.forEach((job: any) => {
        const partFields = job.group.buckets;
        if (partFields.length > 1) {
          prefix = true;
        }

        partFields.forEach((partField: any) => {
          const dashboardName = groupMap.dashboards[job.val] ? groupMap.dashboards[job.val] + '_' : '';
          const panelName = groupMap.panels[job.val] ? groupMap.panels[job.val] : '';
          let jobIdWithPartField: string = dashboardName + panelName;
          const partFieldJson = JSON.parse(partField.val);
          Object.keys(partFieldJson).forEach(key => {
            if (key === 'aggr_field') {
              return;
            }
            jobIdWithPartField += '_' + key + '_' + partFieldJson[key];
          });
          jobIdWithPartField += '_' + partFieldJson.aggr_field;

          if (jobIdWithPartField.startsWith('_')) {
            jobIdWithPartField = jobIdWithPartField.slice(1);
          }

          const buckets = partField.timestamp.buckets;
          const actualSeries: any[] = [];
          const scoreSeries: any[] = [];
          const anomalySeries: any[] = [];
          const expectedSeries: any[] = [];
          buckets.forEach((timeBucket: any) => {
            const d: Date = new Date(timeBucket.val);
            const ts = d.getTime();

            const severity = timeBucket.severity.buckets[0].val;
            const actual = timeBucket.actual.buckets[0].val;
            let score = timeBucket.score.buckets[0].val;
            let anomaly = timeBucket.anomaly.buckets[0].val;
            const expected = timeBucket.expected.buckets[0].val;

            if (['Critical', 'Warning'].includes(severity) && score >= anomalyThreshold && anomaly) {
              anomaly = actual;
            } else {
              anomaly = null;
              score = null;
            }
            actualSeries.push([actual, ts]);
            scoreSeries.push([score, ts]);
            anomalySeries.push([anomaly, ts]);
            expectedSeries.push([expected, ts]);
          });

          seriesList.push({
            target: prefix ? jobIdWithPartField + ' actual' : 'actual',
            datapoints: actualSeries,
          });
          seriesList.push({
            target: prefix ? jobIdWithPartField + ' score' : 'score',
            datapoints: scoreSeries,
          });
          //Sort baseline is score value.
          sortBaselineSeries.push({
            target: jobIdWithPartField,
            datapoints: scoreSeries,
          });
          seriesList.push({
            target: prefix ? jobIdWithPartField + ' anomaly' : 'anomaly',
            datapoints: anomalySeries,
          });
          seriesList.push({
            target: prefix ? jobIdWithPartField + ' expected' : 'expected',
            datapoints: expectedSeries,
          });
        });
      });
      sortBaselineSeries = this.sortList(sortBaselineSeries, topN);
      seriesList = this.getSortedSeries(seriesList, sortBaselineSeries, indvAnOutField, prefix);
    } else if (data.facets && data.facets.correlation) {
      seriesList = [];
      const jobs = data.facets.correlation.buckets;

      let baseline: number[] = [];
      // Find baseline series and populate base metric
      jobs.forEach((job: any) => {
        if (job.val === correlationMetric) {
          const partFields = job.group.buckets;
          partFields.forEach((partField: any) => {
            const partFieldJson = JSON.parse(partField.val);
            const jobIdWithPartField = partFieldJson.aggr_field;
            const buckets = partField.timestamp.buckets;
            const actualSeries: any[] = [];
            buckets.forEach((timeBucket: any) => {
              const d: Date = new Date(timeBucket.val);
              const ts = d.getTime();
              const actual = timeBucket.actual.buckets[0].val;

              actualSeries.push([actual, ts]);
              baseline.push(actual);
            });

            seriesList.push({
              target: jobIdWithPartField,
              datapoints: actualSeries,
            });
          });
        }
      });

      baseline = Utils.getStdDev(baseline);

      // Populate other metrics and find deviation from baseline
      jobs.forEach((job: any) => {
        if (job.val !== correlationMetric) {
          const partFields = job.group.buckets;
          partFields.forEach((partField: any) => {
            const partFieldJson = JSON.parse(partField.val);
            const jobIdWithPartField = partFieldJson.aggr_field;
            const buckets = partField.timestamp.buckets;
            const actualSeries: any[] = [];

            let compare: any[] = [];
            buckets.forEach((timeBucket: any) => {
              const d: Date = new Date(timeBucket.val);
              const ts = d.getTime();
              const actual = timeBucket.actual.buckets[0].val;
              compare.push(actual);
              actualSeries.push([actual, ts]);
            });

            compare = Utils.getStdDev(compare);
            const dev = this.findCorrelation(baseline, compare);

            seriesList.push({
              target: jobIdWithPartField + ': ' + dev.toFixed(3),
              datapoints: actualSeries,
            });
          });
        }
      });
    } else if (data.facets && data.facets.heatMapByPartFieldsFacet) {
      // Heatmap
      seriesList = [];
      const jobs = data.facets.heatMapByPartFieldsFacet.buckets;

      let prefix = false;
      const groupNames = jobs.map((job: any) => {
        return groupMap.dashboards[job.val];
      });
      prefix = !groupNames.every((val: any, i: any, arr: any) => val === arr[0]); // If all groups are same don't prefix

      const uniqueNames: any = {};
      jobs.forEach((job: any) => {
        const partBuckets = job.partField.buckets;

        partBuckets.forEach((partField: any) => {
          const score: number = partField.s;
          const dayBuckets = partField.Day0.buckets;
          const seriesData: any[] = this.getSeriesData(dayBuckets);

          // Derive series name from part fields
          const partFieldJson = JSON.parse(partField.val);
          const dashboardName = groupMap.dashboards[job.val] ? groupMap.dashboards[job.val] + '_' : '';
          const panelName = groupMap.panels[job.val] ? groupMap.panels[job.val] : '';
          let seriesName = prefix ? dashboardName + panelName : '';
          Object.keys(partFieldJson).forEach(key => {
            if (key === 'aggr_field') {
              return;
            }
            seriesName += '_' + key + '_' + partFieldJson[key];
          });
          seriesName += '_' + partFieldJson.aggr_field;

          if (seriesName.startsWith('_')) {
            seriesName = seriesName.slice(1);
          }

          if (query.labelSize > -1 && seriesName.length > +query.labelSize + 3) {
            // 3 represents 3 dots for elipsis
            seriesName =
              seriesName.substr(0, +query.labelSize / 2) +
              '...' +
              seriesName.substr(seriesName.length - +query.labelSize / 2);

            if (uniqueNames[seriesName] > 0) {
              uniqueNames[seriesName] = uniqueNames[seriesName]++;
              seriesName = seriesName + '_' + uniqueNames[seriesName];
            } else {
              uniqueNames[seriesName] = 1;
            }
          }

          seriesList.push({
            target: seriesName,
            datapoints: seriesData,
            score: score,
          });
        });
      });

      seriesList = this.sortList(seriesList, topN).reverse(); // reverse because heatmap starts from bottom
    } else if (data.facets && data.facets.heatMapFacet) {
      // Heatmap
      seriesList = [];
      const jobs = data.facets.heatMapFacet.buckets;

      let prefix = false;
      const groupNames = jobs.map((job: any) => {
        return groupMap.dashboards[job.val];
      });
      prefix = !groupNames.every((val: any, i: any, arr: any) => val === arr[0]); // If all groups are same don't prefix

      jobs.forEach((job: any) => {
        const dayBuckets = job.Day0.buckets;
        const seriesData: any[] = this.getSeriesData(dayBuckets);

        const dashboardName = groupMap.dashboards[job.val] ? groupMap.dashboards[job.val] + '_' : '';
        const panelName = groupMap.panels[job.val] ? groupMap.panels[job.val] : '';
        const targetName = prefix ? dashboardName + panelName : panelName;
        seriesList.push({
          jobId: job.val,
          target: targetName !== '' ? targetName : job.val,
          datapoints: seriesData,
        });
      });

      if (grouppingEmabled) {
        seriesList = Utils.getGrouppedResults(seriesList, groupMap);
      }

      seriesList = this.sortList(seriesList).reverse(); // reverse because heatmap starts from bottom
    } else if (format === 'rawlogs' || format === 'slowQueries') {
      // Table
      const columns: any[] = [];
      const rows: any[] = [];
      seriesList = {};
      let index = 0;
      if (data && data.response && data.response.docs) {
        data.response.docs.forEach((item: any) => {
          const row = [];
          for (const property in item) {
            // Set columns
            if (index === 0 && item.hasOwnProperty(property)) {
              if (property === timeField) {
                columns.unshift({ type: 'time', text: 'Time' });
              } else {
                columns.push({ type: 'string', text: property });
              }
            }
            // Set rows
            if (property === timeField) {
              const d: Date = new Date(item[timeField]);

              const ts = d.getTime(); //.unix() * 1000;
              row.unshift(ts);
            } else {
              row.push(item[property]);
            }
          }
          index++;
          rows.push(row);
        });
      }
      seriesList = [
        {
          type: 'table',
          columns: columns,
          rows: rows,
        },
      ];
    } else if (format === 'count') {
      seriesList = [];
      const numResults = data && data.response && data.response.numFound ? data.response.numFound : 0;
      seriesList.push({
        target: 'Number of docs',
        datapoints: [[numResults, '']],
      });
    } else if (format === 'chart') {
      // Charts
      seriesList = [];
      data.response.docs.forEach((item: any) => {
        for (const property in item) {
          if (item.hasOwnProperty(property) && property !== timeField) {
            if (typeof series[property] === 'undefined') {
              series[property] = [];
            }
            const date = new Date(item[timeField]);
            const ts = date.getTime();
            series[property].push([item[property] || 0, ts]);
          }
        }
      });
      for (const property in series) {
        seriesList.push({
          target: property,
          datapoints: series[property].sort((a: any, b: any) => {
            return a[1] - b[1];
          }),
        });
      }
    } else if (format === 'metaBar') {
      const field = query.metaBarAggrField || 'mean';
      const statsData = data.stats;
      seriesList = [];
      const pointsMap: any = {};
      Object.keys(statsData.stats_fields).forEach((key: string) => {
        const matches = key.match(/hourly_avg_(\d+)_f/);
        if (matches && matches.length > 1) {
          const val = statsData.stats_fields[key][field];

          pointsMap[matches[1]] = [val, new Date(startTime)];
        }
      });

      Object.keys(pointsMap).forEach(hour => {
        seriesList.push({
          target: hour,
          datapoints: [pointsMap[hour]],
        });
      });
    } else if (format === 'metaCp') {
      seriesList = [];
      const columns = [
        { type: 'string', text: 'Time Range' },
        { type: 'string', text: 'Mean' },
      ];
      let rows: any[] = [];
      data.response.docs.forEach((doc: any) => {
        [...Array(1440).keys()].every((ind: number) => {
          const row = [];
          const cpStartKey = 'changepoint_start_' + ind + '_dt';
          const cpEndKey = 'changepoint_end_' + ind + '_dt';
          const cpValueKey = 'changepoint_mean_' + ind + '_f';

          if (doc[cpStartKey] && doc[cpEndKey]) {
            row.push(doc[cpStartKey] + ' - ' + doc[cpEndKey]);
          }

          if (doc[cpValueKey] || doc[cpValueKey] === 0) {
            row.push(doc[cpValueKey]);
          }

          if (row.length > 0) {
            rows.push(row);
            return true;
          }

          return false;
        });
      });

      rows = rows.sort((r1, r2) => {
        return r1[0] < r2[0] ? -1 : r1[0] > r2[0] ? 1 : 0;
      });

      seriesList = [
        {
          type: 'table',
          columns: columns,
          rows: rows,
        },
      ];
    }

    if (!seriesList) {
      seriesList = [];
    }
    return {
      data: seriesList,
    };
  }

  static getSeriesData(dayBuckets: any[]) {
    const seriesData: any[] = [];
    dayBuckets.forEach((bucket: any) => {
      const d: Date = new Date(bucket.val);
      if (bucket.score && bucket.score.severity && bucket.score.severity) {
        const sevBuckets: any[] = bucket.score.severity.buckets;

        let sevBucket = sevBuckets.find((sevObj: any) => {
          return sevObj.val === 'Critical';
        });

        if (!sevBucket) {
          sevBucket = sevBuckets.find((sevObj: any) => {
            return sevObj.val === 'Warning';
          });
        }

        if (sevBucket) {
          seriesData.push([sevBucket.score, d.getTime()]);
        } else {
          seriesData.push([0, d.getTime()]);
        }
      } else {
        seriesData.push([0, d.getTime()]);
      }
    });

    return seriesData;
  }

  static getAnnotations(response: any, type: string, color: string) {
    const events: AnnotationEvent[] = [];

    response.docs.forEach((doc: any) => {
      [...Array(1440).keys()].every((ind: number) => {
        const cpStartKey = 'changepoint_start_' + ind + '_dt';
        const cpEndKey = 'changepoint_end_' + ind + '_dt';
        const cpValueKey = 'changepoint_mean_' + ind + '_f';

        if (doc[cpStartKey] && doc[cpEndKey] && doc[cpValueKey]) {
          //row.push(doc[cpStartKey] + ' - ' + doc[cpEndKey]);

          const stTime = new Date(doc[cpStartKey]);
          const endTime = new Date(doc[cpEndKey]);
          const event: AnnotationEvent = {
            time: stTime.valueOf(),
            timeEnd: endTime.valueOf(),
            isRegion: true,
            text: doc[cpValueKey],
            title: 'Unique sub-sequence<br>mean value - ' + doc[cpValueKey],
            source: {
              name: 'changePoint',
              iconColor: color,
            },
          };

          events.push(event);
          return true;
        }
        return false;
      });
    });

    return events;
  }

  static getGrouppedResults(seriesList: [], groupMap: any) {
    const groupSeriesList: any = {};
    const seriesListOutput: any[] = [];

    seriesList.forEach((series: any) => {
      const jobId = series.jobId;
      const datapoints: [] = series.datapoints;
      let dashboardName: string = groupMap.dashboards[jobId];

      if (!dashboardName) {
        dashboardName = jobId;
      }
      if (!groupSeriesList[dashboardName]) {
        groupSeriesList[dashboardName] = [];
      }

      datapoints.forEach((data, index) => {
        if (!groupSeriesList[dashboardName][index] || groupSeriesList[dashboardName][index][0] < data[0]) {
          groupSeriesList[dashboardName][index] = data;
        }
      });
    });

    Object.keys(groupSeriesList).forEach((dashboard: string) => {
      seriesListOutput.push({
        target: dashboard,
        datapoints: groupSeriesList[dashboard],
      });
    });

    return seriesListOutput;
  }

  static mapToTextValue(result: any, addQuotes: boolean) {
    if (result.data && result.data.collections) {
      return result.data.collections.map((collection: string) => {
        return {
          text: collection,
          value: collection,
        };
      });
    }
    if (result.data && result.data.facet_counts) {
      const ar: any[] = [];
      for (const key in result.data.facet_counts.facet_fields) {
        if (!result.data.facet_counts.facet_fields.hasOwnProperty(key)) {
          continue;
        }

        const array = result.data.facet_counts.facet_fields[key];
        for (let i = 0; i < array.length; i += 2) {
          // take every second element
          if (
            array[i + 1] > 0 &&
            !ar.find(ele => {
              return ele.text === array[i];
            })
          ) {
            let text = array[i];
            const detectorPatternMatches = text.match(/\( Function: .* Field: (.*) \)/);
            if (detectorPatternMatches) {
              text = detectorPatternMatches[1];
            }

            if (text) {
              text = text
                .replace(/\\/g, '\\\\')
                .replace(/\"/g, '\\"')
                .replace(/{/g, '\\{')
                .replace(/}/g, '\\}');
            }
            ar.push({
              text: addQuotes ? '"' + text + '"' : text,
              expandable: false,
            });
          }
        }
      }
      return ar;
    }
    if (result.data) {
      return result.data
        .split('\n')[0]
        .split(',')
        .map((field: string) => {
          return {
            text: field,
            value: field,
          };
        });
    }
  }

  static getFirstAndLastNResults(data: any, pageSize: any) {
    let arr: any[] = [];
    if (data && data.data && data.data.response) {
      for (let i = 0; i < Math.round(data.data.response.numFound / Number(pageSize.query)); i++) {
        arr.push(i);
      }
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
  }

  static sortList(seriesList: any[], top?: number) {
    seriesList.sort((a: any, b: any) => {
      let totalA = 0;
      let totalB = 0;
      if (a.datapoints && b.datapoints) {
        a.datapoints.map((d: any) => {
          totalA += d[0];
        });
        b.datapoints.map((d: any) => {
          totalB += d[0];
        });
      } else {
        return 0;
      }

      return totalB - totalA;
      // return b.score - a.score;
    });

    if (top) {
      seriesList = seriesList.slice(0, top);
    }

    return seriesList;
  }

  static getSortedSeries(seriesToSort: any[], baselineSeries: any[], indvAnOutField: string, prefix: boolean): any[] {
    const resultSeries: any[] = [];
    const seriesSuffixes = indvAnOutField === 'all' ? ['actual', 'expected', 'score', 'anomaly'] : [indvAnOutField];
    baselineSeries.forEach(baselineSer => {
      const seriesName = baselineSer.target;
      seriesSuffixes.forEach(suffix => {
        resultSeries.push(
          seriesToSort.find(s => {
            return s.target === (prefix ? seriesName + ' ' + suffix : suffix);
          })
        );
      });
    });

    return resultSeries;
  }

  static getStdDev(series: number[]) {
    const min = Math.min(...series);
    const max = Math.max(...series);

    series = series.map(b => {
      return (b - min) / (max - min);
    });

    return series;
  }

  static findCorrelation(x: any, y: any) {
    let sumX = 0,
      sumY = 0,
      sumXY = 0,
      sumX2 = 0,
      sumY2 = 0;
    const minLength = (x.length = y.length = Math.min(x.length, y.length)),
      reduce = (xi: any, idx: any) => {
        const yi = y[idx];
        sumX += xi;
        sumY += yi;
        sumXY += xi * yi;
        sumX2 += xi * xi;
        sumY2 += yi * yi;
      };
    x.forEach(reduce);
    return (
      (minLength * sumXY - sumX * sumY) /
      Math.sqrt((minLength * sumX2 - sumX * sumX) * (minLength * sumY2 - sumY * sumY))
    );
  }

  static queryBuilder(query: string) {
    let q = query.replace(/\\{/g, '^^^').replace(/\\}/g, '@@@');

    q = q
      .replace(/{/g, '(') // (?<!(?:\\)){ Replace { not followed by \ with (. Reverting this part as negative lookbehind
      // //pattern doesn't work in Safari  and Solr treats { and ( same.
      .replace(/}/g, ')') // Replace } not followed by \ with )
      .replace(/\",\"/g, '" OR "');

    q = q.replace(/\^\^\^/g, '\\{').replace(/@@@/g, '\\}');
    return q;
  }
}
