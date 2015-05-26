'use strict';

import React from 'react';
var ReactBootstrap =  require('react-bootstrap')

var Button = ReactBootstrap.Button
var Modal = ReactBootstrap.Modal
var DatePicker = require('react-datepicker')
var moment = require('moment')

import {AppsStore} from '../../../stores/AppsStore.js'
import {AppAPI} from '../../../api/AppAPI.js'

export var EditAppModal = React.createClass({

    getInitialState() {
        console.log(moment(this.props.app.createdAt))
        return {
            isModalOpen: true,
            selectedDate: moment(this.props.app.createdAt)
        };
    },
    handleToggle() {
        this.props.onModalToggle(!this.state.isModalOpen)
        console.log("toggle");
        this.setState({
            isModalOpen: !this.state.isModalOpen

        });
    },

    _updateApp() {
        let appDescription = React.findDOMNode(this.refs.description).value;
        let createdAt = this.state.selectedDate.toDate()
        console.log(createdAt)
        AppAPI.updateApp(this.appPackage, createdAt, appDescription, this.status)
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
        this.setState({
            selectedDate: date
        })
    },
    handleDescriptionChange: function(event) {
        let description = event.target.value;
        if(description.length <= 100) {
            this.setState({description: event.target.value});
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
        let description = this.app.description;
        if(this.state.description !== undefined) {
            description = this.state.description;
        }
        return (
            <Modal bsStyle='primary' title={title} onRequestHide={this.handleToggle}>
                <form>
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Created At</label>
                            <DatePicker ref="createdAt" selected={this.state.selectedDate} onChange={this._onCreatedAtChange}  />
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