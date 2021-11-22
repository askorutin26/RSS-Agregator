/* eslint-disable no-param-reassign */
import i18next from 'i18next';
import './i18n';

const createTitle = () => {
  const title = document.createElement('h1');
  title.classList.add('display-3', 'mb-0');
  title.textContent = i18next.t('title');

  const description = document.createElement('p');
  description.classList.add('lead');
  description.textContent = i18next.t('description');

  const elements = [title, description];
  return elements;
};
const createInput = (state) => {
  const input = document.createElement('input');
  input.setAttribute('id', 'url-input');
  input.setAttribute('name', 'url');
  input.setAttribute('autofocus', 'true');
  input.setAttribute('required', 'true');
  input.setAttribute('placeholder', i18next.t('placeholder'));
  input.setAttribute('aria-label', 'url');
  input.setAttribute('autocomplee', 'off');
  input.setAttribute('aria-describedly', 'button-addon');
  input.classList.add('form-control', 'w-100');
  input.value = state.currentURL;
  if (state.error.length !== 0) {
    input.classList.add('is-invalid');
  }

  return input;
};

const createResultBlock = (state) => {
  const p = document.createElement('p');
  p.classList.add('feedback', 'm-0', 'position-absolut', 'small');
  if (state.valid === 'invalid') {
    p.classList.add('text-danger');
    p.textContent = i18next.t(`validation.${state.error}`);
  } else if (state.valid === 'valid') {
    p.classList.add('text-success');
    p.textContent = i18next.t(`validation.${state.valid}`);
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

export const renderForm = (container, state) => {
  const input = createInput(state);
  const addBtn = createAddBtn();
  const label = createLabel();
  const example = createExampleBlock();
  const result = createResultBlock(state);
  const [title, description] = createTitle();

  const form = document.createElement('form');
  form.classList.add('rss-form', 'text-body');

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
  form.append(divRow);
  container.innerHTML = '';
  container.append(title);
  container.append(description);
  container.append(form);
  container.append(example);
  container.append(result);
};

export const renderFeedBlock = (container, document) => {
  const divContainer = document.createElement('div');
  divContainer.classList.add('card-border-0');

  const cardDiv = document.createElement('div');
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
  h3.classList.add('h-6', 'm-0');
  const p = document.createElement('p');
  p.classList.add('m-0', 'small', 'text-black-50');
  p.textContent = document.title;
  li.append(h3);
  li.append(p);
  ul.append(li);
  divContainer.append(ul);
  container.textContent = '';
  container.append(divContainer);
};
