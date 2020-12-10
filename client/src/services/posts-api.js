import axios from 'axios';

export const getPosts = (key, { client, type, from, to }) =>
  axios.get(`/posts/${client}/${type}/${from}/${to}/`).then(({ data }) => data);

export const createPost = ({ client, ...args }) =>
  axios.post(`/posts/${client}`, { ...args }).then(({ data }) => data);

export const deletePost = (id) =>
  axios.delete(`/posts/${id}`).then(({ data }) => data);

export const putPost = ({ id, data }) =>
  axios.put(`/posts/${id}`, data).then(({ data }) => data);

export const deleteAsset = ({ id, assetId }) =>
  axios.delete(`/posts/${id}/${assetId}`).then(({ data }) => data);
