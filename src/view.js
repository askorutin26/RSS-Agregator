/* eslint-disable no-param-reassign */
import i18next from 'i18next';
import './i18n';

const createInput = (state) => {
  const input = document.createElement('input');
  input.setAttribute('id', 'url-input');
  input.setAttribute('name', 'url');
  input.setAttribute('required', true);
  input.setAttribute('autofocus', true);
  input.setAttribute('placeholder', i18next.t('placeholder'));
  input.setAttribute('aria-label', 'url');
  input.setAttribute('autocomplee', 'off');
  input.setAttribute('aria-describedly', 'button-addon');
  input.classList.add('form-control', 'w-100');
  input.value = state.formState.currentURL;

  switch (state.formState.validationResult) {
    case 'invalidUrl':
    case 'networkError':
    case 'parsingError':
      input.classList.add('is-invalid');
      break;
    default:
      break;
  }
  switch (state.formState.state) {
    case 'finished':
      input.value = '';
      break;
    default:
      break;
  }

  return input;
};

const createResultBlock = (state) => {
  const p = document.createElement('p');
  p.classList.add('feedback', 'm-0', 'position-absolut', 'small');
  switch (state.formState.validationResult) {
    case 'invalidURL':
      p.textContent = i18next.t('validation.invalidURL');
      p.classList.add('text-danger');
      break;
    case 'alreadyExists':
      p.textContent = i18next.t('validation.alreadyExists');
      p.classList.add('text-danger');
      break;
    case 'networkError':
      p.textContent = i18next.t('validation.networkError');
      p.classList.add('text-danger');
      break;
    case 'parsingError':
      p.textContent = i18next.t('validation.parsingError');
      p.classList.add('text-danger');
      break;
    case 'valid':
      p.textContent = i18next.t('validation.valid');
      p.classList.add('text-success');
      break;
    default:
      break;
  }
  return p;
};

const createAddBtn = (state) => {
  const button = document.createElement('button');
  switch (state.formState.state) {
    case 'processing':
      button.setAttribute('disabled', true);
      break;
    case 'finished':
      button.removeAttribute('disabled');
      break;
    default:
      throw new Error(`Cannot create add button. Unexpected state: ${state.formState.state}`);
  }
  button.setAttribute('type', 'submit');
  button.setAttribute('aria-label', 'add');
  button.classList.add('h-100', 'btn', 'btn-lg', 'btn-primary', 'px-sm-5');
  button.textContent = i18next.t('addBtn');
  return button;
};
const createLabel = () => {
  const label = document.createElement('label');
  label.setAttribute('for', 'url-input');
  label.textContent = i18next.t('placeholder');
  return label;
};

const createExampleBlock = () => {
  const p = document.createElement('p');
  p.classList.add('mt-2', 'mb-0', 'text-muted');
  p.textContent = i18next.t('example');
  return p;
};

export const renderForm = (form, state) => {
  const input = createInput(state);
  const addBtn = createAddBtn(state);
  const label = createLabel();
  const example = createExampleBlock();
  const result = createResultBlock(state);
  console.log(result);
  const divRow = document.createElement('div');
  divRow.classList.add('row');

  const divCol = document.createElement('div');
  divCol.classList.add('col');

  const divForm = document.createElement('div');
  divForm.classList.add('form-floating');

  divForm.append(input);
  divForm.append(label);
  divCol.append(divForm);

  const divColAuto = document.createElement('div');
  divColAuto.classList.add('col-auto');
  divColAuto.append(addBtn);

  divRow.append(divCol);
  divRow.append(divColAuto);
  form.innerHTML = '';
  form.append(divRow);
  form.append(example);

  form.append(result);
};

const createPostBlock = (state, rss) => {
  const divContainer = document.createElement('div');
  divContainer.classList.add('card', 'border-0');

  const divCard = document.createElement('div');
  divCard.classList.add('card-body');
  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4');
  h2.textContent = i18next.t('posts');
  divCard.append(h2);
  divContainer.append(divCard);

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  const liContainer = document.createDocumentFragment();
  const { posts, rssId } = rss;

  const liCollection = posts.map((elem) => {
    const { id, post } = elem;
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const a = document.createElement('a');
    a.setAttribute('href', post.link);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener', 'noreferrer');
    a.setAttribute('id', id);
    a.setAttribute('rss-id', rssId);
    if (state.modals.watchedPosts.includes(id)) {
      a.classList.add('fw-normal');
    } else { a.classList.add('fw-bold'); }
    a.textContent = post.title;
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.setAttribute('id', id);
    button.setAttribute('rss-id', rssId);
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.textContent = i18next.t('postBtn');
    li.append(a);
    li.append(button);
    return li;
  });
  liContainer.append(...liCollection);
  ul.append(liContainer);
  divContainer.append(ul);

  return divContainer;
};

export const renderRss = (container, state) => {
  const docFragment = document.createDocumentFragment();
  const createRss = (rss) => {
    const { rssId, feed } = rss;
    const { feedTitle, feedDescription } = feed;
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row', rssId);
    const feedContainer = document.createElement('div');
    feedContainer.classList.add('col-md-10', 'col-lg-2', 'mx-auto', 'feed');
    const postContainer = document.createElement('div');
    postContainer.classList.add('col-md-10', 'col-lg-8', 'mx-auto', 'post');
    const divCard = document.createElement('div');
    divCard.classList.add('card-border-0');
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    const cardTitle = document.createElement('h2');
    cardTitle.classList.add('cad-title', 'h4');
    cardTitle.textContent = i18next.t('feeds');
    cardBody.append(cardTitle);

    const ul = document.createElement('ul');
    ul.classList.add('list-group', 'border-0', 'rounded-0');

    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    const h3 = document.createElement('h3');

    h3.classList.add('h5', 'm-0');
    h3.textContent = feedTitle;

    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = feedDescription;
    li.append(h3);
    li.append(p);
    ul.append(li);

    divCard.append(cardBody);
    divCard.append(ul);
    const postsBlock = createPostBlock(state, rss);
    feedContainer.append(divCard);
    postContainer.append(postsBlock);
    rowDiv.append(feedContainer);
    rowDiv.append(postContainer);

    docFragment.append(rowDiv);
  };
  const { rss } = state;
  rss.forEach((rssElem) => {
    createRss(rssElem);
  });
  container.textContent = '';
  container.prepend(docFragment);
};

export const renderModal = (container, state) => {
  const { clickedId } = state.modals;
  const { currentBtnId, currentRssId } = clickedId;
  const { rss } = state;
  const currentRss = rss.filter((elem) => {
    const { rssId } = elem;
    return rssId === currentRssId;
  });
  const { posts } = currentRss[0];
  const currentPost = posts.filter((post) => {
    const { id } = post;
    return id === currentBtnId;
  });

  const { title, link, description } = currentPost[0].post;
  const header = container.querySelector('.modal-header');
  const headerTitle = header.querySelector('.modal-title');
  headerTitle.textContent = title;

  const body = container.querySelector('.modal-body');
  body.textContent = description;

  const footer = container.querySelector('.modal-footer');
  const footerLink = footer.querySelector('a.full-article');
  footerLink.setAttribute('href', link);
};

export const btnWatched = (container, id) => {
  const buttonToReRender = container.querySelector(`#${id}`);
  buttonToReRender.classList.remove('fw-bold');
  buttonToReRender.classList.add('fw-normal');
};
