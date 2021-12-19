import onChange from 'on-change';
import {
  renderForm, renderRss, renderModal,
} from './view.js';
import {
  formHandler, postBtnHandler, clickedPostHandler,
} from './handler.js';

const state = {
  formState: {
    currentURL: '',
    previousURLS: [],
    state: '',
    valid: '',
    validationResult: '',
    validationError: '',
    networkError: '',
    parsingError: '',
  },
  feeds: [],
  posts: [],
  rss: [],
  modals: {
    clickedId: [],
    watchedPosts: [],
  },
};

const app = (elements) => {
  const [formContainer, modalContainer, rssContainer] = elements;
  function update(container, appState, timeout) {
    setTimeout(() => {
      renderRss(container, appState);
      update(container, appState, 5000);
      postBtnHandler(appState);
    }, timeout);
  }

  const watchedState = onChange(state, (path) => {
    switch (path) {
      case 'formState.validationResult':
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
