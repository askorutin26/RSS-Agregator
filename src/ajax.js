import axios from 'axios';

const http = (url) => {
  axios.get(url).then((response) => response.data);
};

export default http;
