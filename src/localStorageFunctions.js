export const addLocalTodo = (todoString) => {
  let todoList = JSON.parse(localStorage.getItem("todos"));
  let tempId = JSON.parse(localStorage.getItem("tempId"));
  if (todoList === null) {
    todoList = [];
  }
  //We will create objects with a key of tempId instead of id to differentiate what was created
  //in offline mode vs. what is in our database.  Then we can filter those out and batch insert later
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
  let updatedList = JSON.parse(localStorage.getItem("updatedList"));
  if (todoList === null) {
    todoList = [];
  }
  if (deleteList === null) {
    deleteList = [];
  }
  if (updatedList === null) {
    //this might be overkill setting to an empty array, but we do it so our filter
    //function below doesn't break when trying to filter over a null value
    updatedList = [];
  }

  //We don't care about saving ids that were created and deleted while in offline mode
  //so we can filter out the objects with temporary ids with the logic below.
  if (!isTemp) {
    deleteList.push({ id });
  }

  //if we delete a todo, we want to remove any instance of that todo from the
  //added list we are storing and the updated list we are storing so we don't
  //batch update/insert those later on.
  let tempList = todoList.filter((todo) =>
    isTemp ? todo.tempId !== id : todo.id !== id
  );
  updatedList = updatedList.filter((todo) => {
    return isTemp ? todo.tempId !== id : todo.id !== id;
  });

  localStorage.setItem("todos", JSON.stringify(tempList));
  localStorage.setItem("deleteList", JSON.stringify(deleteList));
  localStorage.setItem("updatedList", JSON.stringify(updatedList));
};

export const updateLocalTodo = (id, body, isTemp) => {
  let updatedList = JSON.parse(localStorage.getItem("updatedList"));
  let todoList = JSON.parse(localStorage.getItem("todos"));

  if (updatedList === null) {
    updatedList = [];
  }

  const index = todoList.findIndex((todo) =>
    isTemp ? todo.tempId === id : todo.id === id
  );

  todoList.splice(index, 1, body);
  
  if (!isTemp) {
    updatedList.push(body);
  }

  localStorage.setItem("todos", JSON.stringify(todoList));
  localStorage.setItem("updatedList", JSON.stringify(updatedList));
};

export const batchLoadObject = () => {
  let deletedTodos = JSON.parse(localStorage.getItem("deleteList"));
  let addedTodos = JSON.parse(localStorage.getItem("todos"));
  let updatedTodos = JSON.parse(localStorage.getItem("updatedList"));

  //we need to take added todos and updated todos that have tempIds and consider
  //them all as new todos that need to be inserted into the database, so we filter
  //them out here below, prepare the object needed for insertion, and combine them
  //into one array
  addedTodos = [
    ...addedTodos
      .filter((todo) => todo.hasOwnProperty("tempId"))
      .map((el) => {
        return { title: el.title };
      }),
    ...updatedTodos
      .filter((todo) => todo.hasOwnProperty("tempId"))
      .map((el) => {
        return { title: el.title };
      }),
  ];

  //the only real updated todos are the ones that existed before we went offline.
  //we identify them by their property of id. The rest are inserts
  updatedTodos = updatedTodos.filter((todo) => todo.hasOwnProperty("id"));

  localStorage.removeItem("todos");
  localStorage.removeItem("deleteList");
  localStorage.removeItem("updatedList");
  localStorage.removeItem("tempId");
  return {
    deletedTodos,
    addedTodos,
    updatedTodos,
  };
};
