import * as yup from 'yup';

const validateURL = (state) => {
  const urlArr = state.formState.urls;
  const url = state.formState.currentUrl;
  const schema = yup.string().url().required().notOneOf(urlArr);
  const valid = schema.isValidSync(url);
  return valid;
};
export default validateURL;
