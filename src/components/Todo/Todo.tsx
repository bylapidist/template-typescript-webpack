import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Box, Button, ButtonGroup, Panel } from '@lapidist/components';

export type TodoProps = {
    id: string;
    name: string;
    toggleComplete: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newName: string) => void;
    completed?: boolean;
};

const Todo = ({
    id,
    name,
    toggleComplete,
    onDelete,
    onEdit,
    completed
}: TodoProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewName(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!newName.trim()) {
            return;
        }

        onEdit(id, newName);
        setNewName('');
        setIsEditing(false);
    };

    const EditTodo = () => (
        <form onSubmit={handleSubmit}>
            <Box>
                <label htmlFor={id}>New name for {name}</label>
                <input
                    id={id}
                    data-testid="EditInput"
                    type="text"
                    value={newName || name}
                    onChange={handleChange}
                />
            </Box>
            <ButtonGroup>
                <Button
                    type="button"
                    kind="secondary"
                    variant="small"
                    ghost
                    onClick={() => setIsEditing(false)}
                >
                    Cancel
                </Button>
                <Button
                    data-testid="SaveButton"
                    type="submit"
                    kind="primary"
                    variant="small"
                >
                    Save
                </Button>
            </ButtonGroup>
        </form>
    );

    const ViewTodo = () => (
        <Box>
            <Box>
                <input
                    id={id}
                    type="checkbox"
                    defaultChecked={completed}
                    onChange={() => toggleComplete(id)}
                />
                <label htmlFor={id}>{name}</label>
            </Box>
            <ButtonGroup>
                <Button
                    data-testid="EditButton"
                    type="button"
                    kind="secondary"
                    variant="small"
                    ghost
                    onClick={() => setIsEditing(true)}
                >
                    Edit
                </Button>
                <Button
                    data-testid="DeleteButton"
                    type="button"
                    kind="danger"
                    variant="small"
                    onClick={() => onDelete(id)}
                >
                    Delete
                </Button>
            </ButtonGroup>
        </Box>
    );

    return (
        <Panel kind="grey" data-testid="Todo">
            {isEditing ? <EditTodo /> : <ViewTodo />}
        </Panel>
    );
};

export default Todo;
