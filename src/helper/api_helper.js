import axios from "axios";

export const API_URL = "https://api.idealconstruction.online/api";

const axiosApi = axios.create({
  baseURL: API_URL,
});
const setToken = () => {
  const token = localStorage.getItem("_token");
  axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export async function get(url, config = {}) {
  setToken();
  return await axiosApi
    .get(url, { ...config })
    .then((response) => response.data);
}

export async function post(url, data, config = {}) {
  setToken();
  return axiosApi
    .post(url, data, { ...config })
    .then((response) => response.data);
}

export async function put(url, data, config = {}) {
  setToken();
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function del(url, config = {}) {
  setToken();
  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data);
}
