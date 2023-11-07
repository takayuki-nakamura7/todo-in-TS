import React, { useState, useEffect, useCallback } from 'react';
import { TodoList } from '../components/TodoList';
import { Todo } from '../types/types'; 
import { nanoid } from 'nanoid';

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState(''); 

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
        todos={todos}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        toggleComplete={toggleComplete}
      />
      {/* Any additional UI for adding/editing todos can be rendered here */}
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
