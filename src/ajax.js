import axios from 'axios';

const http = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export default http;
