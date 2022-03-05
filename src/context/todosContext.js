import React, { useReducer, createContext } from "react";

export const TodosContext = createContext();

const initialState = {
  todos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_TODOS":
      return {
        todos: [...action.payload],
      };
    case "ADD_TODO":
      return {
        todos: [...state.todos, ...action.payload],
      };
    case "DELETE_TODO":
      let tempTodosArray = state.todos.filter(
        (todo) => todo.id !== action.payload[0].id
      );
      return {
        todos: [...tempTodosArray],
      };
    case "UPDATE_TODO":
      let tempUpdatedTodos = state.todos
      const index = tempUpdatedTodos.findIndex((todo) => todo.id === action.payload[0].id);
      tempUpdatedTodos.splice(index, 1, action.payload[0]);
      return {
        todos: [...tempUpdatedTodos],
      };
  }
};

export const TodosContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TodosContext.Provider value={[state, dispatch]}>
      {props.children}
    </TodosContext.Provider>
  );
};
