import onChange from 'on-change';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {
  renderForm, renderRss, renderModal,
} from './view.js';
import {
  formHandler, postHandler,
} from './handler.js';
import locales from './locales/locales.js';

const app = () => {
  const state = {
    formState: {
      currentURL: '',
      previousURLS: [],
      state: '',
      error: '',
    },
    rss: [],
    modals: {
      clickedId: '',
      watchedPosts: [],
    },
  };
  i18n.use(LanguageDetector).init({
    fallbackLng: 'ru',
    debug: true,
    resources: locales,
    detection: {
      order: ['queryString', 'cookie'],
      cache: ['cookie'],
    },
    interpolation: {
      escapeValue: false,
    },

  }).then(() => {
    const formContainer = document.querySelector('.rss-form');
    const modalContainer = document.querySelector('div.modal.fade');
    const rssContainer = document.querySelector('.rss-container');

    function update(container, appState, timeout) {
      setTimeout(() => {
        renderRss(container, appState);
        update(container, appState, 5000);
      }, timeout);
    }

    const watchedState = onChange(state, (path) => {
      switch (path) {
        case 'formState.state':
          renderForm(formContainer, state);
          break;
        case 'rss':
          renderRss(rssContainer, watchedState);
          postHandler(watchedState, rssContainer);
          update(rssContainer, watchedState, 5000);
          break;
        case 'modals.clickedId':
          renderModal(modalContainer, watchedState);
          break;
        default:
          break;
      }
    });
    formHandler(watchedState, formContainer);
  });
};

export default app;
