import colorify from './render.js';
import validateURL from './urlValidator.js';

const state = {
  formState: {
    currentUrl: '',
    urls: [],

  },
};

const form = document.querySelector('form.rss');
const input = document.querySelector('input[type = "rss-link"]');
input.focus();
const fn = () => {
  input.addEventListener('change', (e) => {
    e.preventDefault();
    state.formState.state = 'filling';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(state);
    state.formState.state = 'finished';
    state.formState.currentUrl = input.value;
    const valid = validateURL(state);
    if (valid === true) {
      state.formState.urls.push(input.value);
      form.reset();
      input.focus();
    }
    state.formState.valid = valid;
    colorify(state);
    console.log(state);
  });
};
export default fn;
