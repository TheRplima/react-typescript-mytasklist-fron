import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { TaskItemType } from '../TaskItem/TaskItem';

interface TaskItemFormProps {
    show: boolean;
    formTitle: string;
    formData: TaskItemType;
    handleFormShow: () => void;
    formSubmit: (operation: string, task: TaskItemType) => void;
}

const TaskItemForm: React.FC<TaskItemFormProps> = ({ show, formTitle, formData, handleFormShow, formSubmit }) => {
    const [title, setTitle] = useState(formData.title);
    const [description, setDescription] = useState(formData.description);
    useEffect(() => {
        setTitle(formData.title);
        setDescription(formData.description);
    }, [formData]);

    const onChangeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    const onChangeDescriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.currentTarget.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        formData.title = title;
        formData.description = description;
        const operation = formData.id === 0 ? 'add' : 'update';
        formSubmit(operation, formData);
        handleFormShow();
    };

    return (
        <Modal show={show} onHide={handleFormShow}>
            <Modal.Header closeButton>
                <Modal.Title>{formTitle}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Task title"
                            value={title}
                            autoFocus
                            onChange={onChangeTitleHandler}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Task description"
                            value={description}
                            onChange={onChangeDescriptionHandler}
                        />
                    </Form.Group>
                    <Form.Control type="hidden" id="id" value={formData.id} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleFormShow}>
                        Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default TaskItemForm;
