'use strict';

var React = require('react'),
    InfiniteScroll = require('react-infinite-scroll')(React);
import {UsersStore} from '../../stores/UsersStore.js'
import {UsersAPI} from '../../api/UsersAPI.js'
var _ = require("lodash")

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
    page: 1,
    selectedUserIds: [],

    getInitialState() {
        return getUsersState();
    },
    componentDidMount: function () {
        UsersStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        UsersStore.removeChangeListener(this._onChange);
    },
    _onChange: function () {
        var state = setUsersState(UsersStore.getUsers().users);
        this._hasMore = !(usersData.length === UsersStore.getUsers().totalCount)
        this.setState(state);
    },
    _loadMore: function () {
        UsersAPI.getUsers(this.props.query, this.props.loginType, this.page, 20)
        this.page++
    },
    handleChange(userId, element) {
        if(element.target.checked) {
            this.selectedUserIds.push(userId)
        } else {
            _.remove(this.selectedUserIds, function(id) {
                return id === userId;
            });
        }
    },
    getSelectedUserIds() {
      return this.selectedUserIds;
    },
    setUsers(data) {
        this.data = data;
        this.setState({data: data})
    },
    updateState() {
        usersData = []
        this.page = 1
        this._hasMore = true
        this.setState(setUsersState([]))
    },
    render: function () {
        var self = this, data = this.state.data;
        var userStyle = {
            marginLeft: 10
        }

        return (
            <div className="container apps-container">
                <div>Total Count: {UsersStore.getUsers().totalCount}</div>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={self._loadMore}
                    hasMore={this._hasMore}
                    threshold={2}
                    loader={<div className="text-center"><strong>Loading</strong></div>}>
                    {
                        Object.keys(this.state.data).map(function (index) {
                            let user = data[index];
                            return (
                                <div style={userStyle}>
                                    <div>
                                        <input type="checkbox" defaultChecked={false} onChange={self.handleChange.bind(self, user._id)}/>
                                        <a href={user.profilePicture}>
                                            <img src={user.profilePicture} style={{width: 40, marginLeft:10, marginRight: 10, marginTop: 10}}/>
                                        </a>
                                        {user.name} - <b>{user.username}</b> - <i>{user.loginType}</i> <a
                                            href={'mailto:' + user.email}>{user.email}</a></div>
                                </div>
                            )
                        })}
                </InfiniteScroll>
            </div>
        );
    }
});