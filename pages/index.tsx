import React, { useState, useEffect } from 'react';
import { TodoList } from '../components/TodoList';
import { Todo } from '../types/types'; 
import { nanoid } from 'nanoid';

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // On component mount, check if there's anything in localStorage
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('todos') : null;
    const initialTodos = saved ? JSON.parse(saved) : [];
    setTodos(initialTodos);
  }, []);

  // Anytime todos change, update localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const [inputValue, setInputValue] = useState(''); 

  const addTodo = () => {
    if (!inputValue.trim()) return;
    const newTodo: Todo = {
      id: nanoid(),
      text: inputValue,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, text: newText };
      }
      return todo;
    }));
  };

  const toggleComplete = (id: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    }));
  }


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
      {/* You will also need to render components or buttons to add/edit todos */}
    </div>
  );
};

export default Home;
