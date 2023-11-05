import React from 'react';
import { Todo } from '../types/types';

interface TodoItemProps {
  todo: Todo;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newText: string) => void;
  toggleComplete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  deleteTodo,
  editTodo,
  toggleComplete,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editText, setEditText] = React.useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  }

  const handleSave = () => {
    editTodo(todo.id, editText);
    setIsEditing(false);
  }

  const handleToggle = () => {
    toggleComplete(todo.id);
  }

  return (
    <div>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <span
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            onClick={handleToggle}
          >
            {todo.text}
          </span>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </>
      )}
    </div>
  );
};
