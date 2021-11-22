const parseRSS = (xml) => {
  const domParser = new DOMParser();
  const doc = domParser.parseFromString(xml, 'text/html');

  const title = doc.querySelector('title').textContent;
  const description = doc.querySelector('description').textContent;

  const posts = Array.from(doc.querySelectorAll('item'));

  const postElems = posts.map((post) => {
    const postTitle = post.textContent;
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
