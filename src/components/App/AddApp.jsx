'use strict';

import React from 'react';
var ReactBootstrap =  require('react-bootstrap')
var OverlayMixin = ReactBootstrap.OverlayMixin
var Button = ReactBootstrap.Button
var Modal = ReactBootstrap.Modal
// Our custom component is managing whether the Modal is visible
export var AddApp = React.createClass({
    mixins: [OverlayMixin],

    getInitialState() {
        return {
            isModalOpen: false
        };
    },

    handleToggle() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    },

    render() {
        return (
            <Button onClick={this.handleToggle} bsStyle='primary'><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></Button>
        );
    },

    // This is called by the `OverlayMixin` when this component
    // is mounted or updated and the return value is appended to the body.
    renderOverlay() {
        if (!this.state.isModalOpen) {
            return <span/>;
        }

        return (
            <Modal bsStyle='primary' title='Add new app' onRequestHide={this.handleToggle}>
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="form-group">
                                    <input type="radio" name="app_platform" value="Android" checked="checked" />
                                    <label> Android</label>
                                    <input type="radio" name="app_platform" value="iOS" />
                                    <label> iOS</label>
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
                                <button type="button" className="btn btn-primary save_app" data-dismiss="modal">Save</button>
                                <Button onClick={this.handleToggle}>Close</Button>
                            </div>
                    </div>
            </Modal>
        );
    }
});
