import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Todo from './Todo';
import { ThemeProvider } from '@lapidist/components';

const defaultProps = {
    id: '266fb8ec-ecf9-4f8b-9d49-142a9969f57e',
    name: 'Todo Name',
    toggleComplete: jest.fn(),
    onDelete: jest.fn(),
    onEdit: jest.fn(),
    completed: false
};

describe('<Todo/>', () => {
    const setup = (props = defaultProps) =>
        render(
            <ThemeProvider>
                <Todo {...props} />
            </ThemeProvider>
        );

    beforeAll(() => jest.clearAllMocks());

    test('renders', () => {
        const { container } = setup();
        expect(container).toBeTruthy();
    });

    test('renders todo', () => {
        const { getByText } = setup();
        expect(getByText('Todo Name')).toBeTruthy();
    });

    test('it calls toggleComplete when checkbox clicked', () => {
        const { getByRole } = setup();
        fireEvent.click(getByRole('checkbox'));
        expect(defaultProps.toggleComplete).toHaveBeenCalledWith(
            defaultProps.id
        );
    });

    test('it calls onDelete when delete button clicked', () => {
        const { getByTestId } = setup();
        fireEvent.click(getByTestId('DeleteButton'));
        expect(defaultProps.onDelete).toHaveBeenCalledWith(defaultProps.id);
    });

    test('it calls onEdit when edit form submitted', () => {
        const { getByTestId } = setup();
        fireEvent.click(getByTestId('EditButton'));
        fireEvent.change(getByTestId('EditInput'), {
            target: { value: 'new name' }
        });
        fireEvent.click(getByTestId('SaveButton'));
        expect(defaultProps.onEdit).toHaveBeenCalledWith(
            defaultProps.id,
            'new name'
        );
    });
});
