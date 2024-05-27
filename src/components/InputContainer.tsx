import { useState } from "react";
import ShowInputButton from "./ShowInputButton";
import TodoInput from "./TodoInput";

const InputContainer = () => {
  const [showTodoInput, setShowTodoInput] = useState(false);

  const onClose = () => {
    setShowTodoInput(false);
  };

  return (
    <>
      {showTodoInput && <TodoInput onClose={onClose} />}
      <ShowInputButton
        show={showTodoInput}
        onClick={() => setShowTodoInput(!showTodoInput)}
      />
    </>
  );
};

export default InputContainer;
