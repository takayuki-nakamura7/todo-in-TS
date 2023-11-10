import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../pages/index';

const setItemMock = jest.fn();
const getItemMock = jest.fn();
// A variable prefixed with `mock` to comply with Jest's variable naming conventions
let mockIdCounter = 0;

jest.mock('nanoid', () => ({
  nanoid: () => `unique-id-${mockIdCounter++}`,
}));



beforeAll(() => {
  global.localStorage = {
    getItem: getItemMock,
    setItem: setItemMock,
    clear: jest.fn(),
    length: 0,
    key: jest.fn(),
    removeItem: jest.fn()
  } as unknown as Storage;
});
beforeEach(() => {
  // Reset local storage
  localStorage.clear();
  // Reset any other global state
});


describe('Home', () => {
  it('adds a new todo when add button is clicked', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<Home />);
    
    const input = getByPlaceholderText('Add a new todo...');
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(getByText('Add Todo'));

    expect(queryByText('New Todo')).toBeInTheDocument();
  });

  it('deletes a todo when delete button is clicked', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<Home />);
    
    // Add a todo
    fireEvent.change(getByPlaceholderText('Add a new todo...'), { target: { value: 'Todo to Delete' } });
    fireEvent.click(getByText('Add Todo'));
  
    // Delete the todo
    fireEvent.click(getByText('Delete'));
  
    // Check the todo is deleted
    await waitFor(() => {
      expect(queryByText('Todo to Delete')).not.toBeInTheDocument();
    });
  });

  it('edits a todo correctly', async () => {
    const { getByPlaceholderText, getByText, getByDisplayValue, queryByText } = render(<Home />);
    
    // Add a todo
    fireEvent.change(getByPlaceholderText('Add a new todo...'), { target: { value: 'Todo to Edit' } });
    fireEvent.click(getByText('Add Todo'));
  
    // Trigger edit mode (assumes there's a way to do this, e.g., an 'Edit' button)
    fireEvent.click(getByText('Edit'));
  
    // Change the todo text and submit
    fireEvent.change(getByDisplayValue('Todo to Edit'), { target: { value: 'Edited Todo' } });
    fireEvent.click(getByText('Save'));
  
    // Check the todo is updated
    await waitFor(() => {
      expect(queryByText('Edited Todo')).toBeInTheDocument();
      expect(queryByText('Todo to Edit')).not.toBeInTheDocument();
    });
  });

  it('toggles a todo completion status', async () => {
    const { getByPlaceholderText, getByText, getByRole } = render(<Home />);
    
    // Add a todo
    fireEvent.change(getByPlaceholderText('Add a new todo...'), { target: { value: 'Todo to Toggle' } });
    fireEvent.click(getByText('Add Todo'));
  
    // Toggle the completion status
    const checkbox = getByRole('checkbox', { name: 'Mark Todo to Toggle as completed' });
    fireEvent.click(checkbox);
    
    // Check the todo completion status is toggled
    // This assumes that completed todos have a 'line-through' style
    const completedTodo = getByText('Todo to Toggle');
    expect(completedTodo).toHaveStyle('text-decoration: line-through');
  });
  
  it('filters todos correctly', async () => {
    const { getByPlaceholderText, getByText, queryByText, getAllByRole } = render(<Home />);
    
    // Add not-completed todo
    fireEvent.change(getByPlaceholderText('Add a new todo...'), { target: { value: 'Active Todo' } });
    fireEvent.click(getByText('Add Todo'));
  
    // Add completed todo
    fireEvent.change(getByPlaceholderText('Add a new todo...'), { target: { value: 'Completed Todo' } });
    fireEvent.click(getByText('Add Todo'));
    
    // Assuming the checkbox to mark a todo as complete is right before the todo text
    const checkboxes = getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]); // Mark the second todo as completed
  
    // Apply 'All' filter
    fireEvent.click(getByText('All'));
    expect(queryByText('Active Todo')).toBeInTheDocument();
    expect(queryByText('Completed Todo')).toBeInTheDocument();
  
    // Apply 'Completed' filter
    fireEvent.click(getByText('Completed'));
    expect(queryByText('Active Todo')).not.toBeInTheDocument();
    expect(queryByText('Completed Todo')).toBeInTheDocument();
  
    // Apply 'Active' filter
    fireEvent.click(getByText('Active'));
    expect(queryByText('Active Todo')).toBeInTheDocument();
    expect(queryByText('Completed Todo')).not.toBeInTheDocument();
  });
});
