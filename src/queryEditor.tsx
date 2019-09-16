import React, { PureComponent } from 'react';

// Types
import { BoltDatasource } from './datasource';
import { BoltQuery, BoltOptions } from './types';

import { FormField, QueryEditorProps, FormLabel } from '@grafana/ui';

type Props = QueryEditorProps<BoltDatasource, BoltQuery, BoltOptions>;

interface State extends BoltQuery {}

export class BoltQueryEditor extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    const query = this.props.query.query || '';
    const collection = this.props.query.collection || '';
    const timeField = this.props.query.timeField || 'timestamp';
    const fl = this.props.query.fl || '';
    const queryType = this.props.query.queryType || 'chart';
    const numRows = this.props.query.numRows || 100;
    const start = this.props.query.start || 0;
    const facetQuery = this.props.query.facetQuery || '';
    const sortField = this.props.query.sortField || timeField;
    const sortOrder = this.props.query.sortOrder || 'desc';

    this.state = {
      ...this.state,
      query: query,
      collection: collection,
      timeField: timeField,
      fl: fl,
      queryType: queryType,
      numRows: numRows,
      start: start,
      facetQuery: facetQuery,
      sortField: sortField,
      sortOrder: sortOrder,
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

  resetFields = () => {
    this.setState({
      fl: '',
      numRows: 100,
      start: 0,
      facetQuery: '',
      sortField: this.props.query.timeField,
      sortOrder: 'desc',
    });

    const { onChange } = this.props;
    onChange({
      ...this.props.query,
      fl: '',
      numRows: 100,
      start: 0,
      facetQuery: '',
      sortField: this.props.query.timeField,
      sortOrder: 'desc',
    });
  };

  render() {
    const chartTypes = [
      { value: 'chart', displayName: 'Chart' },
      { value: 'table', displayName: 'Table' },
      { value: 'single', displayName: 'Single' },
      { value: 'facet', displayName: 'Facet' },
    ];
    const { query, collection, timeField, fl, queryType, numRows, start, facetQuery, sortField, sortOrder } = this.state;
    const labelWidth = 8;
    // const facetOptions = [{ value: 'Heat Map', displayName: 'Heatmap' }, { value: 'Line chatrt', displayName: 'Line chart' }];

    const facetOptions = [
      {
        displayName: 'HeatMap Facet Query',
        value:
          '{"heatMapFacet":{"numBuckets":true,"offset":0,"limit":10000,"type":"terms","field":"jobId","facet":{"Day0":{"type":"range",' +
          '"field":"timestamp","start":"__START_TIME__","end":"__END_TIME__","gap":"+1HOUR","facet":{"score":{"type":"query","q":"*:*",' +
          '"facet":{"score":"max(score_value)"}}}}}}}',
      },
      {
        displayName: 'LineChart FacetQuery',
        value:
          '{"lineChartFacet":{"numBuckets":true,"offset":0,"limit":10,"type":"terms","field":"jobId","facet":{"group":{"numBuckets":true,' +
          '"offset":0,"limit":10,"type":"terms","field":"partition_fields","sort":"s desc","ss":"sum(s)","facet":{"s":"sum(score_value)",' +
          '"timestamp":{"type":"terms","limit":-1,"field":"timestamp","sort":"index","facet":{"actual":{"type":"terms","field":"actual_value"}, ' +
          '"score":{"type":"terms","field":"score_value"},"anomaly":{"type":"terms","field":"is_anomaly"}}}}}}}}',
      },
    ];
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
          <div className="gf-form">
            <FormField
              label="Time Field"
              type="text"
              value={timeField}
              labelWidth={labelWidth}
              width={4}
              name="timeField"
              onChange={this.onFieldValueChange}
            ></FormField>
          </div>
        </div>
        {queryType === 'facet' && (
          <div className="gf-form-inline">
            <div className="gf-form">
              <FormLabel width={labelWidth}>Facet Query</FormLabel>
              <select contentEditable={true} value={facetQuery} onChange={(event: any) => this.onFieldValueChange(event, 'facetQuery')}>
                <option></option>
                {facetOptions.map(f => {
                  return <option value={f.value}>{f.displayName}</option>;
                })}
              </select>
            </div>
          </div>
        )}
        {queryType !== 'facet' && queryType !== 'single' && (
          <div className="gf-form-inline">
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
            {queryType !== 'single' && (
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
