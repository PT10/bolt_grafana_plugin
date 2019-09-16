import React, { PureComponent } from 'react';

// Types
import { BoltOptions } from './types';

import { DataSourcePluginOptionsEditorProps, DataSourceSettings } from '@grafana/ui';

type BoltSettings = DataSourceSettings<BoltOptions>;

interface Props extends DataSourcePluginOptionsEditorProps<BoltSettings> {}

interface State {
  config: any;
}

export class BoltConfigEditor extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    const { options } = this.props;

    this.state = {
      config: options,
    };
  }

  updateCollections = (event: any) => {
    const name: string = event.target.name;
    const val: string = event.target.value;

    const { options, onOptionsChange } = this.props;

    const jsonData = {
      ...options.jsonData,
      [name]: val,
    };

    onOptionsChange({
      ...options,
      jsonData,
    });
  };

  render() {
    return (
      <div className="tight-form">
        <h3 className="page-heading">Solr settings</h3>
        <div className="gf-form-group">
          <div className="gf-form-inline">
            <div className="gf-form max-width-30">
              <span className="gf-form-label width-16">Solr URL</span>
              <input
                className="gf-form-input ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required"
                type="text"
                placeholder="Solr URL"
                min-length="0"
                data-provide="typeahead"
                name="url"
                value={this.props.options.jsonData.url}
                onChange={this.updateCollections}
              />
            </div>
          </div>
          <div className="gf-form-inline">
            <div className="gf-form max-width-30">
              <span className="gf-form-label width-16">Anomaly Collection Name</span>
              <input
                className="gf-form-input ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required"
                type="text"
                placeholder="Collection Name"
                min-length="0"
                data-provide="typeahead"
                name="anCollection"
                value={this.props.options.jsonData.anCollection}
                onChange={this.updateCollections}
              />
            </div>
          </div>
          <div className="gf-form-inline">
            <div className="gf-form max-width-30">
              <span className="gf-form-label width-16">Raw Collection Name</span>
              <input
                className="gf-form-input ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required"
                type="text"
                placeholder="Collection Name"
                min-length="0"
                data-provide="typeahead"
                name="rawCollection"
                value={this.props.options.jsonData.rawCollection}
                onChange={this.updateCollections}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
