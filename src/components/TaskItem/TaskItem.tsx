import React from 'react';
import { ListGroup, Col, Row, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export interface TaskItemType {
    id: number;
    title: string;
    description: string;
    completed?: boolean | undefined;
    created_at?: Date | undefined;
    updated_at?: Date | undefined;
    user_id?: number | undefined;
    active?: boolean | undefined;
}
interface TaskItemProps {
    task: TaskItemType;
    handleTaskOperation: (operation: string, task: TaskItemType) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, handleTaskOperation }) => {
    return (
        <ListGroup.Item id={`task-${task.id}`} className={`${task.completed ? 'text-decoration-line-through' : ''}`}>
            <Row>
                <Col sm={3} className={`fw-bold ${task.completed ? 'opacity-50' : ''}`}>
                    {task.title}
                </Col>
                <Col sm={7} className={`${task.completed ? 'opacity-50' : ''}`}>
                    {task.description}
                </Col>
                <Col sm={2} className="text-center">
                    <ButtonGroup aria-label="Actions" className="flex-wrap">
                        <Button
                            variant="transparent"
                            title="Mark task as completed"
                            onClick={() => handleTaskOperation('complete', task)}
                        >
                            <FontAwesomeIcon
                                icon={faCheck}
                                className={`${task.completed ? 'text-danger' : 'text-success'}`}
                            />
                        </Button>
                        <Button
                            variant="transparent"
                            title="Edit task"
                            className={`${task.completed ? 'disabled opacity-0' : ''}`}
                            onClick={() => handleTaskOperation('edit', task)}
                        >
                            <FontAwesomeIcon icon={faPencilAlt} className="text-info" />
                        </Button>
                        <Button
                            variant="transparent"
                            title="Delete task"
                            onClick={() => handleTaskOperation('delete', task)}
                        >
                            <FontAwesomeIcon icon={faTrashAlt} className="text-danger" />
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </ListGroup.Item>
    );
};

export default TaskItem;
