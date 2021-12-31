import onChange from 'on-change';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { setLocale } from 'yup';
import {
  renderForm, renderFeed, renderModal, renderPostBlock,
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
    feeds: [],
    posts: [],
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
    setLocale({
      mixed: {
        notOneOf: 'alreadyExists',
      },
      string: {
        url: 'invalidURL',
      },
    });

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
          renderForm(formContainer, watchedState);
          break;
        case 'feeds':
          renderFeed(rssContainer, watchedState);
          break;
        case 'posts':
          renderPostBlock(watchedState);
          postHandler(watchedState, rssContainer);
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
