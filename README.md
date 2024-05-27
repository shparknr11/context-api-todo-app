# 0. 프로젝트 생성

### npx create-react-app ./ --template=typescript

### npm i @emotion/react @emotion/styled

### npm install --save-dev prettier eslint

### .prettierrc.json 파일 생성

```json
{
  "singleQuote": false,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80,
  "arrowParens": "avoid",
  "endOfLine": "auto"
}
```

### npx eslint --init

- .eslintrc.js

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier", // Prettier와 충돌하는 ESLint 규칙을 비활성화
  ],
  parserOptions: {
    ecmaVersion: "latest", // 최신 ECMAScript 기능 사용
    sourceType: "module",
    // project: "**/tsconfig.json", // ES 모듈 사용
    ecmaFeatures: {
      jsx: true, // JSX 파싱 허용
    },
  },
  plugins: [
    "react", // 리액트 규칙 사용
  ],
  rules: {
    "react/react-in-jsx-scope": "off", // React 17부터는 JSX에서 React를 import할 필요가 없음
    "react/prop-types": "off", // TypeScript를 사용하는 경우 prop-types를 사용할 필요가 없음
    "no-unused-vars": "off", // TypeScript에서 처리할 수 있으므로 ESLint에서 비활성화
    "react/jsx-no-target-blank": "off", // 이 규칙은 프로젝트 요구사항에 따라 다를 수 있음
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // TypeScript 파일에만 적용됩니다.
      parser: "@typescript-eslint/parser", // TypeScript 파싱
      plugins: ["@typescript-eslint"], // TypeScript 규칙 사용
      extends: [
        "plugin:@typescript-eslint/recommended", // TypeScript 권장 규칙
      ],
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off", // 변수가 할당되었지만 사용되지 않았다는 TypeScript 경고를 비활성화
        "@typescript-eslint/no-explicit-any": ["off"],
      },
    },
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  settings: {
    react: {
      version: "detect", // React 버전 자동 감지
    },
  },
};
```

### npm install eslint-config-prettier --save-dev

- 오류발생시 vscode 재시작

### .gitignore 파일에 .env 추가

```txt
# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

.env
```

### src 폴더 정리

- App.tsx

```tsx
function App() {
  return <h1>context API 로 todo app 만들어보기</h1>;
}

export default App;
```

- index.css
- index.tsx

```tsx
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(<App />);
```

### src/components 폴더 생성

# 1. State와 Props로 할일 목록 앱 개발 (JSX 버전)

- 실제로는 이렇게까지 복잡하게 컴포넌트를 구성하지 않습니다.
- ContextAPI 실습을 위해 구조를 이렇게 해볼께요

## 1.1 컴포넌트 구조

- App

  - TodoList Data
    - DataView
      - Title
      - TodoList
        - TodoItem
  - Todo Data
    - Input
      - TodoInput
        - TextInput
        - AddButton
      - InputButton

`컴포넌트 관심사 분리 기준`

- 이 구조는 프로젝트마다 달라질 수 있습니다.

- Page Component : 데이터의 상태관리를 할 수 있도록 하자
  - Ui Component : 화면 또는 페이지를 구성하는 UI 로직만 가지도록 하자
- Api Component : API로직을 분리 해보자

### 1.1.0. App.tsx > App.js 이름(파일확장자) 변경

### 1.1.1. Title.js 컴포넌트 생성

- 바벨에러 발생시..
- `npm install @babel/plugin-proposal-private-property-in-object --dev`

- Title.js

```js
import styled from "@emotion/styled";
import React from "react";

const TitleWrapStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LabelStyle = styled.h1`
  margin-top: 0;
`;

const Title = ({ label }) => {
  return (
    <TitleWrapStyle>
      <LabelStyle>{label}</LabelStyle>
    </TitleWrapStyle>
  );
};

export default Title;
```

### 1.1.2. Button.js 컴포넌트 생성

- Button.js

```js
import styled from "@emotion/styled";

const ButtonStyle = styled.button`
  border: 0;
  color: #fff;
  background-color: #ff5722;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 4px;

  &:hover {
    background-color: #ff5722;
    opacity: 0.8;
  }
  &:active {
    box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2);
  }
`;

const Button = ({ label, onClick }) => {
  return <ButtonStyle onClick={onClick}>{label}</ButtonStyle>;
};

export default Button;
```

- App.js

```js
import styled from "@emotion/styled";
import Button from "components/Button";
import Title from "components/Title";

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
      <Title label="할 일 목록" />
      <Button label="삭제" />
    </WrapStyle>
  );
}

export default App;
```

### 1.1.3. TodoItem.js 컴포넌트 생성

- TodoItem에 Button 컴포넌트 넣음
- TodoItem.js

```js
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
  flex-basis: 0;  아이템의 시작 크기 설정 (0: 원래크기 무시하고 grow, shrink에 따라 결정) */
  flex: 1;
  font-size: 1.2rem;
  margin-right: 16px;
`;

const TodoItem = ({ label, onDelete }) => {
  return (
    <TodoItemWrapStyle>
      <LabelStyle>{label}</LabelStyle>
      <Button label="삭제" onClick={onDelete} />
    </TodoItemWrapStyle>
  );
};

export default TodoItem;
```

- App.js

```js
import styled from "@emotion/styled";
import Button from "components/Button";
import Title from "components/Title";
import TodoItem from "components/TodoItem";

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
      <Title label="할 일 목록" />
      <TodoItem />
    </WrapStyle>
  );
}

export default App;
```

### 1.1.4. TodoList.js 컴포넌트 생성

- TodoList에 TodoItem 컴포넌트 넣음

- TodoList.js

```js
import styled from "@emotion/styled";
import TodoItem from "./TodoItem";

const TodoListWrapStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

const TodoList = ({ todoList }) => {
  return (
    <TodoListWrapStyle>
      {todoList.map(todo => (
        <TodoItem key={todo} label={todo} />
      ))}
    </TodoListWrapStyle>
  );
};

export default TodoList;
```

- App.js

```js
import styled from "@emotion/styled";
import Button from "components/Button";
import Title from "components/Title";
import TodoItem from "components/TodoItem";
import TodoList from "components/TodoList";

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
      <Title label="할 일 목록" />
      <TodoList />
    </WrapStyle>
  );
}

export default App;
```

### 1.1.5 삭제기능 구현완료 (TodoList, TodoItem, App.js 파일)

- App.js

```js
import styled from "@emotion/styled";
import Button from "components/Button";
import Title from "components/Title";
import TodoItem from "components/TodoItem";
import TodoList from "components/TodoList";
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
  const [todoList, setTodolist] = useState([
    "contextAPI 공부하기",
    "타입스크립트 공부하기",
    "JWT 공부하기",
  ]);

  const onDelete = todo => {
    setTodolist(todoList.filter(item => item != todo));
  };

  return (
    <WrapStyle>
      <Title label="할 일 목록" />
      <TodoList todoList={todoList} onDelete={onDelete} />
    </WrapStyle>
  );
}

export default App;
```

-TodoList.js

```js
import styled from "@emotion/styled";
import TodoItem from "./TodoItem";

const TodoListWrapStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

const TodoList = ({ todoList, onDelete }) => {
  return (
    <TodoListWrapStyle>
      {todoList.map(todo => (
        <TodoItem key={todo} label={todo} onDelete={() => onDelete(todo)} />
      ))}
    </TodoListWrapStyle>
  );
};

export default TodoList;
```

- Todoitem.js

```js
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
  flex-basis: 0;  아이템의 시작 크기 설정 (0: 원래크기 무시하고 grow, shrink에 따라 결정) */
  flex: 1;
  font-size: 1.2rem;
  margin-right: 16px;
`;

const TodoItem = ({ label, onDelete }) => {
  return (
    <TodoItemWrapStyle>
      <LabelStyle>{label}</LabelStyle>
      <Button label="삭제" onClick={onDelete} />
    </TodoItemWrapStyle>
  );
};

export default TodoItem;
```

- Button.js

```js
import styled from "@emotion/styled";

const ButtonStyle = styled.button`
  border: 0;
  color: #fff;
  background-color: #ff5722;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 4px;

  &:hover {
    background-color: #ff5722;
    opacity: 0.8;
  }
  &:active {
    box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2);
  }
`;

const Button = ({ label, onClick }) => {
  return <ButtonStyle onClick={onClick}>{label}</ButtonStyle>;
};

export default Button;
```

## 1.2. DataView 컴포넌트 생성

- DataView 에 Title, TodoList, TodoItem 컴포넌트 넣기
- DataView.js

```js
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

const DataView = ({ todoList, onDelete }) => {
  return (
    <DataViewWrapStyle>
      <Title label="할 일 목록" />
      <TodoList todoList={todoList} onDelete={onDelete} />
    </DataViewWrapStyle>
  );
};

export default DataView;
```

-App.js

```js
import styled from "@emotion/styled";
import Button from "components/Button";
import DataView from "components/DataView";
import Title from "components/Title";
import TodoItem from "components/TodoItem";
import TodoList from "components/TodoList";
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
  const [todoList, setTodolist] = useState([
    "contextAPI 공부하기",
    "타입스크립트 공부하기",
    "JWT 공부하기",
  ]);

  const onDelete = todo => {
    setTodolist(todoList.filter(item => item != todo));
  };

  return (
    <WrapStyle>
      <DataView todoList={todoList} onDelete={onDelete} />
    </WrapStyle>
  );
}

export default App;
```

## 1.3. TextInput.js 컴포넌트 생성

- TextInput.js

```js
import styled from "@emotion/styled";
import React from "react";

const InputStyle = styled.input`
  font-size: 1.2rem;
  padding: 8px;
`;

const TextInput = ({ value, onChange }) => {
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
```

- App.js

```js
import styled from "@emotion/styled";
import Button from "components/Button";
import DataView from "components/DataView";
import TextInput from "components/TextInput";
import Title from "components/Title";
import TodoItem from "components/TodoItem";
import TodoList from "components/TodoList";
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
  const [todoList, setTodolist] = useState([
    "contextAPI 공부하기",
    "타입스크립트 공부하기",
    "JWT 공부하기",
  ]);

  // TextInput 상태
  const [todo, setTodo] = useState("");

  const onDelete = todo => {
    setTodolist(todoList.filter(item => item != todo));
  };

  return (
    <WrapStyle>
      <DataView todoList={todoList} onDelete={onDelete} />
      <TextInput value={todo} onChange={setTodo} />
    </WrapStyle>
  );
}

export default App;
```

### 1.3.0. (참고 App.js)

```js
import styled from "@emotion/styled";
import Button from "components/Button";
import DataView from "components/DataView";
import TextInput from "components/TextInput";
import Title from "components/Title";
import TodoItem from "components/TodoItem";
import TodoList from "components/TodoList";
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
  const [todoList, setTodolist] = useState([
    "contextAPI 공부하기",
    "타입스크립트 공부하기",
    "JWT 공부하기",
  ]);

  // TextInput 상태
  const [todo, setTodo] = useState("");

  const onDelete = todo => {
    setTodolist(todoList.filter(item => item != todo));
  };

  const onAdd = () => {
    if (todo === "") return;

    setTodolist([...todoList, todo]);
  };

  return (
    <WrapStyle>
      <DataView todoList={todoList} onDelete={onDelete} />
      <TextInput value={todo} onChange={setTodo} />
      <Button label="추가" color="#304ffe" onClick={onAdd} />
    </WrapStyle>
  );
}

export default App;
```
