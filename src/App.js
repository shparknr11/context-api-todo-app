import styled from "@emotion/styled";
import Button from "components/Button";
import DataView from "components/DataView";
import InputContainer from "components/InputContainer";
import ShowInputButton from "components/ShowInputButton";
import TextInput from "components/TextInput";
import TodoInput from "components/TodoInput";
import { TodoListContextProvider } from "contexts/TodoListContext";
import { useState } from "react";

const WrapStyle = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #eee;
`;

function App() {
  return (
    <WrapStyle>
      <TodoListContextProvider>
        <DataView />
        <InputContainer />
      </TodoListContextProvider>
    </WrapStyle>
  );
}

export default App;
