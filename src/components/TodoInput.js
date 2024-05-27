import styled from "@emotion/styled";
import { useContext, useState } from "react";
import Button from "./Button";
import TextInput from "./TextInput";
import Title from "./Title";
import { TodoListContext } from "contexts/TodoListContext";

const WrapStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BackgroundStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.75);
`;
const ContetsStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: #fff;
  padding: 32px;
  border-radius: 8px;
  z-index: 1;
`;
const InputInnerStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const TodoInput = ({ onClose }) => {
  const { onAdd } = useContext(TodoListContext);
  const [todo, setTodo] = useState("");
  const [mesaage, setMessage] = useState("");

  const onAddTodo = () => {
    if (todo === "") {
      return setMessage("할 일을 작성해주세요");
    }

    onAdd(todo);
    setTodo("");
    onClose();
  };

  return (
    <WrapStyle>
      <BackgroundStyle />
      <ContetsStyle>
        <Title label="할 일 추가" />
        <InputInnerStyle>
          <TextInput value={todo} onChange={setTodo} />
          <Button label="추가" color="#304ffe" onClick={onAddTodo} />
        </InputInnerStyle>
        <div style={{ color: "red" }}>{mesaage}</div>
      </ContetsStyle>
    </WrapStyle>
  );
};

export default TodoInput;
