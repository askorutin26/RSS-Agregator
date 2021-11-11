const colorify = (state) => {
  const input = document.querySelector('input[type="rss-link"]');
  const { valid } = state.formState;
  if (valid === false) {
    input.classList.add('is-invalid');
  } else if (Array.from(input.classList).includes('is-invalid')) {
    input.classList.remove('is-invalid');
  }
};
export default colorify;
