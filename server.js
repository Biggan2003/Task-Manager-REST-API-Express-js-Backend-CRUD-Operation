require("dotenv").config();

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not configured");
}


app.use(express.json());



const tasks = require("./data/tasks");
const users = require("./data/users");

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required"
    });
  }

  const existingUser = users.find(
    (user) => user.username === username
  );

  if (existingUser) {
    return res.status(409).json({
      message: "Username already exists"
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword
  };

  users.push(newUser);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: newUser.id,
      username: newUser.username
    }
  });
});




app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (user) => user.username === username
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid username or password"
    });
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatch) {
    return res.status(401).json({
      message: "Invalid username or password"
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username
    },
    JWT_SECRET,
    {
      expiresIn: "1h"
    }
  );

  res.json({
    message: "Login successful",
    token
  });
});




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

