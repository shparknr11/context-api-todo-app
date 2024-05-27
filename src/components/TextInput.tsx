import styled from "@emotion/styled";

interface Props {
  value: string;
  onChange: (text: string) => void;
}

const InputStyle = styled.input`
  font-size: 1.2rem;
  padding: 8px;
`;

const TextInput = ({ value, onChange }: Props) => {
  return (
    <InputStyle
      type="text"
      placeholder="할 일을 작성해보세요"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
};

export default TextInput;
