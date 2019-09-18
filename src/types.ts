import { DataQuery, DataSourceJsonData } from '@grafana/ui';

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
}

export interface BoltOptions extends DataSourceJsonData {
  // Saved in the datasource
  anCollection: string;
  timestampField: string;
}
