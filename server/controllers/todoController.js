module.exports = {
  addTodo: async (req, res) => {
    const { title, description, category_id } = req.body;
    const db = req.app.get("db");
    const newTodo = await db.todos.add_todo({
      title,
      description,
      category_id,
    });
    if (newTodo.length > 0) {
      res.status(200).send(newTodo);
    } else {
      res.status(400).send({ message: "Not able to process" });
    }
  },
  updateTodo: async (req, res) => {
    const { title } = req.body;
    const { todo_id } = req.params;
    const db = req.app.get("db");
    const updatedTodo = await db.todos.update_todo({
      title,
      todo_id,
    });
    if (updatedTodo) {
      res.status(200).send(updatedTodo);
    } else {
      res.status(400).send({ message: "Not able to process" });
    }
  },
  deleteTodo: async (req, res) => {
    const { todo_id } = req.params;
    const db = req.app.get("db");
    //TODO ROB insert this once tasks are a part of the mix
    // await db.delete_tasks({todo_id});
    const deletedTodo = await db.todos.delete_todo([todo_id]);
    res.status(200).send(deletedTodo);
  },
  getAllTodos: (req, res) => {
    const db = req.app.get("db");
    const todos = db.todos
      .get_all_todos()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => res.sendStatus(400));
  },
  getAllTodosByCategory: async (req, res) => {
    const { categoryId } = req.params;
    const db = req.app.get("db");
    const todos = await db.get_todos_by_category({ categoryId });
    if (todos) {
      res.status(200).send(todos);
    } else {
      res.status(400).send({ message: "Cannot get todo list" });
    }
  },
  getTodo: async (req, res) => {
    const { todo_id } = req.params;
    const db = req.app.get("db");
    const todo = await db.todos.get_todo([todo_id]);
    if (todo.length > 0) {
      res.status(200).send(todo);
    } else {
      res.status(400).send({ message: "Cannot get todo" });
    }
  },
  batchedTodos: async (req, res, next) => {
    const { deletedTodos, addedTodos, updatedTodos } = req.body;
    const db = req.app.get("db");
    await updatedTodos.forEach((todo) => {
      db.todos.update_todo({ title: todo.title, todo_id: todo.id });
    });
    await deletedTodos.forEach((todo) => {
      return db.todos.destroy(todo);
    });
    await db.todos.insert(addedTodos);
    //running into a race condition here with updateTodos. Even though
    //we wait until that db call is done before even moving on to
    //deleted and added, our next function call which is simply
    //retrieving all todos, it does not reflect the newly updated 
    //columns.  Have temp fix in place for better UX
    next();
  },
};
