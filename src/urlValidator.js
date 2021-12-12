import * as yup from 'yup';

const validateURL = (url, urlArr) => {
  const schema = yup.string().url().required().notOneOf(urlArr);
  try {
    schema.validateSync(url);
  } catch (error) {
    return error.message;
  }
  return 'valid';
};
export default validateURL;
