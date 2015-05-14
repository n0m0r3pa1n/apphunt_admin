'use strict';

import React from 'react';
var ReactBootstrap =  require('react-bootstrap')
var OverlayMixin = ReactBootstrap.OverlayMixin
var Button = ReactBootstrap.Button
var Modal = ReactBootstrap.Modal

import {DateUtils} from '../../../../utils/DateUtils.js'

import {AppCollectionsStore} from '../../../../stores/AppCollectionsStore.js'
import {AppCollectionsAPI} from '../../../../api/AppCollectionsAPI.js'

var DatePickerInput = require('react-datepicker-component/DatePickerInput.jsx')

export var AddAppsModal = React.createClass({

    getInitialState() {
        this.fromDate = new Date()
        this.toDate = new Date()
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

    _submitCollection() {

        //AppCollectionsAPI.createCollection(name, description, picture, userId);
    },
    componentDidMount() {
        AppCollectionsStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        AppCollectionsStore.removeChangeListener(this._onChange);
    },

    _onChange(data) {
        this.handleToggle()
    },

    render() {
        let isModalOpen = this.state.isModalOpen;
        if (!isModalOpen) {
            return <span/>;
        }

        return (
            <Modal bsStyle='primary' title='Add new apps collection' onRequestHide={this.handleToggle}>
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
                                <DatePickerInput date={this.fromDate}  dateFormatter={DateUtils.formatDate} onChangeDate={this._onDateChange}/>
                                <DatePickerInput date={this.toDate}  dateFormatter={DateUtils.toDate} onChangeDate={this._onDateChange}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary save_app" data-dismiss="modal" onClick={this._submitCollection}>Save</button>
                            <Button onClick={this.handleToggle}>Close</Button>
                        </div>
                    </div>
                </form>
            </Modal>
        );
    }
})