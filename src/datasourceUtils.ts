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
  static processResponse(response: any, format: any, timeField: string, correlationMetric?: string) {
    const data = response.data;
    let seriesList: any;
    const series: any = {};

    // Process line chart facet response
    if (data.facets && data.facets.lineChartFacet) {
      seriesList = [];
      const jobs = data.facets.lineChartFacet.buckets;
      const multiJobQuery = jobs.length > 1;
      jobs.forEach((job: any) => {
        const jobId = multiJobQuery ? job.val : '';
        const partFields = job.group.buckets;
        partFields.forEach((partField: any) => {
          let jobIdWithPartField: string = jobId;
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
          const expectedSeries: any[] = [];
          const scoreSeries: any[] = [];
          const anomalySeries: any[] = [];
          const expectedSeries: any[] = [];
          buckets.forEach((timeBucket: any) => {
            const d: Date = new Date(timeBucket.val);
            const ts = d.getTime();
            const actual = timeBucket.actual.buckets[0].val;
            const expected = timeBucket.expected.buckets[0].val;
            let score = timeBucket.score.buckets[0].val;
            let anomaly = timeBucket.anomaly.buckets[0].val;
            const expected = timeBucket.expected.buckets[0].val;
            if (score >= 1 && anomaly) {
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
            target: jobIdWithPartField + ' actual',
            datapoints: actualSeries,
          });
          seriesList.push({
            target: jobIdWithPartField + ' score',
            datapoints: scoreSeries,
          });
          seriesList.push({
            target: jobIdWithPartField + ' anomaly',
            datapoints: anomalySeries,
          });
          seriesList.push({
            target: jobIdWithPartField + ' expected',
            datapoints: expectedSeries,
          });
        });
      });
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

      baseline = this.getStdDev(baseline);

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

            compare = this.getStdDev(compare);
            const dev = this.findCorrelation(baseline, compare);

            seriesList.push({
              target: jobIdWithPartField + ': ' + dev.toFixed(3),
              datapoints: actualSeries,
            });
          });
        }
    } else if (data.facets && data.facets.heatMapByPartFieldsFacet) {
      // Heatmap
      seriesList = [];
      const jobs = data.facets.heatMapByPartFieldsFacet.buckets;
      const multiJobQuery = jobs.length > 1;
      jobs.forEach((job: any) => {
        const partBuckets = job.partField.buckets;
        partBuckets.forEach((partField: any) => {
          const dayBuckets = partField.Day0.buckets;
          const seriesData: any[] = [];
          dayBuckets.forEach((bucket: any) => {
            const d: Date = new Date(bucket.val);
            if (bucket.score != null && bucket.score.score != null) {
              seriesData.push([bucket.score.score, d.getTime()]);
            } else {
              seriesData.push([0, d.getTime()]);
            }
          });
          // Derive series name from part fields
          const partFieldJson = JSON.parse(partField.val);
          let seriesName = multiJobQuery ? job.val : '';
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

          seriesList.push({
            target: seriesName,
            datapoints: seriesData,
          });
        });
      });

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

        return totalA - totalB;
      });
    } else if (data.facets && data.facets.heatMapFacet) {
      // Heatmap
      seriesList = [];
      const jobs = data.facets.heatMapFacet.buckets;
      jobs.forEach((job: any) => {
        const dayBuckets = job.Day0.buckets;
        const seriesData: any[] = [];
        dayBuckets.forEach((bucket: any) => {
          const d: Date = new Date(bucket.val);
          if (bucket.score != null && bucket.score.score != null) {
            seriesData.push([bucket.score.score, d.getTime()]);
          } else {
            seriesData.push([0, d.getTime()]);
          }
        });
        seriesList.push({
          target: job.val,
          datapoints: seriesData,
        });
      });

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

        return totalA - totalB;
      });
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
    }

    if (!seriesList) {
      seriesList = [];
    }
    return {
      data: seriesList,
    };
  }

  static mapToTextValue(result: any) {
    if (result.data && result.data.collections) {
      return result.data.collections.map((collection: string) => {
        return {
          text: collection,
          value: collection,
        };
      });
    }
    if (result.data && result.data.facet_counts) {
      const ar = [];
      for (const key in result.data.facet_counts.facet_fields) {
        if (result.data.facet_counts.facet_fields.hasOwnProperty(key)) {
          const array = result.data.facet_counts.facet_fields[key];
          for (let i = 0; i < array.length; i += 2) {
            // take every second element
            ar.push({
              text: array[i],
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
    return (minLength * sumXY - sumX * sumY) / Math.sqrt((minLength * sumX2 - sumX * sumX) * (minLength * sumY2 - sumY * sumY));
  }

  static queryBuilder(query: string) {
    return query
      .replace(/{/g, '(')
      .replace(/}/g, ')')
      .replace(/,/g, ' OR ');
  }
}
