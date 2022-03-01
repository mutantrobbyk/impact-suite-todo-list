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
app.post('/api/todo', todoCtrl.addTodo);
app.delete('/api/todo/:todo_id', todoCtrl.deleteTodo);
app.put('/api/todo/:todo_id', todoCtrl.updateTodo);

//category endpoints
app.get('/api/categories');
app.get('/api/category');
app.get('/api/todos');
app.post('/api/categories');


massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(db => {
  app.set('db', db);
  app.listen(SERVER_PORT || 5000, () => console.log(`Port listening on ${SERVER_PORT}`));
});