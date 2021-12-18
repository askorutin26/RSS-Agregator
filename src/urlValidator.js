import * as yup from 'yup';

const parseError = (errorMessage) => {
  if (errorMessage === 'this must be a valid URL') {
    return 'invalidURL';
  } return 'alreadyExists';
};

const validateURL = (url, urlArr) => {
  const schema = yup.string().url().required().notOneOf(urlArr);
  const normalizedURL = url.trim();
  try {
    schema.validateSync(normalizedURL);
  } catch (error) {
    console.log(parseError(error.message));
    return parseError(error.message);
  }
  console.log('valid');
  return 'valid';
};
export default validateURL;
