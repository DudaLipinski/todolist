import { Todo } from '../models/todo';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { useState } from 'react';

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

function SingleTodo({ todo, todos, setTodos }: Props) {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );

    setEdit(false);
  };
  console.log('--- todo.isDone ---'); // [XXX] REMOVE BEFORE COMMITING
  console.log(todo.isDone); // [XXX] REMOVE BEFORE COMMITING

  return (
    <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <div className="todos__single--wrapper">
          <input
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
            className="todos__single--text"
          />
        </div>
      ) : (
        <div>
          <span style={todo.isDone ? { textDecoration: 'line-through' } : {}}>
            {todo.todo}
          </span>
        </div>
      )}
      <div>
        <span className="icon">
          <FiEdit2
            onClick={() => {
              if (!edit && !todo.isDone) {
                setEdit(!edit);
              }
            }}
          />
        </span>
        <span className="icon">
          <AiOutlineDelete onClick={() => handleDelete(todo.id)} />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
}

export default SingleTodo;
