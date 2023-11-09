import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
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

describe('Home', () => {
  it('adds a new todo when add button is clicked', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<Home />);
    
    const input = getByPlaceholderText('Add a new todo...');
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(getByText('Add Todo'));

    expect(queryByText('New Todo')).toBeInTheDocument();
  });

  it('deletes a todo when delete button is clicked', async () => {
    const { getByPlaceholderText, getByText, queryByText, getAllByText } = render(<Home />);
    
    // Add first todo
    fireEvent.change(getByPlaceholderText('Add a new todo...'), { target: { value: 'First Todo' } });
    fireEvent.click(getByText('Add Todo'));
  
    // Add second todo
    fireEvent.change(getByPlaceholderText('Add a new todo...'), { target: { value: 'Second Todo' } });
    fireEvent.click(getByText('Add Todo'));
  
    // Check both todos are added
    expect(getByText('First Todo')).toBeInTheDocument();
    expect(getByText('Second Todo')).toBeInTheDocument();
  
    // Get all delete buttons, assuming the last one is for the 'Second Todo'
    const deleteButtons = getAllByText('Delete');
    fireEvent.click(deleteButtons[deleteButtons.length - 1]);
  
    await waitFor(() => {
      // Now we expect 'Second Todo' to be gone, 'First Todo' should still exist
      expect(queryByText('Second Todo')).not.toBeInTheDocument();
      expect(queryByText('First Todo')).toBeInTheDocument();
    });
  });
  
});
