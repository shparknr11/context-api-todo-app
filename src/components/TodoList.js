import styled from "@emotion/styled";
import TodoItem from "./TodoItem";
import { useContext } from "react";
import { TodoListContext } from "contexts/TodoListContext";

const TodoListWrapStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

const TodoList = () => {
  const { todoList, onDelete } = useContext(TodoListContext);

  return (
    <TodoListWrapStyle>
      {todoList.map(todo => (
        <TodoItem
          key={todo} // 지금은 todo로 key값을 설정했지만 key값은 유일한 값이어야 한다.
          label={todo}
          onDelete={() => onDelete(todo)}
        />
      ))}
    </TodoListWrapStyle>
  );
};

export default TodoList;
