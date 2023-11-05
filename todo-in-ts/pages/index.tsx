import React, { useState } from 'react';
import { TodoList } from '../components/TodoList';
import { Todo } from '../types/types'; // Assuming you have defined this type

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState(''); 


  const addTodo = () => {
    if (!inputValue.trim()) return;
    const newTodo: Todo = {
      id: Math.random(),
      text: inputValue,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // ... other handlers like addTodo, editTodo, etc.

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
      <TodoList todos={todos} deleteTodo={deleteTodo} />
      {/* You will also need to render components or buttons to add/edit todos */}
    </div>
  );
};

export default Home;
