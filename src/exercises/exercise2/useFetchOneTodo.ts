import { State, Todo, Todos, useFetchTodos } from "../exercise1/useFetchTodos";
import { useCallback, useState } from "react";


const filterOneTodoById = (id: number) => (todos: Todos): Todo | undefined => {
  return todos.find((todo) => todo.id === id);
}

interface ReturnType {
  todo: Todo | undefined;
  isLoading: boolean;
  isFetching: boolean;
  description: string;
  setDescription: (value: string) => void;
}

export const useFetchOneTodo = (id: number): ReturnType => {
  const [clientDescription, setClientDescription] = useState<string | undefined>(undefined);

  const { todos: todo, isFetching, isLoading } = useFetchTodos({
    state: State.ALL,
    select: useCallback(filterOneTodoById(id), [id]),
    enabled: clientDescription === undefined,
  });

  return {
    todo,
    isLoading,
    isFetching,
    description: clientDescription ?? todo?.description ?? "",
    setDescription: setClientDescription,
  };
}
