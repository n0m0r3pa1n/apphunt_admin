'use strict';

var React = require('react'),
    InfiniteScroll = require('react-infinite-scroll')(React);
import {UsersStore} from '../../stores/UsersStore.js'
import {UsersAPI} from '../../api/UsersAPI.js'

var usersData = []

function setUsersState(data) {
    usersData = usersData.concat(data)
    return {data: usersData}
}
function getUsersState() {
    return {data: usersData}
}

export var UsersList = React.createClass({
    _hasMore: true,
    _selectedPlatformIndex: 0,
    getInitialState() {
        return getUsersState();
    },
    componentDidMount: function() {
        UsersStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        UsersStore.removeChangeListener(this._onChange);
    },
    _loadMore: function(page) {
        UsersAPI.getUsers(null, "google-plus", page, 20)
    },
    setUsers(data) {
        this.data = data;
        this.setState({data: data})
    },
    render: function() {
        var self = this, data = this.state.data;
        console.log(self._hasMore)
        return (
            <div className="container apps-container">
                <InfiniteScroll
                    pageStart={0}
                    loadMore={self._loadMore}
                    hasMore={!(usersData.length === UsersStore.getUsers().totalCount)}
                    threshold={2}
                    loader={<div className="text-center"><strong>Loading</strong></div>}>
                    {
                        Object.keys(this.state.data).map(function(index){
                            return(
                                <div>{data[index].name}</div>
                            )
                        })}
                </InfiniteScroll>
            </div>
        );
    },
    _onChange: function() {
        this.setState(setUsersState(UsersStore.getUsers().users));
    }
});