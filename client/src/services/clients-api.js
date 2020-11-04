import axios from 'axios';

export const postClient = (data) =>
  axios
    .post('/clients', data, {
      headers: { 'content-type': 'multipart/form-data' },
    })
    .then(({ data }) => data);
export const putClient = ({ slug, data }) =>
  axios.put(`/clients/${slug}`, data).then(({ data }) => data);
export const getClient = ({ slug }) =>
  axios.get(`/clients/${slug}`).then(({ data }) => data);
export const getClients = () => axios.get('/clients').then(({ data }) => data);
export const deleteClient = ({ slug }) =>
  axios.delete(`/clients/${slug}`).then(({ data }) => data);

export const postCode = ({ slug, data }) =>
  axios.post(`/clients/${slug}/code`, data).then(({ data }) => data);
export const deleteCode = ({ slug, code }) =>
  axios.delete(`/clients/${slug}/${code}`).then(({ data }) => data);
export const putCode = ({ slug, code, data }) =>
  axios.put(`/clients/${slug}/${code}`, data).then(({ data }) => data);
