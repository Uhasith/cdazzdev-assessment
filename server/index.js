const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/todos");

app.get("/api/get", (req, res) => {
  TodoModel.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/api/add", (req, res) => {
  const task = req.body.task;
  const description = req.body.description;

  TodoModel.create({ task: task, description: description })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.put("/api/update/status/:id", (req, res) => {
  const { id } = req.params;

  TodoModel.findById(id)
    .then((todo) => {
      if (!todo) {
        res.status(404).json({ message: "Todo not found" });
      } else {
        TodoModel.findByIdAndUpdate(
          id,
          { completed: !todo.completed },
          { new: true }
        )
          .then((updatedTodo) => {
            res.json(updatedTodo);
          })
          .catch((updateErr) => {
            res.json(updateErr);
          });
      }
    })
    .catch((findErr) => {
      res.json(findErr);
    });
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { task, description } = req.body;

  TodoModel.findById(id)
    .then((todo) => {
      if (!todo) {
        res.status(404).json({ message: "Todo not found" });
      } else {
        TodoModel.findByIdAndUpdate(
          id,
          { task: task, description: description },
          { new: true }
        )
          .then((updatedTodo) => {
            res.json(updatedTodo);
          })
          .catch((updateErr) => {
            res.json(updateErr);
          });
      }
    })
    .catch((findErr) => {
      res.json(findErr);
    });
});

app.delete("/api/delete/:id", (req, res) => {
  const { id } = req.params;

  TodoModel.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        res.status(404).json({ message: "Todo not found" });
      } else {
        res.json(result);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
