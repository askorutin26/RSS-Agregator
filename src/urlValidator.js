import * as yup from 'yup';

const validateURL = (url, urlArr) => {
  const schema = yup.string().url().required().notOneOf(urlArr);
  try { schema.validateSync(url); } catch (err) {
    return err.message;
  }
  return 'valid';
};
export default validateURL;
