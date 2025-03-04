import React from "react";

const TodoList = ({ tasks, setSelectedTodo, tasksPerPage, page, setPage, totalPages, type }) => {
  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div
      className={`border p-4 shadow-lg rounded-xl bg-gray-100 flex flex-col`}
      style={{ width: "650px", minHeight: "350px" }}
    >
      <h2 className={`font-bold ${type === "in-progress" ? "text-yellow-500" : "text-green-500"} mb-2`}>
        {type === "in-progress" ? "In Progress" : "Completed"}
      </h2>
      <div className="flex-grow overflow-y-auto">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-2 mb-2 rounded-md shadow cursor-pointer hover:bg-gray-200 transition"
              onClick={() => setSelectedTodo(task)}
            >
              {task.title}
            </div>
          ))
        ) : (
          <p className="text-gray-500">{type === "in-progress" ? "No tasks in progress." : "No completed tasks."}</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          className={`text-blue-500 ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={page === 1}
          onClick={handlePrevious}
        >
          Previous
        </button>
        <span>
          {page} of {totalPages || 1}
        </span>
        <button
          className={`text-blue-500 ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={page === totalPages}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TodoList;
