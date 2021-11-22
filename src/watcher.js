import onChange from 'on-change';
import { renderForm, renderFeedBlock } from './view.js';
import handler from './handler.js';
import http from './ajax.js';
import parseRSS from './rssParser.js';

const state = {
  formState: {
    currentURL: '',
    previousURLS: [],
    state: '',
    valid: '',
    error: '',
  },
};

const app = () => {
  const form = document.querySelector('.rss-form');
  const formContainer = document.querySelector('div.col-md-10');
  const feedContainer = document.querySelector('div.order-0');

  const watchedState = onChange(state, (path, value, previousValue) => {
    renderForm(formContainer, state.formState);
    const test = http(state.formState.currentURL);
    test.then((response) => console.log(renderFeedBlock(feedContainer, parseRSS(response.data))));
  });
  handler(watchedState, form);
};

export default app;
