import React, { useState } from 'react';

// Define the shape of a todo item using TypeScript interfaces
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  // State to hold the array of todos
  const [todos, setTodos] = useState<Todo[]>([]);

  // Function to add new todo to the state
  const addTodo = (todoText: string) => {
    const newTodo: Todo = { id: Date.now(), text: todoText, completed: false };
    setTodos([...todos, newTodo]);
  };

  // Function to delete a todo from the state
  const deleteTodo = (todoId: number) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  // Function to toggle the completed status of a todo item
  const toggleTodoCompletion = (todoId: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // The component's UI
  return (
    <div>
      {/* Render your todos here */}
      {todos.map((todo) => (
        <div key={todo.id}>
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
          <button onClick={() => toggleTodoCompletion(todo.id)}>Toggle</button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
      {/* Here, you'll need a way for the user to input a todo and add it using the addTodo function */}
    </div>
  );
};

export default TodoList;
