import onChange from 'on-change';
import { renderForm, renderFeedBlock, renderPostBlock } from './view.js';
import formHandler from './handler.js';
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
  feed: {
    feedTitle: '',
    feedDescription: '',
  },
  posts: [],
};
const app = () => {
  const form = document.querySelector('.rss-form');
  const showBtn = document.querySelector('[data-bs-toggle="modal"]');
  const modal = document.querySelector('.modal');
  const formContainer = document.querySelector('div.col-md-10');
  const feedContainer = document.querySelector('div.feeds');
  const postsContainer = document.querySelector('div.posts');

  const watchedState = onChange(state, (path, value, previousValue) => {
    switch (path) {
      case 'formState.valid':
        renderForm(formContainer, state.formState);
        break;
      case 'feed':
        renderFeedBlock(feedContainer, watchedState.feed);
        break;
      case 'posts':
        renderPostBlock(postsContainer, watchedState.posts);
        break;
      default:
        break;
    }
  });
  formHandler(watchedState, form);
  console.log('1');
};

export default app;
