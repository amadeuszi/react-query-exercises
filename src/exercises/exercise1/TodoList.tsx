import { State, Todos, useFetchTodos } from "./useFetchTodos";
import { useState } from "react";
import { EditTodo } from "../exercise2/EditTodo";

const identityFunction = <T,>(value: T): T => value

export const TodoList = () => {
  const [state, setState] = useState<State>(State.ALL)
  const {
    todos,
    isLoading,
    isFetching,
  } = useFetchTodos({ state, select: identityFunction<Todos> })

  return (
    <div>
      <h1>Todo List</h1>
      <div style={{ height: 100 }}>
        {isLoading && <p>Loading...</p>}
        {isFetching && <p>Fetching...</p>}
      </div>
      <div>
        Filter by state:
      </div>
      <button onClick={() => setState(State.ALL)}>All</button>
      <button onClick={() => setState(State.OPEN)}>Open</button>
      <button onClick={() => setState(State.DONE)}>Done</button>
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>{todo.id} - {todo.state} - {todo.description}</li>
        ))}
      </ul>
      <EditTodo />
    </div>
  );
}