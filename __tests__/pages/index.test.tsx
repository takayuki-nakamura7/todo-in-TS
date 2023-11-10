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
});
