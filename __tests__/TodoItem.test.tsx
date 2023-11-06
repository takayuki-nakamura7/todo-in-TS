import { render, screen, waitFor } from '@testing-library/react';
import { TodoItem } from '../components/TodoItem';
import userEvent from '@testing-library/user-event';

describe('TodoItem', () => {
  const mockDeleteTodo = jest.fn();
  const mockEditTodo = jest.fn();
  const mockToggleComplete = jest.fn();

  it('renders the todo item correctly', () => {
    render(
      <TodoItem
        todo={{ id: '1', text: 'Test Todo', completed: false }}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        toggleComplete={mockToggleComplete}
      />
    );

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  it('triggers completion toggle when checkbox is clicked', async () => {
    render(
      <TodoItem
        todo={{ id: '1', text: 'Test Todo', completed: false }}
        deleteTodo={mockDeleteTodo}
        editTodo={mockEditTodo}
        toggleComplete={mockToggleComplete}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);

    // Wait for the mockToggleComplete function to be called after the click event
    await waitFor(() => expect(mockToggleComplete).toHaveBeenCalledWith('1'));
  });

  // Add more tests here for delete and edit actions
});
