import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../../reactQuery/QueryKeys";

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
  const queryClient = useQueryClient();

  const todosQuery = useQuery<Todos, unknown, Todos, [QueryKeys, State]>({
    queryKey: [QueryKeys.GET_TODOS, state],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/v1/todos?state=${state}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json() as Promise<Todos>
    },
    initialData: () => {
      const previousData = queryClient.getQueriesData<Todos>({ queryKey: [QueryKeys.GET_TODOS] });
      if (previousData.length === 0) {
        return undefined
      }
      const [, lastDisplayedTodos] = previousData[previousData.length - 1];
      return lastDisplayedTodos;
    }
  });

  return {
    ...todosQuery,
    todos: todosQuery.data ?? []
  };
}