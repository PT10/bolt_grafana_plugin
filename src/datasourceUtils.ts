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
  static processResponse(response: any, format: any, timeField: string) {
    const data = response.data;
    let seriesList: any;
    const series: any = {};

    // Process line chart facet response
    if (data.facets && data.facets.lineChartFacet) {
      seriesList = [];
      const jobs = data.facets.lineChartFacet.buckets;
      jobs.forEach((job: any) => {
        const jobId = job.val;
        const partFields = job.group.buckets;
        partFields.forEach((partField: any) => {
          let jobIdWithPartField = jobId;

          const partFieldJson = JSON.parse(partField.val);
          Object.keys(partFieldJson).forEach(key => {
            if (key === 'aggr_field') {
              return;
            }
            jobIdWithPartField += '_' + key + '_' + partFieldJson[key];
          });
          jobIdWithPartField += '_' + partFieldJson.aggr_field;

          const buckets = partField.timestamp.buckets;
          const actualSeries: any[] = [];
          const scoreSeries: any[] = [];
          const anomalySeries: any[] = [];
          buckets.forEach((timeBucket: any) => {
            const d: Date = new Date(timeBucket.val);
            const ts = d.getTime();
            const actual = timeBucket.actual.buckets[0].val;
            let score = timeBucket.score.buckets[0].val;
            let anomaly = timeBucket.anomaly.buckets[0].val;
            if (score >= 1 && anomaly) {
              anomaly = actual;
            } else {
              anomaly = null;
              score = null;
            }
            actualSeries.push([actual, ts]);
            scoreSeries.push([score, ts]);
            anomalySeries.push([anomaly, ts]);
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
        });
      });
    } else if (data.facets && data.facets.heatMapFacet) {
      // Heatmap
      seriesList = [];
      const jobs = data.facets.heatMapFacet.buckets;
      jobs.forEach((job: any) => {
        const dayBuckets = job.Day0.buckets;
        const seriesData: any[] = [];
        dayBuckets.forEach((bucket: any) => {
          if (bucket.score != null && bucket.score.score != null) {
            const d: Date = new Date(bucket.val);
            seriesData.push([bucket.score.score, d.getTime()]);
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
    } else if (format === 'rawlogs') {
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

  static queryBuilder(query: string) {
    return query
      .replace(/{/g, '(')
      .replace(/}/g, ')')
      .replace(/,/g, ' OR ');
  }
}
