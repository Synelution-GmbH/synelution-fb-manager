import axios from 'axios';

export const getPosts = (key, { client, type, from, to }) =>
  axios.get(`/posts/${client}/${type}/${from}/${to}/`).then(({ data }) => data);

export const createPost = ({ client, ...args }) => {
  return axios.post(`/posts/${client}`, { ...args }).then(({ data }) => data);
};
export const deletePost = (id) => {
  return axios.delete(`/posts/${id}`).then(({ data }) => data);
};
