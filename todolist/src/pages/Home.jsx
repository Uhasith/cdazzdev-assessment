import { useEffect, useState } from "react";
import axios from "axios";
import Create from "../components/Create";
import TodoList from "../components/TodoList";

function Home() {

  const [todoList, setTodoList] = useState([]);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [edit, setEdit] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/get")
      .then((res) => {
        setTodoList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEdit = (id) => {
    axios
      .put("http://localhost:3001/api/update/status/" + id)
      .then((result) => {
        console.log(result.data);
        setTodoList((oldTodoList) =>
          oldTodoList.map((todo) => (todo._id === id ? result.data : todo))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateClick = (todo) => {
    setTask(todo.task);
    setDescription(todo.description);
    setEdit(true);
    setUpdateId(todo._id);
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/api/delete/" + id)
      .then((result) => {
        console.log(result.data);
        setTodoList((oldTodoList) =>
          oldTodoList.filter((todo) => todo._id !== id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold underline text-red-500 mt-10">
        Todo List
      </h2>
      <div className="w-full mt-10">
        <div>
          <Create
            task={task}
            edit={edit}
            description={description}
            setTodoList={setTodoList}
            setTask={setTask}
            setDescription={setDescription}
            setEdit={setEdit}
            updateId={updateId}
          />
        </div>
        <div className="max-w-xl rounded-xl mx-auto">
          <TodoList
            todoList={todoList}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleUpdateClick={handleUpdateClick}
          />
        </div>
      </div>
    </div>
  );
}


export default Home;
