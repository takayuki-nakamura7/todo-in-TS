// TodoList.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoList } from '../components/TodoList';
import { Todo } from '../types/types';

describe('TodoList', () => {
  const mockTodos: Todo[] = [
    { id: '1', text: 'First Todo', completed: false },
    { id: '2', text: 'Second Todo', completed: true },
  ];

  const mockDeleteTodo = jest.fn();
  const mockEditTodo = jest.fn();
  const mockToggleComplete = jest.fn();

  it('renders a list of todo items', () => {
    render(
      <TodoList
        todos={mockTodos}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        toggleComplete={mockToggleComplete}
      />
    );

    expect(screen.getByText('First Todo')).toBeInTheDocument();
    expect(screen.getByText('Second Todo')).toBeInTheDocument();
  });
});
