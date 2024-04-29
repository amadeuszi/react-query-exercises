import { useFetchOneTodo } from "./useFetchOneTodo";
import { ChangeEventHandler } from "react";

export const EditTodo = () => {
  const { description, setDescription, isFetching, isLoading } = useFetchOneTodo(1);

  const handleDescriptionChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setDescription(event.target.value)
  }

  return (
    <>
      {isFetching && <>is fetching</>}
      {isLoading && <>is loading</>}
      <input style={{ height: 50, width: 300 }} value={description} onChange={handleDescriptionChange} />
    </>
  )
}