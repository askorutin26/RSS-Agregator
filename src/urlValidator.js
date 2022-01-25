import * as yup from 'yup';

function validateURL(normalizedUrl, state) {
  const existingUrls = state.feeds.map(({ url }) => url);
  const schema = yup.string().url().required().notOneOf(existingUrls);
  return schema.validate(normalizedUrl);
}
export default validateURL;
