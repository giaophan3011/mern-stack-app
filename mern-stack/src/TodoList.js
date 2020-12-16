import React, { useState } from "react";

const Todolist = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  React.useEffect(() => {
    fetch("/api/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data.map((d) => d.action)));
  }, []);

  const addTodo = (event) => {
    event.preventDefault();
    fetch("/api/todos", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ action: todo }), // body data type must match "Content-Type" header
    })
      .then((response) => response.json())
      .then((data) => setTodos(todos.concat([data.action])));
  };

  return (
    <div>
      <form onSubmit={addTodo}>
        <input
          type="text"
          onChange={(event) => setTodo(event.target.value)}
          placeholder="Action"
          value={todo}
        />
        <input type="submit" value="Add" />
      </form>
      <table style={{ textAlign: "center", alignItems: "center", display: "inline-table" }}>
        <tbody alignContent="center" style={{ minWidth: "200px" }}>
          {todos.map((t, index) => (
            <tr
              key={index}
              style={{ alignContent: "center", minInlineSize: "-webkit-fill-available" }}
            >
              <td>{t}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Todolist;
