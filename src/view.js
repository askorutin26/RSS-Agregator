/* eslint-disable no-param-reassign */
import i18next from 'i18next';

const createInput = (state) => {
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
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

  if (state.formState.state === 'error') {
    input.classList.add('is-invalid');
  }
  switch (state.formState.state) {
    case 'loading':
      input.setAttribute('readonly', true);
      break;
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

  if (state.formState.state === 'error') {
    p.textContent = i18next.t(`validation.${state.formState.error}`);
    p.classList.add('text-danger');
  } else {
    p.textContent = i18next.t(`validation.${state.formState.state}`);
    p.classList.add('text-success');
  }

  return p;
};

const createAddBtn = (state) => {
  const button = document.createElement('button');
  switch (state.formState.state) {
    case 'loading':
      button.setAttribute('disabled', true);
      break;
    case 'finished':
      button.removeAttribute('disabled');
      break;
    default:
      break;
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

export const renderPostBlock = (state) => {
  const { posts } = state;

  // eslint-disable-next-line array-callback-return
  posts.map((elem) => {
    const { feedID, articles } = elem;
    const postContainer = document.createElement('div');
    postContainer.classList.add('col-md-10', 'col-lg-8', 'mx-auto', 'post');

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

    const liCollection = articles.map(({ postId, title, link }) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      const a = document.createElement('a');
      a.setAttribute('href', link);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener', 'noreferrer');
      a.setAttribute('id', postId);
      a.setAttribute('feed-id', feedID);
      a.setAttribute('data-id', postId);
      if (state.modals.watchedPosts.has(postId)) {
        a.classList.add('fw-normal');
      } else { a.classList.add('fw-bold'); }
      a.textContent = title;
      const button = document.createElement('button');
      button.setAttribute('type', 'button');
      button.setAttribute('data-bs-toggle', 'modal');
      button.setAttribute('data-bs-target', '#modal');
      button.setAttribute('data-id', postId);
      button.setAttribute('id', postId);
      button.setAttribute('feed-id', feedID);
      button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      button.textContent = i18next.t('postBtn');
      li.append(a);
      li.append(button);
      return li;
    });

    ul.append(...liCollection);
    divContainer.append(ul);
    postContainer.append(divContainer);
    const rssContainer = document.querySelector(`div.${feedID}`);
    rssContainer.append(postContainer);
  });
};

export const renderFeed = (container, state) => {
  const { feeds } = state;
  container.textContent = '';
  // eslint-disable-next-line array-callback-return
  feeds.map(({ id, feedTitle, feedDescription }) => {
    const feedContainer = document.createElement('div');
    feedContainer.classList.add('col-md-10', 'col-lg-2', 'mx-auto', 'feed');
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row', id);
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
    feedContainer.append(divCard);
    rowDiv.prepend(feedContainer);

    container.append(rowDiv);
  });
};

export const renderModal = (container, state) => {
  const { clickedId } = state.modals;
  const { posts } = state;
  console.log(posts);
  console.log(clickedId);

  const rss = posts.find(({ articles }) => articles.find(({ postId }) => postId === clickedId));
  console.log(rss);
  const currentPost = rss.articles.find(({ postId }) => postId === clickedId);

  const { title, link, description } = currentPost;
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
