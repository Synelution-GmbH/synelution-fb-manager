import axios from 'axios';

export const postClient = (data) =>
  axios
    .post('/clients', data, {
      headers: { 'content-type': 'multipart/form-data' },
    })
    .then(({ data }) => data);
export const getClients = () => axios.get('clients').then(({ data }) => data);
