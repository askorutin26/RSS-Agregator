import axios from 'axios';

const makeQueryForRss = (url) => axios.get(url);

export default makeQueryForRss;
