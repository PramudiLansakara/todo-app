import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchToDos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchToDoById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
