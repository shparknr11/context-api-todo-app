import styled from "@emotion/styled";
import Title from "./Title";
import TodoList from "./TodoList";

const DataViewWrapStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 32px;
  border-radius: 8px;
`;

const DataView = () => {
  return (
    <DataViewWrapStyle>
      <Title label="할 일 목록" />
      <TodoList />
    </DataViewWrapStyle>
  );
};

export default DataView;
