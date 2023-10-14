import axios from "axios";

const ClientAPI = axios.create({
  baseURL: `http://127.0.0.1:8000/api`,
});

ClientAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

ClientAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response && response.status === 401) {
      localStorage.removeItem("ACCESS_TOKEN");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default ClientAPI;
