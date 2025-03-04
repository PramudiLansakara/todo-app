import React, { useEffect, useState } from "react";
import { fetchToDos } from "../utils/api";
import TodoModal from "../components/ToDoDetailsModal";
import TodoList from "../components/ToDoList";
import homeImage from "../assets/home-image.jpg";
import Header from "../components/Header";
import SliderComponent from "../components/Slider";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState(null);

  // States for pagination and tasks per page
  const [inProgressPage, setInProgressPage] = useState(1);
  const [completedPage, setCompletedPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(5);

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
  const inProgressStartIndex = (inProgressPage - 1) * tasksPerPage;
  const inProgressEndIndex = inProgressStartIndex + tasksPerPage;
  const paginatedInProgress = inProgressTasks.slice(inProgressStartIndex, inProgressEndIndex);
  const inProgressTotalPages = Math.ceil(inProgressTasks.length / tasksPerPage);

  // Pagination logic for Completed tasks
  const completedStartIndex = (completedPage - 1) * tasksPerPage;
  const completedEndIndex = completedStartIndex + tasksPerPage;
  const paginatedCompleted = completedTasks.slice(completedStartIndex, completedEndIndex);
  const completedTotalPages = Math.ceil(completedTasks.length / tasksPerPage);

  return (
    <div>
      <Header />
      <div className="w-full h-[500px] overflow-hidden">
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
    </div>
      <SliderComponent />

      <div className="p-6">
      {/* User Selection and Tasks per page */}
      <div className="my-4 flex items-center space-x-3">
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

      {/* Todo List */}
      <div className="grid grid-cols-2">
        <TodoList
          tasks={paginatedInProgress}
          setSelectedTodo={setSelectedTodo}
          tasksPerPage={tasksPerPage}
          page={inProgressPage}
          setPage={setInProgressPage}
          totalPages={inProgressTotalPages}
          type="in-progress"
        />
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

      {/* Popup Modal Component */}
      {selectedTodo && <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />}
    </div>
  );
};

export default TodoPage;
