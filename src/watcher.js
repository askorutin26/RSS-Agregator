import onChange from 'on-change';
import { values } from 'lodash';
import {
  renderForm, renderFeedBlock, renderPostBlock, renderModal, btnWatched
} from './view.js';
import { formHandler, postBtnHandler } from './handler.js';

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
  modals: {
    currentId: '',
    watchedPosts: [],
  },
};

const app = () => {
  const form = document.querySelector('.rss-form');
  const modal = document.querySelector('div.modal.fade');
  const feedContainer = document.querySelector('div.feeds');
  const postsContainer = document.querySelector('div.posts');

  const watchedState = onChange(state, (path, value, previousValue) => {
    const updatePosts = (timeout) => {
      setTimeout(() => {
        renderPostBlock(postsContainer, watchedState.posts);
        updatePosts(5000);
      }, timeout);
    };
    switch (path) {
      case 'formState.valid':
      case 'formState.state':
      case 'formState.error':
        renderForm(form, state.formState);
        break;
      case 'feed':
        renderFeedBlock(feedContainer, watchedState.feed);
        break;
      case 'posts':
        renderPostBlock(postsContainer, watchedState);
        postBtnHandler(watchedState);
        break;
      case 'modals.currentId':
        renderModal(modal, watchedState.modals, watchedState.posts);
        btnWatched(postsContainer,watchedState.modals.currentId);
        break;
      default:
        break;
    }
  });
  formHandler(watchedState, form);
};

export default app;
