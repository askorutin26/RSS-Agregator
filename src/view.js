import i18next from 'i18next';
import './i18n';

const createDoc = () => {
  const createTitle = () => {
    const row = document.querySelector('div.row');
    const col = document.createElement('div');
    col.classList.add('col-md-10');
    col.classList.add('col-lg-8');
    col.classList.add('ms-auto');
    col.classList.add('text-white');

    const h1 = document.createElement('h1');
    h1.textContent = i18next.t('title');

    const p = document.createElement('p');
    p.classList.add('lead');
    p.classList.add('text-muted');
    p.textContent = i18next.t('description');

    col.append(h1);
    col.append(p);
    row.append(col);
    return row;
  };

  const createForm = () => {
    const form = document.createElement('form');
    form.classList.add('rss-form');
    form.classList.add('text-body');

    const divRow = document.createElement('div');
    divRow.classList.add('input-group');
    divRow.classList.add('mb-3');
    divRow.classList.add('row');
    const divCol = document.createElement('div');
    divCol.classList.add('col');

    const divForm = document.createElement('div');
    divForm.classList.add('form-floating');

    const input = document.createElement('input');
    input.setAttribute('id', 'url-input');
    input.setAttribute('name', 'url');
    input.setAttribute('autofocus', 'true');
    input.setAttribute('required', 'true');
    input.setAttribute('placeholder', i18next.t('placeholder'));
    input.setAttribute('aria-label', 'url');
    input.setAttribute('autocomplee', 'off');
    input.setAttribute('aria-describedly', 'button-addon');
    input.classList.add('form-control');
    input.classList.add('w-100');
    const label = document.createElement('label');
    label.setAttribute('for', 'url-input');
    label.textContent = i18next.t('placeholder');

    const createButton = () => {
      const divColAuto = document.createElement('div');
      divColAuto.classList.add('col-auto');

      const button = document.createElement('button');
      button.setAttribute('type', 'submit');
      button.setAttribute('aria-label', 'add');
      button.classList.add('h-100');
      button.classList.add('btn');
      button.classList.add('btn-lg');
      button.classList.add('btn-primary');
      button.classList.add('px-sm-5');
      button.textContent = i18next.t('addBtn');

      divColAuto.append(button);
      return divColAuto;
    };

    const button = createButton();

    divForm.append(input);
    divForm.append(label);

    divCol.append(divForm);
    divRow.append(divCol);
    divRow.append(button);
    form.append(divRow);
    return form;
  };

  const createExampleP = () => {
    const p = document.createElement('p');
    p.classList.add('mt-2');
    p.classList.add('mb-0');
    p.classList.add('text-muted');
    p.textContent = i18next.t('example');
    return p;
  };
  const title = createTitle();
  const form = createForm();
  const exampleP = createExampleP();
  const container = document.querySelector('.container-fluid');
  container.append(title);
  container.append(form);
  container.append(exampleP);
};

export default createDoc;
