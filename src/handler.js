import validateURL from './urlValidator';

export default (state, element) => {
  const watchedState = state;
  element.addEventListener('submit', (e) => {
    e.preventDefault();

    const input = document.querySelector('input');
    const { value } = input;
    const urlArr = watchedState.formState.previousURLS;
    watchedState.formState.currentURL = value;
    const validationResult = validateURL(value, urlArr);
    if (validationResult === 'valid') {
      watchedState.formState.valid = 'valid';
      watchedState.formState.previousURLS.push(value);
    } else if (validationResult === 'this must be a valid URL') {
      watchedState.formState.error = 'urlErr';
      watchedState.formState.valid = 'invalid';
    } else {
      watchedState.formState.error = 'alreadyExists';
      watchedState.formState.valid = 'invalid';
    }
  });
};
