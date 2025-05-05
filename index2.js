const express = require('express');


const app = express();
const port = 4000;


app.use(express.json());

let tasks = [];
let nextId = 1;

app.post('/addTask', (req, res) => {
    const { taskName } = req.body;
    if (!taskName) {
        return res.status(400).json({ error: 'Task name required' });
    }
    const newTask = { id: nextId++, taskName };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.delete('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex(task => task.id === taskId);

    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const deletedTask = tasks.splice(index, 1);
    res.json({ message: 'Task deleted', task: deletedTask[0] });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
