import React, { useEffect, useState } from "react";
import { fetchToDos } from "../utils/api";
import TodoModal from "../components/ToDoDetailsModal";
import TodoList from "../components/ToDoList";
import homeImage from "../assets/home-image.jpg";
import Header from "../components/Header";
import SliderComponent from "../components/TextSlider";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState(null);

  // Pagination states
  const [inProgressPage, setInProgressPage] = useState(1);
  const [completedPage, setCompletedPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(5);

  useEffect(() => {
    document.title = "My TaskTide";
  }, []);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await fetchToDos();
        setTodos(data);

        const uniqueUserIds = [...new Set(data.map((todo) => todo.userId))];
        setUserIds(uniqueUserIds);
        setSelectedUser(uniqueUserIds[0] || null);
      } catch (err) {
        setError("Failed to fetch todos.");
      } finally {
        setLoading(false);
      }
    };
    getTodos();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Filter tasks by selected user
  const userTasks = todos.filter((todo) => todo.userId === selectedUser);
  const inProgressTasks = userTasks.filter((todo) => !todo.completed);
  const completedTasks = userTasks.filter((todo) => todo.completed);

  // Pagination logic for In Progress tasks
  const paginatedInProgress = inProgressTasks.slice(
    (inProgressPage - 1) * tasksPerPage,
    inProgressPage * tasksPerPage
  );
  const inProgressTotalPages = Math.ceil(inProgressTasks.length / tasksPerPage);

  // Pagination logic for Completed tasks
  const paginatedCompleted = completedTasks.slice(
    (completedPage - 1) * tasksPerPage,
    completedPage * tasksPerPage
  );
  const completedTotalPages = Math.ceil(completedTasks.length / tasksPerPage);

  return (
    <div>
      <Header />
      <div className="relative w-full h-[500px] overflow-hidden">
      <img 
          src={homeImage} 
          alt="Home" 
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "350px",
            objectFit: "contain" 
          }} 
        />
        {/* Elegant Welcome Message */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <h1 className="text-white text-3xl md:text-4xl font-bold">
            Welcome to <span className="text-yellow-400">TaskTide</span> - Your Task Manager
          </h1>
        </div>
      </div>

      <SliderComponent />

      <div className="p-5">
        {/* User Selection & Tasks per Page */}
        <div className="my-4 flex flex-wrap items-center space-x-4">
          <label className="text-lg font-semibold">Select a user:</label>
          <select
            className="border p-2 rounded-md"
            value={selectedUser}
            onChange={(e) => {
              setSelectedUser(Number(e.target.value));
              setInProgressPage(1);
              setCompletedPage(1);
            }}
          >
            {userIds.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>

          <label className="text-lg font-semibold">Tasks per page:</label>
          <select
            className="border p-2 rounded-md"
            value={tasksPerPage}
            onChange={(e) => {
              setTasksPerPage(Number(e.target.value));
              setInProgressPage(1);
              setCompletedPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>

        {/* Todo Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 g-white shadow-lg rounded-lg">
          {/* In Progress Tasks */}
          <div className="flex justify-center items-center h-full pb-5">
            <TodoList
              tasks={paginatedInProgress}
              setSelectedTodo={setSelectedTodo}
              tasksPerPage={tasksPerPage}
              page={inProgressPage}
              setPage={setInProgressPage}
              totalPages={inProgressTotalPages}
              type="in-progress"
            />
          </div>

          {/* Completed Tasks */}
          <div className="flex justify-center items-center h-full pb-5">
            <TodoList
              tasks={paginatedCompleted}
              setSelectedTodo={setSelectedTodo}
              tasksPerPage={tasksPerPage}
              page={completedPage}
              setPage={setCompletedPage}
              totalPages={completedTotalPages}
              type="completed"
            />
          </div>
        </div>
      </div>

      {/* Modal for Task Details */}
      {selectedTodo && <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />}
    </div>
  );
};

export default TodoPage;
