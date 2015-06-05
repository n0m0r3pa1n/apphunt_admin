'use strict';

import React from 'react';
var ReactBootstrap =  require('react-bootstrap')
var OverlayMixin = ReactBootstrap.OverlayMixin
var Button = ReactBootstrap.Button
var Modal = ReactBootstrap.Modal

var Select = require('react-select');

import {UserCollectionsStore} from '../../../../stores/UserCollectionsStore.js'
import {UserCollectionsAPI} from '../../../../api/UserCollectionsAPI.js'

export var AddUserToCollectionModal = React.createClass({
    getInitialState() {
        return {
            data: [],
            isModalOpen: true
        };
    },

    handleToggle() {
        this.props.onModalToggle(!this.state.isModalOpen)
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    },

    componentDidMount() {
        UserCollectionsAPI.getAvailableCollections(this.props.userId)
        UserCollectionsStore.addLoadUserCollectionsListener(this._onChange)
    },

    componentWillUnmount() {
        UserCollectionsStore.removeLoadUserCollectionsListener(this._onChange)
    },

    _onChange() {
        this.setState({
            isModalOpen: true,
            data: UserCollectionsStore.getUserCollections()
        })
    },
    _onCollectionSelect(collectionId) {
        this.collectionId = collectionId;
    },

    _addToCollection: function() {
        if(this.collectionId == undefined){
            return;
        }
        UserCollectionsAPI.addToCollection(this.collectionId, this.props.userId, this.props.fromDate, this.props.toDate)
        this.handleToggle()
    },

    render() {
        let isModalOpen = this.state.isModalOpen;
        if (!isModalOpen) {
            return <span/>;
        }

        var options = []

        var collections = this.state.data;
        collections.forEach((element, index) => {
            options.push({
                label: element.name,
                value: element._id
            })
        })

        return (
            <Modal bsStyle='primary' title='Add new apps collection' onRequestHide={this.handleToggle}>
                <form>
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="form-group">
                                <Select
                                    options={options}
                                    onChange={this._onCollectionSelect}
                                    />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary save_app" data-dismiss="modal" onClick={this._addToCollection}>Save</button>
                            <Button onClick={this.handleToggle}>Close</Button>
                        </div>
                    </div>
                </form>
            </Modal>
        );
    }
})