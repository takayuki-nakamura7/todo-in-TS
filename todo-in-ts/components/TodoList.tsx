import { TodoItem } from './TodoItem';
import { Todo } from '../types/types';

interface TodoListProps {
  todos: Todo[];
  deleteTodo: (id: number) => void;
  // pass other handlers like editTodo as props
}

export const TodoList: React.FC<TodoListProps> = ({ todos, deleteTodo }) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />
      ))}
    </div>
  );
};
