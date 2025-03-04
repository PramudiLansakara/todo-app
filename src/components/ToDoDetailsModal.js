import React from "react";

const TodoModal = ({ todo, onClose }) => {
  if (!todo) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <h2 className="text-2xl font-bold">{todo.title}</h2>
        <p className="text-gray-700 mt-2">
          Status: {todo.completed ? "Completed ✅" : "In Progress ⏳"}
        </p>
        <p className="text-gray-500 mt-2">User ID: {todo.userId}</p>
        <p className="text-gray-500">Task ID: {todo.id}</p>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TodoModal;
