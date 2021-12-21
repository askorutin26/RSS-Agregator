import _ from 'lodash';
import validateURL from './urlValidator';
import makeQueryForRss from './ajax.js';
import parseRSS from './rssParser';

const loadPosts = (state) => {
  const watchedState = state;
  const url = watchedState.formState.currentURL;
  makeQueryForRss(url).then((response) => {
    const rssData = parseRSS(response.data.contents);
    console.log(`RSSDATA: ${rssData}`);
    if (rssData === 'parsererror') {
      watchedState.formState.validationResult = 'parsingError';
      watchedState.formState.state = 'finished';
    } else {
      const feedTitle = rssData.title;
      const feedDescription = rssData.description;
      const feedPosts = rssData.postElems;
      const feed = {
        feedTitle,
        feedDescription,
        url,
      };

      const posts = feedPosts.map((post) => {
        const id = _.uniqueId('post_');
        return { id, post };
      });

      const rss = {
        rssId: _.uniqueId('rss_'),
        url,
        feed,
        posts,
      };

      watchedState.rss.unshift(rss);
      watchedState.formState.validationResult = 'valid';
      watchedState.formState.previousURLS.push(url);
      watchedState.formState.state = 'finished';
    }
  }).catch((error) => {
    console.log(`ERROR: ${error}`);
    watchedState.formState.state = 'finished';
    watchedState.formState.validationResult = 'networkError';
  });
};

export const formHandler = (state, form) => {
  const watchedState = state;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    const { value } = input;
    const normalizedURL = value.trim();
    const urlArr = watchedState.formState.previousURLS;
    watchedState.formState.currentURL = normalizedURL;
    watchedState.formState.state = 'processing';

    const validationResult = validateURL(normalizedURL, urlArr);
    console.log(`VALIDATION RESULT: ${validationResult}`);
    if (validationResult === 'valid') {
      console.log('WORKS');
      loadPosts(watchedState, form);
    } else {
      watchedState.formState.validationResult = validationResult;
      watchedState.formState.state = 'finished';
    }
  });
};

export const postBtnHandler = (state) => {
  const watchedState = state;
  const { modals } = watchedState;
  const buttons = document.querySelectorAll('button[data-bs-toggle="modal"]');
  const links = document.querySelectorAll('a');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const currentBtnId = e.target.getAttribute('id');
      const currentRssId = e.target.getAttribute('rss-id');
      const clickedBtn = {
        currentBtnId,
        currentRssId,
      };

      if (!modals.watchedPosts.includes(currentBtnId)) {
        modals.watchedPosts.push(currentBtnId);
      }
      modals.clickedId = clickedBtn;
    });
  });
  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const currentBtnId = e.target.getAttribute('id');
      const currentRssId = e.target.getAttribute('rss-id');
      const clickedBtn = {
        currentBtnId,
        currentRssId,
      };

      if (!modals.watchedPosts.includes(currentBtnId)) {
        modals.watchedPosts.push(currentBtnId);
      }
      modals.clickedId = clickedBtn;
    });
  });
};

export const linkHandler = (state) => {
  const watchedState = state;
  const { modals } = watchedState;

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

export const clickedPostHandler = (state) => {
  const clickedIds = state.modals.watchedPosts;
  const links = document.querySelectorAll('a');
  links.forEach((link) => {
    const id = link.getAttribute('id');
    if (clickedIds.includes(id)) {
      link.classList.add('fw-normal');
      link.classList.remove('fw-bold');
    } else {
      link.classList.add('fw-bold');
      link.classList.remove('fw-normal');
    }
  });
};
