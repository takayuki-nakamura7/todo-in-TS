import React, { useState, useEffect, useCallback } from 'react';
import { TodoList } from '../components/TodoList';
import { Todo } from '../types/types'; 
import { nanoid } from 'nanoid';

type FilterType = 'all' | 'completed' | 'active';

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState(''); 
  const [filter, setFilter] = useState<FilterType>('all');

  // Using useCallback to ensure these functions are memoized and not re-created on each render
  const addTodo = useCallback(() => {
    if (!inputValue.trim()) return;
    const newTodo: Todo = {
      id: nanoid(),
      text: inputValue,
      completed: false,
    };
    setTodos(todos => [...todos, newTodo]);
    setInputValue('');
  }, [inputValue]);

  const deleteTodo = useCallback((id: string) => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  }, []);

  const editTodo = useCallback((id: string, newText: string) => {
    setTodos(todos => todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo));
  }, []);

  const toggleComplete = useCallback((id: string) => {
    setTodos(todos => todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  // Moved the localStorage side effects into a custom hook for separation of concerns
  useLocalStorageTodos(todos, setTodos);

  return (
    <div>
      <h1>My ToDo App</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new todo..."
      />
      <button onClick={addTodo}>Add Todo</button>
      <TodoList
        todos={filteredTodos}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        toggleComplete={toggleComplete}
      />
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('active')}>Active</button>
      </div>
    </div>
  );
};

export default Home;

// Custom hook to handle localStorage
function useLocalStorageTodos(todos: Todo[], setTodos: React.Dispatch<React.SetStateAction<Todo[]>>) {
  useEffect(() => {
    const saved = localStorage.getItem('todos');
    const initialTodos = saved ? JSON.parse(saved) : [];
    setTodos(initialTodos);
  }, [setTodos]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
}
