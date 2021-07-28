import { useState } from "react";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editInput, setEditInput] = useState("");
  const [editTodo, setEditTodo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodos = {
      id: new Date().getTime(),
      text: input
    };
    setTodos([...todos].concat(newTodos));
    setInput("");
  };

  function handleDelete(id) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function saveEdit(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editInput;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditInput("");
    setEditTodo(null);
  }

  return (
    <div className="App">
      <h1>todo</h1>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button>add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editTodo === todo.id ? (
              <span>
                <input
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
              </span>
            ) : (
              <div>{todo.text}</div>
            )}

            <span>
              <button onClick={() => handleDelete(todo.id)}>delete</button>
              <button onClick={() => setEditTodo(todo.id)}>Edit</button>
              {editTodo ? (
                <button onClick={() => saveEdit(todo.id)}>save</button>
              ) : (
                ""
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
