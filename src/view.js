/* eslint-disable no-param-reassign */
import i18next from 'i18next';
import './i18n';

const createInput = (state) => {
  const input = document.createElement('input');
  input.setAttribute('id', 'url-input');
  input.setAttribute('name', 'url');
  if (state.valid === 'invalid') {
    input.setAttribute('autofocus', 'false');
  } else { input.setAttribute('autofocus', 'true'); }
  input.setAttribute('required', 'true');
  input.setAttribute('placeholder', i18next.t('placeholder'));
  input.setAttribute('aria-label', 'url');
  input.setAttribute('autocomplee', 'off');
  input.setAttribute('aria-describedly', 'button-addon');
  input.classList.add('form-control', 'w-100');
  input.value = state.currentURL;
  if (state.validationError.length !== 0) {
    input.classList.add('is-invalid');
  }
  if (state.state === 'finished') {
    input.value = '';
    input.setAttribute('autofocus', 'true');
  }

  return input;
};

const createResultBlock = (state) => {
  const p = document.createElement('p');
  p.classList.add('feedback', 'm-0', 'position-absolut', 'small');
  if (state.valid === 'invalid') {
    p.classList.add('text-danger');
    p.textContent = i18next.t(`validation.${state.validationError}`);
  } else if (state.state === 'finished') {
    p.classList.add('text-success');
    p.textContent = i18next.t(`validation.${state.valid}`);
  } else if (state.networkError.length !== 0) {
    p.classList.add('text-danger');
    p.textContent = i18next.t('validation.networkError');
  }
  return p;
};

const createAddBtn = () => {
  const button = document.createElement('button');
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
  const addBtn = createAddBtn();
  const label = createLabel();
  const example = createExampleBlock();
  const result = createResultBlock(state);
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

export const renderFeedBlock = (container, state) => {
  const divContainer = document.createElement('div');
  divContainer.classList.add('card-border-0');

  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card-body');
  const h2 = document.createElement('h2');
  h2.classList.add('card-title', 'h4');
  h2.textContent = i18next.t('feeds');
  cardDiv.append(h2);
  divContainer.append(cardDiv);

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  const li = document.createElement('li');
  li.classList.add('list-group-item', 'border-0', 'border-end-0');
  const h3 = document.createElement('h3');
  h3.classList.add('h6', 'm-0');
  h3.textContent = state.feedTitle;
  const p = document.createElement('p');
  p.classList.add('m-0', 'small', 'text-black-50');
  p.textContent = state.feedDescription;
  li.append(h3);
  li.append(p);
  ul.append(li);
  divContainer.append(ul);
  container.textContent = '';
  container.append(divContainer);
};

export const renderPostBlock = (container, state) => {
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
  const { posts } = state;
  const liCollection = posts.map((elem) => {
    const { post, id } = elem;
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const a = document.createElement('a');
    a.setAttribute('href', post.link);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener', 'noreferrer');
    a.setAttribute('id', id);
    a.classList.add('fw-bold');
    a.textContent = post.title;

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.setAttribute('id', id);
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.textContent = i18next.t('postBtn');
    li.append(a);
    li.append(button);
    return li;
  });
  liContainer.append(...liCollection);
  ul.append(liContainer);
  divContainer.append(ul);
  container.textContent = '';
  container.append(divContainer);
};

export const renderModal = (container, postId, posts) => {
  const { currentId } = postId;

  const currentPost = posts.filter((elem) => {
    const { id } = elem;
    if (id === currentId) {
      return true;
    } return false;
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
