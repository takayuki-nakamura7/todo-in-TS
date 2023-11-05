import { render, screen } from '@testing-library/react';
import TodoItem from '../components/TodoItem';
import userEvent from '@testing-library/user-event';

describe('TodoItem', () => {
  it('renders the todo item correctly', () => {
    render(<TodoItem todo={{ id: '1', text: 'Test Todo', completed: false }} />);

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  // Add more tests to interact with the todo item...
});
