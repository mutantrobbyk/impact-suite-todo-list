require('dotenv').config();

const express = require('express');
//postgres in-between
const massive = require('massive');
const { SERVER_PORT, CONNECTION_STRING } = process.env;
const todoCtrl = require('./controllers/todoController');

const app = express();

//parse json top-level middleware
app.use(express.json());

//ENDPOINTS
//todo endpoints
app.get('/api/todo/:todo_id', todoCtrl.getTodo);
app.get('/api/todos', todoCtrl.getAllTodos);
app.post('/api/todo', todoCtrl.addTodo);
app.delete('/api/todo/:todo_id', todoCtrl.deleteTodo);
app.put('/api/todo/:todo_id', todoCtrl.updateTodo);

//batchLoad endpoints
app.post('/api/batchedTodos', todoCtrl.batchedTodos, todoCtrl.getAllTodos)


massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(db => {
  app.set('db', db);
  app.listen(SERVER_PORT || 5000, () => console.log(`Port listening on ${SERVER_PORT}`));
});