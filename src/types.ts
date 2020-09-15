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

import { DataQuery, DataSourceJsonData } from '@grafana/data';

export interface BoltQuery extends DataQuery {
  query: string;
  collection: string;
  fl: string;
  queryType: string;
  numRows: number;
  start: number;
  facetQuery: string;
  sortField: string;
  sortOrder: string;
  rexQuery: string;
  rexOutFields: string;
  baseMetric: string;
  groupEnabled: string;
  aggInterval: string;
  indvAnOutField: string;
  metaBarAggrField: string;
}

export interface BoltOptions extends DataSourceJsonData {
  // Saved in the datasource
  url: string;
  anCollection: string;
  jobConfigCollection: string;
  rawCollection: string;
  rawCollectionType: string;
  rawCollectionWindow: number;
  timestampField: string;
  anomalyThreshold: number;
  topN: string;
}
