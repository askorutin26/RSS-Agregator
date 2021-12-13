import _ from 'lodash';
import validateURL from './urlValidator';
import makeQueryForRss from './ajax.js';
import parseRSS from './rssParser';

const loadPosts = (state) => {
  const watchedState = state;
  const url = state.formState.currentURL;
  makeQueryForRss(url).then((response) => {
    const rssData = parseRSS(response.data);
    if (rssData === 'parsererror') { watchedState.formState.parsingError = true; } else {
      const feedTitle = rssData.title;
      const feedDescription = rssData.description;
      const feedPosts = rssData.postElems;

      const feed = {
        feedTitle,
        feedDescription,
        id: _.uniqueId('feed_'),
      };
      const posts = feedPosts.map((post) => {
        const id = _.uniqueId('post_');
        return { id, post };
      });
      watchedState.feed = feed;
      watchedState.posts = posts;
      watchedState.formState.state = 'finished';
    }
  }).catch(() => {
    watchedState.formState.networkError = true;
  });
};

export const formHandler = (state, elements) => {
  const watchedState = state;
  const form = elements;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    watchedState.formState.state = 'processing';
    const { value } = input;
    const urlArr = watchedState.formState.previousURLS;
    watchedState.formState.currentURL = value;

    const validationResult = validateURL(value, urlArr);

    if (validationResult === 'valid') {
      watchedState.formState.valid = 'valid';
      watchedState.formState.validationError = '';
      watchedState.formState.previousURLS.push(value);
      loadPosts(watchedState, elements);
    } else if (validationResult === 'this must be a valid URL') {
      watchedState.formState.validationError = 'urlErr';
      watchedState.formState.valid = 'invalid';
    } else {
      watchedState.formState.validationError = 'alreadyExists';
      watchedState.formState.valid = 'invalid';
    }
  });
};

export const postBtnHandler = (state) => {
  const watchedState = state;
  const { modals } = watchedState;
  const buttons = document.querySelectorAll('button[data-bs-toggle="modal"]');
  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const currentBtnId = e.target.getAttribute('id');

      if (!modals.watchedPosts.includes(currentBtnId)) {
        modals.watchedPosts.push(currentBtnId);
      }
      modals.clickedId = currentBtnId;
    });
  });
};

export const linkHandler = (state) => {
  const wathcedState = state;
  const { modals } = wathcedState;

  const links = document.querySelectorAll('a');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = e.target.getAttribute('id');
      if (!modals.watchedPosts.includes(id)) {
        modals.watchedPosts.push(id);
      }
      modals.clickedId = id;
    });
  });
};
