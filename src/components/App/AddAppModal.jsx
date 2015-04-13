'use strict';

import React from 'react';
var ReactBootstrap =  require('react-bootstrap')
var OverlayMixin = ReactBootstrap.OverlayMixin
var Button = ReactBootstrap.Button
var Modal = ReactBootstrap.Modal

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
        console.log(platform)
    },

    render() {
        let isModalOpen = this.state.isModalOpen;


        if (!isModalOpen) {
            return <span/>;
        }

        return (
            <Modal bsStyle='primary' title='Add new app' onRequestHide={this.handleToggle}>
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
                            <input type="text" name="package" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <label>(characters left) : <span id="chars_left"></span></label>
                            <textarea className="form-control" id="app_description" maxlength="100"></textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary save_app" data-dismiss="modal" onClick={this._submitApp}>Save</button>
                        <Button onClick={this.handleToggle}>Close</Button>
                    </div>
                </div>
            </Modal>
        );
    }
})