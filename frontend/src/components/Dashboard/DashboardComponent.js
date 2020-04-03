import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Table from 'react-bootstrap/Table'
import './DashboardComponent.scss'
import UserService from "../../services/UserService";
import AuthService from "../../services/AuthService";

export class DashboardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            userList: null
        };
    }

    componentDidMount() {
        const { currentUser } = this.state;
        if (currentUser.roles === "ROLE_MANAGER" || currentUser.roles === "ROLE_ADMIN") {
            UserService.getAllUsers().then(response => {
                this.setState({
                    userList: response.data
                })
            })
        } else {
            let u = [];
            u.push(this.state.currentUser)
            this.setState({
                userList: u
            })
        }
    }

    routesToEmployee = (id) => {
        this.props.history.push("/task/" + id);
    }

    userTable = () => {
        const { userList } = this.state;
        let result = userList.map((r, i) => {
            return (
                <tr key={r.id} onClick={() => this.routesToEmployee(r.id)}>
                    <td>{i + 1}</td>
                    <td>{r.username}</td>
                </tr>);
        }
        )
        return result;
    }

    render() {
        const { userList } = this.state;
        return (
            <div className="container">
                <h1>List Users</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Employee Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList != null ? this.userTable() : null}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default withRouter(DashboardComponent);
