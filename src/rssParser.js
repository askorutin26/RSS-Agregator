const parseRSS = (xml) => {
  const domParser = new DOMParser();
  const doc = domParser.parseFromString(xml, 'application/xml');
  const error = doc.querySelector('parseerror');
  console.log(error);
  console.log(doc);

  const titleElem = doc.querySelector('title');
  const title = titleElem.textContent;
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
    title,
    description,
    postElems,
  };
};
export default parseRSS;
