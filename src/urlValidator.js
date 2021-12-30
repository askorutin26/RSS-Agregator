import * as yup from 'yup';

const validateURL = (url, urlArr) => {
  const schema = yup.string().url().required().notOneOf(urlArr);
  return schema.validate(url);
};
export default validateURL;
