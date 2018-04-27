import {
  parseQuery,
  parseUrl,
} from './utils';

const removeUnderscores = url => url.replace(/______/g, '.');

const parseJump = (url) => {
  const {
    hostname,
    search,
  } = parseUrl(url);

  if (hostname !== 'www.viidii.info') {
    return null;
  }

  const simple = /^\?https?:\/\//.test(search);

  if (simple) {
    return removeUnderscores(search.slice(1));
  }

  const query = parseQuery(search.slice(1));

  return query.url;
};

export default parseJump;
