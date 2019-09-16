import { DataQuery, DataSourceJsonData } from '@grafana/ui';

export interface BoltQuery extends DataQuery {
  query: string;
  collection: string;
  timeField: string;
  fl: string;
  queryType: string;
  numRows: number;
  start: number;
  facetQuery: string;
  sortField: string;
  sortOrder: string;
}

export interface BoltOptions extends DataSourceJsonData {
  // Saved in the datasource
  url: string;
  anCollection: string;
  rawCollection: string;
}
