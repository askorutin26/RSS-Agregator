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
  return schema.validate(url);
};
export default validateURL;
