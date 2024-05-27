import { createContext, useState } from "react";

// context
export const TodoListContext = createContext();

// 초기 값
const initValue = [
  "contextAPI 공부하기",
  "타입스크립트 공부하기",
  "JWT 공부하기",
];

// provider
export const TodoListContextProvider = ({ children }) => {
  const [todoList, setTodoList] = useState(initValue);

  const onDelete = todo => {
    setTodoList(todoList.filter(item => item != todo));
  };
  const onAdd = todo => {
    setTodoList([...todoList, todo]);
  };

  return (
    <TodoListContext.Provider value={{ todoList, onAdd, onDelete }}>
      {children}
    </TodoListContext.Provider>
  );
};
