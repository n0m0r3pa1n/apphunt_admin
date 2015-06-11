'use strict';

import React from 'react';
var ReactBootstrap =  require('react-bootstrap')
var OverlayMixin = ReactBootstrap.OverlayMixin
var Button = ReactBootstrap.Button
var Modal = ReactBootstrap.Modal

import {AppsStore} from '../../../stores/AppsStore.js'
import {AppAPI} from '../../../api/AppAPI.js'

var $ = require('jquery')

export var AddAppModal = React.createClass({
    getInitialState() {
        return {
            isModalOpen: true
        };
    },

    handleToggle() {
        this.props.onModalToggle(!this.state.isModalOpen)
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    },

    _submitApp() {
        let platform =  React.findDOMNode(this.refs.platform).value;
        let appPackage = React.findDOMNode(this.refs.package).value;
        let appDescription = React.findDOMNode(this.refs.app_description).value;

        AppAPI.addApp(platform, appPackage, appDescription);
    },
    componentDidMount() {
        AppsStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        AppsStore.removeChangeListener(this._onChange);
    },

    _onChange(data) {
        this.handleToggle()
    },

    _onKeyUp() {
        let appDescription = React.findDOMNode(this.refs.app_description).value;
        var left = 100 - appDescription.length;
        if (left < 0) {
            left = 0;
        }
        $('#chars_left').text(left);
    },

    render() {
        let isModalOpen = this.state.isModalOpen;
        if (!isModalOpen) {
            return <span/>;
        }

        return (
            <Modal bsStyle='primary' title='Add new app' onRequestHide={this.handleToggle}>
                <form>
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="form-group">
                            <select ref="platform">
                                <option defaultValue>Android</option>
                                <option>iOS</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Package/ ID</label>
                            <input type="text" ref="package" className="form-control" required="required" pattern="[A-Za-z0-9]{1,20}"/>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <label>(characters left) : <span id="chars_left" style={{color: "red"}}>100</span></label>
                            <textarea className="form-control" ref="app_description" required="required" pattern="[A-Za-z0-9]{1,20}"
                                      maxLength="100" onKeyUp={this._onKeyUp}></textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary save_app" data-dismiss="modal" onClick={this._submitApp}>Save</button>
                        <Button onClick={this.handleToggle}>Close</Button>
                    </div>
                </div>
                    </form>
            </Modal>
        );
    }
})