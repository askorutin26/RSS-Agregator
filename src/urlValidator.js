import * as yup from 'yup';
import { setLocale } from 'yup';

const validateURL = (url, urlArr) => {
  setLocale({
    mixed: {
      notOneOf: 'alreadyExists',
    },
    string: {
      url: 'invalidURL',
    },
  });
  const schema = yup.string().url().required().notOneOf(urlArr);
  try {
    schema.validateSync(url);
  } catch (error) {
    return error.errors[0];
  }
  return 'valid';
};
export default validateURL;
