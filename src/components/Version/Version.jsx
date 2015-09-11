'use strict';

import React from 'react';

var ReactBootstrap =  require('react-bootstrap')
var Select = require('react-select');
var Button = ReactBootstrap.Button

import {VersionsStore} from '../../stores/VersionsStore.js'
import {VersionAPI} from '../../api/VersionAPI.js'

export default class Version extends React.Component {
    constructor() {
        super();
        VersionAPI.getVersion()
        this.componentDidMount = this.componentDidMount.bind(this)
        this.componentWillUnmount = this.componentWillUnmount.bind(this)
        this._onChange = this._onChange.bind(this)
        this.updateVersion = this.updateVersion.bind(this)
        this.onVersionChange = this.onVersionChange.bind(this)
        this.state = {version: 0}
    }

    componentDidMount() {
        VersionsStore.addChangeListener(this._onChange)
    }

    componentWillUnmount() {
        VersionsStore.removeChangeListener(this._onChange)
    }

    _onChange() {
        this.setState({
            version: VersionsStore.getVersion().versionCode
        })
    }

    updateVersion() {
        let version = React.findDOMNode(this.refs.version).value
        VersionAPI.updateVersion(version)
    }

    onVersionChange(event) {
        this.setState({
            version: event.target.value
        })
    }

    render() {
        return (
            <div className="col-md-offset-1 col-lg-12 panel-heading">
                <div className="form-inline">
                    <div className="input-group-lg col-lg-">
                        <input className="form-control col-md-4" type="text" ref="version" value={this.state.version} onChange={this.onVersionChange}/>
                        <Button onClick={this.updateVersion} bsStyle='primary'>Update</Button>
                    </div>
                </div>
            </div>);
    }
}