import {
  BsCircleFill,
  BsTrashFill,
  BsFillCheckCircleFill,
  BsPen,
} from "react-icons/bs";

function TodoList({ todoList, handleEdit, handleDelete, handleUpdateClick }) {
  return (
    <div className="flex flex-col rounded-2xl mb-[100px] items-center bg-gray-50 p-10 max-h-[600px] overflow-auto">
      {todoList.length === 0 ? (
        <div className="text-gray-500 text-xl mt-5">No Todo</div>
      ) : (
        todoList.map((todo) => (
          <div
            className="flex items-center bg-white shadow-lg rounded-lg w-full my-2 p-4"
            key={todo._id}
          >
            <div
              onClick={() => handleEdit(todo._id)}
              className="cursor-pointer mr-4"
            >
              {todo.completed ? (
                <BsFillCheckCircleFill className="w-6 h-6 text-green-500" />
              ) : (
                <BsCircleFill className="w-6 h-6 text-gray-300 rounded-full border-2 border-gray-500" />
              )}
            </div>
            <div className="flex-grow">
              <p
                className={`text-lg font-semibold ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                Task Name : {todo.task}
              </p>
              {todo.description && (
                <p className="text-sm text-gray-600">
                  Description : {todo.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-5 ml-4">
              <BsPen
                className="w-6 h-6 text-blue-500 cursor-pointer"
                onClick={() => handleUpdateClick(todo)}
              />
              <BsTrashFill
                className="w-6 h-6 text-red-500 cursor-pointer"
                onClick={() => handleDelete(todo._id)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TodoList;
