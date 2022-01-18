import onChange from 'on-change';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { setLocale } from 'yup';
import _ from 'lodash';
import {
  renderForm, renderFeed, renderModal, renderPostBlock,
} from './view.js';
import {
  formHandler, postHandler,
} from './handler.js';
import locales from './locales/locales.js';
import makeQueryForRss from './ajax.js';
import parseRSS from './rssParser.js';

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
      watchedPosts: new Set(),
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

    const updateRss = (appState, timeout) => {
      const { feeds } = appState;
      const queryPromises = feeds.map(({ url }) => makeQueryForRss(url));
      Promise.all(queryPromises).then((result) => {
        result.forEach((queryResult) => {
          const rssData = parseRSS(queryResult.data.contents);
          const { rssTitle, postElems } = rssData;
          const { posts } = appState;
          const oldPosts = _.filter(posts, { feedTitle: rssTitle });
          const diff = _.differenceBy(postElems, oldPosts, 'title');
          const feed = appState.feeds.find(({ title }) => title === rssTitle);
          const { id } = feed;
          if (!_.isEmpty(diff)) {
            diff.forEach((elem) => {
              posts.unshift({
                feedID: id,
                feedTitle: rssTitle,
                postId: _.uniqueId('post_'),
                ...elem,
              });
            });
          }
        });
        setTimeout(updateRss, timeout, appState, timeout);
      });
    };

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
    updateRss(watchedState, 5000);
  });
};

export default app;
