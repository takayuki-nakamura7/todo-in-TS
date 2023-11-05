import { TodoItem } from './TodoItem';
import { Todo } from '../types/types';

interface TodoListProps {
  todos: Todo[];
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newText: string) => void;
  toggleComplete: (id: nstring) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          toggleComplete={toggleComplete}   
        />
      ))}
    </div>
  );
};
