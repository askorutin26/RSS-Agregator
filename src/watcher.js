import onChange from 'on-change';
import {
  renderForm, renderRss, renderModal,
} from './view.js';
import {
  formHandler, postBtnHandler, clickedPostHandler, postHandler,
} from './handler.js';

const app = () => {
  const state = {
    formState: {
      currentURL: '',
      previousURLS: [],
      state: '',
      error: [],
    },
    rss: [],
    modals: {
      clickedId: [],
      watchedPosts: [],
    },
  };
  const formContainer = document.querySelector('.rss-form');
  const modalContainer = document.querySelector('div.modal.fade');
  const rssContainer = document.querySelector('.rss-container');
  const postsContainer = document.querySelector('div.post');

  function update(container, appState, timeout) {
    setTimeout(() => {
      renderRss(container, appState);
      update(container, appState, 5000);
      postBtnHandler(appState);
    }, timeout);
  }

  const watchedState = onChange(state, (path) => {
    console.log(path);
    console.log(state.formState);
    switch (path) {
      case 'formState.state':
        renderForm(formContainer, state);
        break;
      case 'rss':
        renderRss(rssContainer, watchedState);
        postBtnHandler(watchedState);
        update(rssContainer, watchedState, 5000);
        break;
      case 'modals.clickedId':
        renderModal(modalContainer, watchedState);
        clickedPostHandler(watchedState);
        break;
      default:
        break;
    }
  });
  formHandler(watchedState, formContainer);
};

export default app;
