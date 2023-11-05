import React from 'react';
import TodoList from '../components/TodoList';

const Home: React.FC = () => {
  return (
    <div>
      <h1>My ToDo App</h1>
      <TodoList />
    </div>
  );
};

export default Home;
