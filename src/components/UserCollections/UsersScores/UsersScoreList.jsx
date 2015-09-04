import React from 'react';
import {UsersStore} from '../../../stores/UsersStore.js'
import {AddUserToCollection} from './Add/AddUserToCollection.jsx'

export default class UsersScoreList extends React.Component {

    constructor() {
        super();
        this._onChange = this._onChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.setUsersScore = this.setUsersScore.bind(this);
    }

    componentDidMount() {
        UsersStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        UsersStore.removeChangeListener(this._onChange);
    }

    _onChange(data) {
        this.setUsersScore(UsersStore.getUsersScore())
    }

    setUsersScore(data) {
        this.setState({data: data})
    }

    render() {
        let data = this.state != null ? this.state.data : []
        return (<div className="row panel">
                <table className="table table-bordered table-hover panel-body" id="apps_table">
                    <thead>
                    <tr>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Apps</th>
                        <th>Comments</th>
                        <th>Collections</th>
                        <th>Votes</th>
                        <th>Score</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        Object.keys(data).map((field, i) => {
                            let user = data[i]
                            let type = user.loginType == "fake" ? "fake" : "real"
                            return (
                                <tr>
                                    <td><img src={user.profilePicture} width="100"/></td>
                                    <td>{user.name} <a href={'mailto:' + user.email}>Email</a></td>
                                    <td>{user.username}</td>
                                    <td>{user.apps}</td>
                                    <td>{user.comments}</td>
                                    <td>{user.collections}</td>
                                    <td>{user.votes}</td>
                                    <td>{user.score}</td>
                                    <td>{type}</td>
                                    <td><AddUserToCollection userId={user._id} fromDate={this.props.fromDate} toDate={this.props.toDate}/></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }

}