import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import TaskList from '../components/TaskList/TaskList';
import { TaskItemType } from '../components/TaskItem/TaskItem';
import TaskItemForm from '../components/TaskItemForm/TaskItemForm';

interface LoginProps {
    setAlert: (text: string, variant?: string, timeout?: number) => void;
}

const Home: React.FC<LoginProps> = ({ setAlert }) => {
    const [tasks, setTasks] = useState<TaskItemType[]>([]);
    const [showTaskItemForm, setShowTaskItemForm] = useState(false);
    const [formTitle, setFormTitle] = useState('');
    const [taskFormData, setTaskFormData] = useState<TaskItemType>({ id: 0, title: '', description: '' });
    const [readyToUpdate, setReadyToUpdate] = useState(false);

    const getTasks = async () => {
        const token = sessionStorage.getItem('token');
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await fetch('https://young-earth-00064.herokuapp.com/api/user/todos', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === 'success') {
                    setTasks(result.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const addTask = async () => {
        const token = sessionStorage.getItem('token');
        const formdata = new FormData();
        formdata.append('title', taskFormData.title);
        formdata.append('description', taskFormData.description);
        const requestOptions = {
            method: 'POST',
            body: formdata,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await fetch('https://young-earth-00064.herokuapp.com/api/user/todos', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === 'success') {
                    setAlert(result.message);
                    getTasks();
                }
                if (result.error === false) {
                    setTaskFormData({ id: 0, title: '', description: '' });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updateTask = async () => {
        const token = sessionStorage.getItem('token');
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`);
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

        const urlencoded = new URLSearchParams();
        urlencoded.append('title', taskFormData.title);
        urlencoded.append('description', taskFormData.description);
        urlencoded.append('completed', taskFormData.completed ? taskFormData.completed + '' : 'false');

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
        };

        await fetch('https://young-earth-00064.herokuapp.com/api/user/todos/' + taskFormData.id, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === 'success') {
                    setAlert(result.message);
                    getTasks();
                    setReadyToUpdate(false);
                }
            })
            .catch((error) => console.log('error', error));
    };

    const deleteTask = async (id: number) => {
        const token = sessionStorage.getItem('token');
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        fetch('https://young-earth-00064.herokuapp.com/api/user/todos/' + id, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === 'success') {
                    setAlert(result.message);
                    getTasks();
                }
            });
    };

    const handleSubmitedForm = (operation: string, task: TaskItemType) => {
        setTaskFormData(task);
        if (operation === 'add') {
            addTask();
        }
        if (operation === 'update') {
            setReadyToUpdate(true);
        }
    };

    const handleShowTaskForm = () => {
        setShowTaskItemForm(!showTaskItemForm);
    };

    const handleAddTaskItem = () => {
        setFormTitle('Add new task');
        setTaskFormData({ id: 0, title: '', description: '' });
        handleShowTaskForm();
    };

    const handleTaskOperation = (operation: string, task: TaskItemType) => {
        if (operation === 'complete') {
            const confirm =
                'Are you sure want to set this task as ' + (!task.completed ? 'completed?' : 'uncompleted?');
            if (!window.confirm(confirm)) {
                return false;
            }
            task.completed = !task.completed;
            handleSubmitedForm('update', task);
        }
        if (operation === 'edit') {
            setFormTitle('Edit task: ' + task.title);
            setTaskFormData(task);
            handleShowTaskForm();
        }
        if (operation === 'delete') {
            const confirm = 'Are you sure want to delete this task?';
            if (!window.confirm(confirm)) {
                return false;
            }
            deleteTask(task.id);
        }
    };

    useEffect(() => {
        if (readyToUpdate) {
            updateTask();
        }
        getTasks();
    }, [readyToUpdate, taskFormData]);

    return (
        <Container className="home my-5">
            <Container className="mb-2 d-flex justify-content-end">
                <Button variant="primary" onClick={handleAddTaskItem}>
                    Add task
                </Button>
            </Container>
            <TaskList tasks={tasks} handleTaskOperation={handleTaskOperation} />
            <TaskItemForm
                show={showTaskItemForm}
                formTitle={formTitle}
                formData={taskFormData}
                handleFormShow={handleShowTaskForm}
                formSubmit={handleSubmitedForm}
            />
        </Container>
    );
};

export default Home;
