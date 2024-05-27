import styled from "@emotion/styled";
import Button from "./Button";

const TodoItemWrapStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const LabelStyle = styled.div`
  /* flex-grow: 1; 다른 flex 아이템들과 동일한 비율로 나누어 가짐
  flex-shrink: 1; 아이템이 공간이 부족할 때 줄어들 수 있는 정도 비슷한 비율로 줄어든다.
  flex-basis: 0; 아이템의 시작 크기 설정 원래크기 무시 grow, shrink에 따라 결정
*/
  flex: 1;
  font-size: 1.2rem;
  margin-right: 16px;
`;

interface Props {
  label: string;
  onDelete?: () => void;
}

const TodoItem = ({ label, onDelete }: Props) => {
  return (
    <TodoItemWrapStyle>
      <LabelStyle>{label}</LabelStyle>
      <Button label="삭제" onClick={onDelete} />
    </TodoItemWrapStyle>
  );
};

export default TodoItem;
