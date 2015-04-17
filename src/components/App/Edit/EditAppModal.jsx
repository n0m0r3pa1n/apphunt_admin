'use strict';

import React from 'react';
var ReactBootstrap =  require('react-bootstrap')

var Button = ReactBootstrap.Button
var Modal = ReactBootstrap.Modal
var DatePickerInput = require('react-datepicker-component/DatePickerInput.jsx')

import {AppsStore} from '../../../stores/AppsStore.js'
import {AppAPI} from '../../../api/AppAPI.js'

export var EditAppModal = React.createClass({
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

    _updateApp() {
        let appDescription = React.findDOMNode(this.refs.comment).value;
        AppAPI.updateApp(this.appPackage, this.createdAt, appDescription, this.status)
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
    _onCreatedAtChange(date) {
        this.createdAt = date
    },
    handleDescriptionChange: function(event) {
        let description = event.target.value;
        if(description.length <= 100) {
            this.setState({comment: event.target.value});
        }
    },

    render() {
        let isModalOpen = this.state.isModalOpen;
        if (!isModalOpen) {
            return <span/>;
        }

        this.app = this.props.app;
        this.createdAt = this.app.createdAt;
        this.appPackage = this.app.package;
        this.status = this.app.status;
        let title = 'Edit ' + this.app.name;
        let description = this.app.comment;
        if(this.state.comment !== undefined) {
            description = this.state.comment;
        }
        return (
            <Modal bsStyle='primary' title={title} onRequestHide={this.handleToggle}>
                <form>
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Created At</label>
                            <DatePickerInput ref="createdAt" date={new Date(this.app.createdAt)} onChangeDate={this._onCreatedAtChange}  />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input type="text" ref="description" className="form-control" value={description} maxlength="100" onChange={this.handleDescriptionChange} required="required"/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary save_app" data-dismiss="modal" onClick={this._updateApp}>Save</button>
                        <Button onClick={this.handleToggle}>Close</Button>
                    </div>
                </div>
                    </form>
            </Modal>
        );
    }
})