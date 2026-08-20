const express = require("express");

const app = express();

const PORT = 3001;


app.use(express.json());



const tasks = require("./data/tasks");



app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { title, done = false } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      message: "Title is required"
    });
  }

  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    title: title.trim(),
    done: Boolean(done)
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  const { title, done } = req.body;

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({
        message: "Title must not be empty"
      });
    }

    task.title = title.trim();
  }

  if (done !== undefined) {
    task.done = Boolean(done);
  }

  res.json(task);
});


app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];

  res.json({
    message: "Task deleted successfully",
    task: deletedTask
  });
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

