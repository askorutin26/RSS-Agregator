import _ from 'lodash';
import validateURL from './urlValidator';
import makeQueryForRss from './ajax.js';
import parseRSS from './rssParser';

const loadPosts = (state) => {
  const watchedState = state;
  watchedState.formState.state = 'loading';
  const url = watchedState.formState.currentURL;
  makeQueryForRss(url).then((response) => {
    try {
      const rssData = parseRSS(response.data.contents);
      console.log(rssData);
      const feedTitle = rssData.title;
      const feedDescription = rssData.description;
      const feedPosts = rssData.postElems;
      const feed = {
        id: _.uniqueId('feed_'),
        feedTitle,
        feedDescription,
        url,
      };
      const articles = feedPosts.map((post) => ({
        postId: _.uniqueId('post_'),
        ...post,
      }));
      const rss = {
        feedID: feed.id,
        url,
        articles,
      };
      watchedState.feeds.unshift(feed);
      watchedState.posts.unshift(rss);
      watchedState.formState.previousURLS.push(url);
      watchedState.formState.state = 'finished';
    } catch (error) {
      console.log(error.message);
      watchedState.formState.error = 'parsingError';
      watchedState.formState.state = 'error';
    }
  }).catch(() => {
    watchedState.formState.error = 'networkError';
    watchedState.formState.state = 'error';
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
    watchedState.formState.state = 'filling';
    watchedState.formState.error = '';
    validateURL(normalizedURL, urlArr).then(() => {
      loadPosts(watchedState, form);
    }).catch((error) => {
      watchedState.formState.error = error.message;
      watchedState.formState.state = 'error';
    });
  });
};

export const clickedPostHandler = (state) => {
  const clickedIds = state.modals.watchedPosts;
  const links = document.querySelectorAll('a');
  links.forEach((link) => {
    const id = link.getAttribute('id');
    if (clickedIds.has(id)) {
      link.classList.add('fw-normal');
      link.classList.remove('fw-bold');
    } else {
      link.classList.add('fw-bold');
      link.classList.remove('fw-normal');
    }
  });
};

export const postHandler = (state, container) => {
  const watchedState = state;
  const { modals } = watchedState;
  container.addEventListener('click', (e) => {
    const postId = e.target.dataset.id;
    modals.watchedPosts.add(postId);
    const link = document.querySelector(`a[data-id="${postId}"]`);
    link.classList.add('fw-normal');
    link.classList.remove('fw-bold');
    modals.clickedId = postId;
  });
};
