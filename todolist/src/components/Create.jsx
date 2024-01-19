import { useState } from "react";
import axios from "axios";

function Create({
  setTodoList,
  task,
  setTask,
  description,
  setDescription,
  edit,
  setEdit,
  updateId,
}) {
  const handleAdd = () => {
    if (!task) {
      alert("Please enter task name");
      return;
    }

    axios
      .post("http://localhost:3001/api/add", {
        task: task,
        description: description,
      })
      .then((res) => {
        setTask("");
        setTodoList((old) => [...old, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateTask = () => {
 
    if (!task) {
      alert("Please enter task name");
      return;
    }

    axios
      .put("http://localhost:3001/api/update/" + updateId, {
        task: task,
        description: description,
      })
      .then((result) => {
        setTask("");
        setDescription("");
        setEdit(false);
        setTodoList((oldTodoList) =>
          oldTodoList.map((todo) =>
            todo._id === updateId ? result.data : todo
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    setTask("");
    setDescription("");
    setEdit(false);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <form>
          <div className="grid gap-2 mb-5 md:grid-cols-1">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-left text-sm font-medium text-gray-900"
              >
                Task name
              </label>
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter Task Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block mb-2 text-left text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <textarea
                type="text"
                id="last_name"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] h-[100px] p-2.5"
                placeholder="Enter Description"
              />
              {edit === true ? (
                <div>
                  <button
                    type="button"
                    onClick={handleUpdateTask}
                    className="focus:outline-none mt-5 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium 
                              rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Update
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCancel}
                    className="focus:outline-none mt-5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium 
                              rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    Cancle
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleAdd}
                  className="focus:outline-none mt-5 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium 
          rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Add
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Create;
