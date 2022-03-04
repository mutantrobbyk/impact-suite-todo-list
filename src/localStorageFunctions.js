export const addLocalTodo = (todoString) => {
  let todoList = JSON.parse(localStorage.getItem("todos"));
  let tempId = JSON.parse(localStorage.getItem("tempId"));
  if (todoList === null) {
    todoList = [];
  }
  if (tempId === null) {
    tempId = 1;
  }
  todoList.push({ tempId: tempId, title: todoString });
  tempId++;
  localStorage.setItem("todos", JSON.stringify(todoList));
  localStorage.setItem("tempId", tempId);
};

export const deleteLocalTodo = (id, isTemp) => {
  let todoList = JSON.parse(localStorage.getItem("todos"));
  let deleteList = JSON.parse(localStorage.getItem("deleteList"));
  if (todoList === null) {
    todoList = [];
  }
  if (deleteList === null) {
    deleteList = [];
  }
  //We don't care about saving ids that were created and deleted while in offline mode
  if (!isTemp) {
    deleteList.push({id});
  }
  
  let tempList = todoList.filter((todo) => isTemp ? todo.tempId !== id : todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(tempList));
  localStorage.setItem("deleteList", JSON.stringify(deleteList));
};

export const batchLoadObject = () => {
  let deletedTodos = JSON.parse(localStorage.getItem("deleteList"));
  let addedTodos = JSON.parse(localStorage.getItem("todos"));
  addedTodos = addedTodos.filter(todo => todo.hasOwnProperty('tempId')).map(el => {
    return {title: el.title};
  })

  localStorage.removeItem("todos");
  localStorage.removeItem("deleteList");
  return {
    deletedTodos,
    addedTodos
  }

}
