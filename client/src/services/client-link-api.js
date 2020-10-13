import axios from 'axios';

export const postClientLink = (data) =>
  axios.post(`/client-link`, data).then(({ data }) => data);
export const getLinkById = (id) =>
  axios.get(`/client-link/${id}`).then(({ data }) => data);
