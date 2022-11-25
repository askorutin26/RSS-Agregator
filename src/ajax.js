import axios from 'axios';

const wrapProxy = (url) => {
  const urlBuilder = new URL('/get', 'https://allorigins.hexlet.app');
  urlBuilder.searchParams.set('url', url);
  urlBuilder.searchParams.set('disableCache', 'true');
  return urlBuilder.toString();
};

const makeQueryForRss = (url) => axios.get(wrapProxy(url));

export default makeQueryForRss;
