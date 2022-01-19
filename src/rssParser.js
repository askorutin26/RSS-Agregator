const parseRSS = (xml) => {
  const domParser = new DOMParser();
  const doc = domParser.parseFromString(xml, 'application/xml');
  const error = doc.querySelector('parsererror');
  if (error) {
    const newError = new Error(error.textContent);
    newError.isParsingError = true;
    throw newError;
  }
  const titleElem = doc.querySelector('title');
  const rssTitle = titleElem.textContent;
  const descriptionElem = doc.querySelector('description');
  const description = descriptionElem.textContent;

  const posts = Array.from(doc.querySelectorAll('item'));

  const postElems = posts.map((post) => {
    const postTitle = post.querySelector('title').textContent;
    const postLink = post.querySelector('link').textContent;
    const postDescription = post.querySelector('description').textContent;
    return {
      title: postTitle,
      link: postLink,
      description: postDescription,
    };
  });

  return {
    rssTitle,
    description,
    postElems,
  };
};
export default parseRSS;
