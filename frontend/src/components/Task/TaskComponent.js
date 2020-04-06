import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import './TaskComponent.scss'
import AuthService from "../../services/AuthService";
import TaskService from "../../services/TaskService"

export class TaskComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            role: AuthService.getCurrentUser().roles,
            isShowAllTask: true,
            isUpdateTask: false,
            isAddTask: false,
            message: '',
            isShowWarning: false,
            taskDetail: {},
            allTask: []
        };
    }

    taskModel = () => {
        return {
            title: '',
            description: '',
            userId: ''
        }
    }

    componentDidMount() {
        this.getAllTask(this.state.id)
    }

    getAllTask = (id) => {
        let data = this.taskModel();
        data.userId = id
        TaskService.getAllTask(this.state.id).then(r => {
            this.setState({
                allTask: r.data,
                isShowAllTask: true,
                isUpdateTask: false,
                isAddTask: false,
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
    }

    updateTask = (id, data) => {
        TaskService.updateTask(id, data).then(response => {
            this.getAllTask()
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
    }

    createTask = (data) => {
        TaskService.createTask(data).then(response => {
            this.getAllTask()
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
    }

    findOneTask = (id) => {
        TaskService.findOne(id).then(response => {
            this.setState({
                taskDetail: response.data,
                isShowAllTask: false,
                isUpdateTask: true,
                isAddTask: false,
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
        })
    }

    addTask = () => {
        this.setState({
            isShowAllTask: false,
            isUpdateTask: false,
            isAddTask: true,
        })
    }

    deleteTask = (id) => {
        let data = this.taskModel();
        data.userId = this.state.id
        TaskService.remove(id).then(r => {
            this.getAllTask(this.state.id)
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
    }

    taskTable = () => {
        const { allTask } = this.state;
        let result = allTask.map((r, i) => {
            return (
                <tr key={r.id}>
                    <td>{i + 1}</td>
                    <td>{r.title}</td>
                    <td>{r.description}</td>
                    <td>
                        <Button variant="warning" onClick={() => this.findOneTask(r.id)}>Update</Button>
                        <Button variant="danger" onClick={() => this.deleteTask(r.id)}>Delete</Button>
                    </td>
                </tr>);
        }
        )
        return result;
    }

    renderAllTask = () => {
        const { allTask } = this.state;
        return (
            <div className="container section">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Task</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allTask != null ? this.taskTable() : null}
                    </tbody>
                </Table>
            </div>
        )
    }

    renderUpdateTask = () => {
        const { taskDetail } = this.state;
        let value = this.taskModel();

        const onTitleChange = (event) => {
            value.title = event.currentTarget.value
        }

        const onDescriptionChange = (event) => {
            value.description = event.currentTarget.value
        }

        const formUpdate = (value) => {
            value.userId = this.state.id
            this.updateTask(taskDetail.id, value);
        }

        return (
            <div className="container section">
                <Form.Group>
                    <Form.Control type="text" placeholder="Title"
                        defaultValue={taskDetail.title}
                        onChange={onTitleChange}
                    />
                    <br />
                    <Form.Control as="textarea" rows="3" placeholder=" Description"
                        defaultValue={taskDetail.description}
                        onChange={onDescriptionChange} />
                    <br />
                    <Button variant="primary" size="lg" block onClick={() => formUpdate(value)}>Update</Button>
                </Form.Group>
            </div>
        )
    }

    renderAddTask = () => {
        let value = this.taskModel();

        const onTitleChange = (event) => {
            value.title = event.currentTarget.value
        }

        const onDescriptionChange = (event) => {
            value.description = event.currentTarget.value
        }

        const formUpdate = (value) => {
            value.userId = this.state.id
            this.createTask(value);
        }

        return (
            <div className="container section">
                <Form.Group>
                    <Form.Control type="text" placeholder="Title"
                        onChange={onTitleChange}
                    />
                    <br />
                    <Form.Control as="textarea" rows="3" placeholder=" Description"
                        onChange={onDescriptionChange} />
                    <br />
                    <Button variant="primary" size="lg" block onClick={() => formUpdate(value)}>Add Task</Button>
                </Form.Group>
            </div>
        )
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
        const { isShowAllTask, isUpdateTask, isAddTask, isShowWarning } = this.state;
        return (
            <div className="container">
                {isShowWarning ? this.renderWarning() : null}
                <h1>Task Monitoring</h1>
                <Button variant="primary" onClick={() => this.addTask()}>Add Task</Button>
                {isShowAllTask ? this.renderAllTask() : null}
                {isUpdateTask ? this.renderUpdateTask() : null}
                {isAddTask ? this.renderAddTask() : null}
            </div>


        );
    }
}

export default withRouter(TaskComponent);
