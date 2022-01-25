import _ from 'lodash';
import validateURL from './urlValidator';
import makeQueryForRss from './ajax.js';
import parseRSS from './rssParser';
import getErrName from './utils';

const loadPosts = (state) => {
  const watchedState = state;
  watchedState.formState.state = 'loading';
  const url = watchedState.formState.currentURL;
  return makeQueryForRss(url).then((response) => {
    const rssData = parseRSS(response.data.contents);
    const { rssTitle: feedTitle, description: feedDescription, postElems: feedPosts } = rssData;
    const feed = {
      id: _.uniqueId('feed_'),
      title: feedTitle,
      feedDescription,
      url,
    };
    const articles = feedPosts.map((post) => ({
      feedID: feed.id,
      feedTitle: feed.title,
      url,
      postId: _.uniqueId('post_'),
      ...post,
    }));
    watchedState.feeds.unshift(feed);
    watchedState.posts.unshift(...articles);
    watchedState.formState.state = 'finished';
  });
};

export const formHandler = (state, form) => {
  const watchedState = state;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    const { value } = input;
    const normalizedURL = value.trim();
    watchedState.formState.currentURL = normalizedURL;
    watchedState.formState.error = '';
    // eslint-disable-next-line arrow-body-style
    validateURL(normalizedURL, watchedState).then(() => {
      return loadPosts(watchedState, form);
    }).catch((err) => {
      const error = getErrName(err);
      watchedState.formState.error = error;
      watchedState.formState.state = 'error';
    });
  });
};

export const postHandler = (state, container) => {
  const watchedState = state;
  const { modals } = watchedState;
  container.addEventListener('click', (e) => {
    const postId = e.target.dataset.id;
    if (postId !== undefined) {
      modals.watchedPosts.add(postId);
      const link = document.querySelector(`a[data-id="${postId}"]`);
      link.classList.add('fw-normal');
      link.classList.remove('fw-bold');
      modals.clickedId = postId;
    }
  });
};
