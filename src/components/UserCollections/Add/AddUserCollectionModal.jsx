'use strict';

import React from 'react';
var ReactBootstrap =  require('react-bootstrap')
var OverlayMixin = ReactBootstrap.OverlayMixin
var Button = ReactBootstrap.Button
var Modal = ReactBootstrap.Modal

import {UserCollectionsStore} from '../../../stores/UserCollectionsStore.js'
import {UserCollectionsAPI} from '../../../api/UserCollectionsAPI.js'

export var AddUserCollectionModal = React.createClass({
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

    _submitCollection() {
        let userId = "54be5d68e4b0d3cacca686c5";
        let name =  React.findDOMNode(this.refs.name).value;
        let description = React.findDOMNode(this.refs.description).value;
        let picture = React.findDOMNode(this.refs.picture).value;

        UserCollectionsAPI.createCollection(name, description, picture, userId);
    },
    componentDidMount() {
        UserCollectionsStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        UserCollectionsStore.removeChangeListener(this._onChange);
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
                                <label>Name</label>
                                <input type="text" ref="name" className="form-control" required="required" pattern="[A-Za-z0-9]{1,20}"/>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea className="form-control" ref="description" required="required" pattern="[A-Za-z0-9]{1,20}" maxlength="100"></textarea>
                            </div>
                            <div className="form-group">
                                <label>Picture</label>
                                <input type="text" className="form-control" ref="picture" required="required"></input>
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