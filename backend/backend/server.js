const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow requests from your frontend
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'your_database'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// API endpoint to get all tasks
app.get('/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// API endpoint to create a new task
app.post('/tasks', (req, res) => {
  const task = req.body;
  const sql = 'INSERT INTO tasks SET ?';
  db.query(sql, task, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...task });
  });
});

// API endpoint to update a task
app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const newTask = req.body;
  const sql = 'UPDATE tasks SET ? WHERE id = ?';
  db.query(sql, [newTask, taskId], (err, result) => {
    if (err) throw err;
    res.json({ id: taskId, ...newTask });
  });
});

// API endpoint to delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const sql = 'DELETE FROM tasks WHERE id = ?';
  db.query(sql, taskId, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Task deleted' });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
