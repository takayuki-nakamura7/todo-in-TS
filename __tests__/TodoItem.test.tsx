// TodoItem.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders the todo item correctly', () => {
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

  it('triggers completion toggle when checkbox is clicked', async () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);

    await waitFor(() => {
      expect(mockToggleComplete).toHaveBeenCalledWith(mockTodo.id);
    });
  });

  it('triggers deleteTodo when delete button is clicked', async () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
      />
    );
  
    userEvent.click(screen.getByText('Delete'));
  
    await waitFor(() => {
      expect(mockDeleteTodo).toHaveBeenCalledWith(mockTodo.id);
    });
  });
  
});
