import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../pages/index';

const setItemMock = jest.fn();
const getItemMock = jest.fn();
jest.mock('nanoid', () => ({ nanoid: () => 'mocked-id' }));

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
    
    // Add a todo
    const input = getByPlaceholderText('Add a new todo...');
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(getByText('Add Todo'));

    // Check that the todo is added
    expect(queryByText('New Todo')).toBeInTheDocument();
  });

  // ... other tests for edit, toggle, filter, etc.
});
