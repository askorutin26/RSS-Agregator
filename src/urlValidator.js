import * as yup from 'yup';

const validateURL = () => {
  const schema = yup.string.url();
  const form = document.querySelector('form.rss');
  form.addEventListener('change', (e) => {
    e.preventDefault();
    console.log('abobas');
  });
};
export default validateURL;
