import React from 'react';
import { ListGroup, Col, Row } from 'react-bootstrap';
import TaskItem, { TaskItemType } from '../TaskItem/TaskItem';

interface TaskListProps {
    tasks: TaskItemType[];
    handleTaskOperation: (operation: string, task: TaskItemType) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, handleTaskOperation }) => {
    return (
        <ListGroup>
            <ListGroup.Item className="bg-dark text-light">
                <Row>
                    <Col sm={3}>Title</Col>
                    <Col sm={7}>Description</Col>
                    <Col sm={2}>Actions</Col>
                </Row>
            </ListGroup.Item>
            {tasks.length ? (
                <>
                    {tasks.map((task) => {
                        return <TaskItem key={task.id} task={task} handleTaskOperation={handleTaskOperation} />;
                    })}
                </>
            ) : (
                <ListGroup.Item>
                    <Row>
                        <Col sm={12} className="text-center">
                            You have no tasks
                        </Col>
                    </Row>
                </ListGroup.Item>
            )}
        </ListGroup>
    );
};

export default TaskList;
