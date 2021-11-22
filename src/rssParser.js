const parseRSS = (xml) => {
  const domParser = new DOMParser();
  const doc = domParser.parseFromString(xml, 'text/html');
  return doc;
};
export default parseRSS;
