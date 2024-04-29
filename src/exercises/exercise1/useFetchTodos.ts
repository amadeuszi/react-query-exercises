import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../../reactQuery/QueryKeys";

export enum State {
  ALL = 'all',
  OPEN = 'open',
  DONE = 'done'
}

export type Todo = {
  id: number
  state: State
  description: string
}

export type Todos = ReadonlyArray<Todo>

interface UseFetchTodosParams<TQueryData, TData> {
  state: State,
  select?: (data: TQueryData) => TData;
  enabled?: boolean;
}

export const useFetchTodos = <TData>(params: UseFetchTodosParams<Todos, TData>) => {
  const queryClient = useQueryClient();
  const { state, select, enabled = true } = params;

  const {
    data, isFetching, isLoading,
  } = useQuery<Todos, unknown, TData, [QueryKeys, State]>({
    queryKey: [QueryKeys.GET_TODOS, state],
    queryFn: async (): Promise<Todos> => {
      const response = await fetch(`http://localhost:3000/v1/todos?state=${state}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json() as Promise<Todos>
    },
    initialData: (): Todos | undefined => {
      const previousData = queryClient.getQueriesData<Todos>({ queryKey: [QueryKeys.GET_TODOS] });
      if (previousData.length === 0) {
        return undefined
      }
      const [, lastDisplayedTodos] = previousData[previousData.length - 1];
      return lastDisplayedTodos;
    },
    select,
    enabled,
  });

  return {
    isLoading,
    isFetching,
    todos: data,
  };
}