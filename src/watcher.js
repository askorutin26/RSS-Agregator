import onChange from 'on-change';
import renderForm from './view.js';
import handler from './handler.js';
import http from './ajax.js';

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
  const container = document.querySelector('div.col-md-10');

  const watchedState = onChange(state, (path, value, previousValue) => {
    renderForm(container, state.formState);
    http(state.formState.currentURL).then(console.log);
    console.log('aboba');
  });
  handler(watchedState, form);
};

export default app;
