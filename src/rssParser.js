const parseRSS = (xml) => {
  const domParser = new DOMParser();
  const doc = domParser.parseFromString(xml, 'text/htm');
  return doc;
};
export default parseRSS;
