import { Todo } from '../types/types';

interface TodoItemProps {
  todo: Todo;
  deleteTodo: (id: number) => void;
  // add more props as needed for edit and complete actions
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, deleteTodo }) => {
  return (
    <div>
      <span>{todo.text}</span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      {/* Add buttons or actions for editing and toggling the completion status */}
    </div>
  );
};
