import React from 'react';
import {UsersStore} from '../../../stores/UsersStore.js'

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
        return (
            <div>
                {
                    Object.keys(data).map((field, i) => {
                        let user = data[i]
                        console.log(user)
                        return (
                            <div>
                                {user.score} <br />
                            </div>
                        )
                })
                }
            </div>
        )
    }

}