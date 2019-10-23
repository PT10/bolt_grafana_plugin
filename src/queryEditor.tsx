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

import React, { PureComponent } from 'react';

// Types
import { BoltDatasource } from './datasource';
import { BoltQuery, BoltOptions } from './types';

import { FormField, QueryEditorProps, FormLabel } from '@grafana/ui';

import _ from 'lodash';

type Props = QueryEditorProps<BoltDatasource, BoltQuery, BoltOptions>;

interface State extends BoltQuery {}

export class BoltQueryEditor extends PureComponent<Props, State> {
  query: BoltQuery;

  constructor(props: Props) {
    super(props);

    const { query } = this.props;
    this.query = query;

    this.state = {
      ...this.state,
      query: query.query,
      collection: query.collection,
      fl: query.fl,
      queryType: query.queryType || 'chart',
      numRows: query.numRows || 100,
      start: query.start || 0,
      facetQuery: query.facetQuery,
      sortField: query.sortField,
      sortOrder: query.sortOrder,
      rexQuery:
        query.rexQuery ||
        '\\s*.*\\s*\\[c\\:(.*)\\ss\\:(.*)\\sr\\:(.*)\\sx\\:(.*)\\]\\s*o.a.s.c.S.SlowRequest.*path=(.*)\\s*' +
          'params=\\{(.*)\\}\\s*.*hits=(.*)\\s*status.*QTime=(.*)',
      rexOutFields: query.rexOutFields || 'collection,shard,replica,core,handler,params,hits,qtime',
      baseMetric: query.baseMetric,
      groupEnabled: query.groupEnabled || 'false',
    };

    const { onChange } = this.props;
    onChange({
      ...this.props.query,
      ...this.state,
    });
  }

  onFieldValueChange = (event: any, _name?: string) => {
    const name = _name ? _name : event.target.name;
    const value = event.target.value;

    this.setState({
      ...this.state,
      [name]: value,
    });

    const { onChange } = this.props;
    onChange({
      ...this.props.query,
      [name]: value,
    });
  };

  render() {
    const chartTypes = [
      { value: 'chart', displayName: 'Chart' },
      { value: 'rawlogs', displayName: 'Raw Logs' },
      { value: 'slowQueries', displayName: 'Slow Queries' },
      { value: 'count', displayName: 'Count' },
      {
        displayName: 'Aggregated Anomalies',
        value: 'aggAnomaly',
      },
      {
        displayName: 'Anomalies by partition field',
        value: 'aggAnomalyByPartFields',
      },
      {
        displayName: 'Individual Anomalies',
        value: 'indvAnomaly',
      },
      {
        displayName: 'Correlation',
        value: 'correlation',
      },
    ];
    const { query, collection, fl, queryType, numRows, start, sortField, sortOrder, rexQuery, rexOutFields, baseMetric, groupEnabled } = this.state;
    const labelWidth = 8;

    return (
      <div>
        {/* First row starts */}
        <div className="gf-form-inline">
          <div className="gf-form">
            <FormLabel width={labelWidth}>Type</FormLabel>
            <select
              value={queryType}
              onChange={(event: any) => {
                this.onFieldValueChange(event, 'queryType');
                // this.resetFields();
              }}
            >
              {chartTypes.sort().map(c => {
                return <option value={c.value}>{c.displayName}</option>;
              })}
            </select>
          </div>
          <div className="gf-form">
            <FormField
              label="Query"
              type="text"
              value={query}
              labelWidth={labelWidth}
              width={4}
              name="query"
              onChange={this.onFieldValueChange}
            ></FormField>
          </div>
          {/* Show group by infor for aggregated anomalies */}
          {queryType === 'aggAnomaly' && (
            <div className="gf-form">
              <FormLabel width={labelWidth}>Group Results</FormLabel>
              <select
                value={groupEnabled}
                onChange={(event: any) => {
                  this.onFieldValueChange(event, 'groupEnabled');
                }}
              >
                <option value={'true'}>{'true'}</option>
                <option value={'false'}>{'false'}</option>
              </select>
            </div>
          )}
          {/* Show collection name textbox */}
          {queryType !== 'aggAnomaly' && queryType !== 'indvAnomaly' && queryType !== 'correlation' && queryType !== 'aggAnomalyByPartFields' && (
            <div className="gf-form">
              <FormField
                label="Collection"
                type="text"
                value={collection}
                labelWidth={labelWidth}
                width={4}
                name="collection"
                onChange={this.onFieldValueChange}
              ></FormField>
            </div>
          )}
          {/* Show base metric for correlation */}
          {queryType === 'correlation' && (
            <div className="gf-form">
              <FormField
                label="Base Metric"
                type="text"
                value={baseMetric}
                labelWidth={labelWidth}
                width={4}
                name="baseMetric"
                onChange={this.onFieldValueChange}
              ></FormField>
            </div>
          )}
          {/* First row ends */}
        </div>
        {/* Seconds row starts */}
        {(queryType === 'chart' || queryType === 'rawlogs' || queryType === 'slowQueries') && (
          <div className="gf-form-inline">
            {(queryType === 'rawlogs' || queryType === 'slowQueries') && (
              <div>
                <div className="gf-form">
                  <FormField
                    label="Sort"
                    type="text"
                    value={sortField}
                    labelWidth={labelWidth}
                    width={4}
                    name="sortField"
                    onChange={this.onFieldValueChange}
                  ></FormField>
                </div>
                <div className="gf-form">
                  <FormField
                    label="Order"
                    type="text"
                    value={sortOrder}
                    labelWidth={labelWidth}
                    width={4}
                    name="sortOrder"
                    onChange={this.onFieldValueChange}
                  ></FormField>
                </div>
              </div>
            )}

            <div className="gf-form">
              <FormField
                label="Out Fields"
                type="text"
                value={fl}
                labelWidth={labelWidth}
                width={4}
                name="fl"
                onChange={this.onFieldValueChange}
              ></FormField>
            </div>
            {(queryType === 'rawlogs' || queryType === 'slowQueries') && (
              <div className="gf-form">
                <FormField
                  label="Number of rows"
                  labelWidth={10}
                  type="text"
                  value={numRows}
                  width={6}
                  name="numRows"
                  onChange={this.onFieldValueChange}
                ></FormField>
              </div>
            )}
            {(queryType === 'rawlogs' || queryType === 'slowQueries') && (
              <div className="gf-form">
                <FormField
                  label="Start page"
                  type="text"
                  value={start}
                  labelWidth={labelWidth}
                  width={4}
                  name="start"
                  onChange={this.onFieldValueChange}
                ></FormField>
              </div>
            )}
          </div>
        )}
        {queryType === 'slowQueries' && (
          <div className="gf-form-inline">
            <div className="gf-form">
              <FormField
                label="Rex Query"
                type="text"
                value={rexQuery}
                labelWidth={labelWidth}
                width={4}
                name="rexQuery"
                onChange={this.onFieldValueChange}
              ></FormField>
            </div>
            <div className="gf-form">
              <FormField
                label="Output Fields"
                type="text"
                value={rexOutFields}
                labelWidth={labelWidth}
                width={4}
                name="rexOutFields"
                onChange={this.onFieldValueChange}
              ></FormField>
            </div>
          </div>
        )}
      </div>
    );
  }
}
