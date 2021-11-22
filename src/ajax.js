import axios from 'axios';

const http = (url) => {
  return axios.get(url);
};

export default http;
