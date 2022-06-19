import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ThemeProvider } from '@lapidist/components';
import Todo, { TodoProps } from './Todo';

export default {
    title: 'Components/Todo',
    component: Todo,
    decorators: [
        (getStory: () => JSX.Element) => (
            <ThemeProvider>{getStory()}</ThemeProvider>
        )
    ]
};

const Template: Story<TodoProps> = (args: TodoProps) => <Todo {...args} />;

export const DefaultTodo = Template.bind({});

DefaultTodo.args = {
    id: '266fb8ec-ecf9-4f8b-9d49-142a9969f57e',
    name: 'Todo Name',
    toggleComplete: action('toggleComplete'),
    onDelete: action('onDelete'),
    onEdit: action('onEdit'),
    completed: false
};
