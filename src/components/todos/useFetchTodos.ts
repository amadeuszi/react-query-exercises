import { useQuery } from "@tanstack/react-query";

export enum State {
  ALL = 'all',
  OPEN = 'open',
  DONE = 'done'
}

type Todo = {
  id: number
  state: State
  description: string
}

type Todos = ReadonlyArray<Todo>

export const useFetchTodos = (state: State) => {
  const todosQuery = useQuery({
    queryKey: ['todos', state],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/v1/todos?state=${state}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json() as Promise<Todos>
    }
  });

  return {
    ...todosQuery,
    todos: todosQuery.data ?? []
  };
}