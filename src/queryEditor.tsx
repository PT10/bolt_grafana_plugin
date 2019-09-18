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
      { value: 'table', displayName: 'Table' },
      { value: 'single', displayName: 'Single' },
      {
        displayName: 'Aggregated Anomalies',
        value: 'aggAnomaly',
      },
      {
        displayName: 'Individual Anomalies',
        value: 'indvAnomaly',
      },
    ];
    const { query, collection, fl, queryType, numRows, start, sortField, sortOrder } = this.state;
    const labelWidth = 8;

    return (
      <div>
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
          {queryType !== 'aggAnomaly' && queryType !== 'indvAnomaly' && (
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
        </div>
        {(queryType === 'chart' || queryType === 'table') && (
          <div className="gf-form-inline">
            {queryType === 'table' && (
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
                  <FormLabel width={labelWidth}>Order</FormLabel>
                  <select onChange={(event: any) => this.onFieldValueChange(event, 'sortOrder')}>
                    <option value="asc" selected={sortOrder === 'asc'}>
                      Ascending
                    </option>
                    <option value="desc" selected={sortOrder === 'desc'}>
                      Descending
                    </option>
                  </select>
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
            {(queryType === 'table' || queryType === 'chart') && (
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
            {queryType === 'table' && (
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
      </div>
    );
  }
}
