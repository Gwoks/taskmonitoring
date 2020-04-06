import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import './DashboardComponent.scss'
import UserService from "../../services/UserService";
import AuthService from "../../services/AuthService";

export class DashboardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            userList: null,
            message: '',
            isShowWarning: false
        };
    }

    componentDidMount() {
        const { currentUser } = this.state;
        if (currentUser.roles === "ROLE_MANAGER" || currentUser.roles === "ROLE_ADMIN") {
            UserService.getAllUsers().then(response => {
                this.setState({
                    userList: response.data
                })
            },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        message: resMessage,
                        isShowWarning: true
                    });
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

    renderWarning = () => {
        const { message } = this.state;
        return (
            <Alert variant={'danger'}>
                Warning! {message}
            </Alert>
        )
    }

    render() {
        const { userList, isShowWarning } = this.state;
        return (
            <div className="container">
                {isShowWarning ? this.renderWarning() : null}
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
