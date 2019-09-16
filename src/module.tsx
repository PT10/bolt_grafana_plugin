import { DataSourcePlugin } from '@grafana/ui';

import { BoltDatasource } from './datasource';

import { BoltQueryEditor } from './queryEditor';
import { BoltOptions, BoltQuery } from './types';

export class BoltConfigControl {
  static templateUrl = 'partials/config.html';
}

export const plugin = new DataSourcePlugin<BoltDatasource, BoltQuery, BoltOptions>(BoltDatasource)
  .setConfigCtrl(BoltConfigControl)
  .setQueryEditor(BoltQueryEditor);
