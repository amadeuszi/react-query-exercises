import { State, useFetchTodos } from "./useFetchTodos";
import { useState } from "react";

export const TodoList = () => {
  const [state, setState] = useState<State>(State.ALL)
  const {
    todos,
    isLoading,
    isFetching,
  } = useFetchTodos(state)

  return (
    <div>
      <h1>Todo List</h1>
      {isLoading && <p>Loading...</p>}
      {isFetching && <p>Fetching...</p>}
      <div>
        Filter by state:
      </div>
      <button onClick={() => setState(State.ALL)}>All</button>
      <button onClick={() => setState(State.OPEN)}>Open</button>
      <button onClick={() => setState(State.DONE)}>Done</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.state} - {todo.id} - {todo.description}</li>
        ))}
      </ul>
    </div>
  );
}