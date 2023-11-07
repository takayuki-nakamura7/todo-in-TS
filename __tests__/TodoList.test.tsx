import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoItem } from '../components/TodoItem';


describe('TodoItem', () => {
  const mockTodo = {
    id: '1',
    text: 'Test Todo',
    completed: false,
  };

  const mockToggleComplete = jest.fn();
  const mockDeleteTodo = jest.fn();
  const mockEditTodo = jest.fn();

  it('renders the todo item', () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
      />
    );

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  it('calls toggleComplete when checkbox is clicked', () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
      />
    );

    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockToggleComplete).toHaveBeenCalledWith(mockTodo.id);
  });

  it('calls deleteTodo when delete button is clicked', () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
      />
    );

    fireEvent.click(screen.getByText('Delete'));
    expect(mockDeleteTodo).toHaveBeenCalledWith(mockTodo.id);
  });

  it('shows input field when edit mode is activated', () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
      />
    );

    fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByDisplayValue('Test Todo')).toBeInTheDocument();
  });

  // Add more tests as needed for editing and saving logic, etc.
});
