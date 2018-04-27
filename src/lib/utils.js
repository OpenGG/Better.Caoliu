const toArray = input => Array.prototype.slice.call(input);

export const querySelectorAll = selector =>
  toArray(document.querySelectorAll(selector));

export const addCSS = (text) => {
  const el = document.createElement('style');
  el.textContent = text;
  document.body.appendChild(el);
};

export const parseQuery = (query) => {
  const ret = Object.create(null);
  query.split('&').forEach((part) => {
    const pair = part.split('=');
    const decodedKey = decodeURIComponent(pair[0]);
    ret[decodedKey] =
      pair.length > 1 ?
        decodeURIComponent(pair[1]) :
        '';
  });
  return ret;
};

let tmp = null;

export const parseUrl = (url) => {
  if (!tmp) {
    tmp = document.createElement('a');
  }

  tmp.href = url;

  return tmp;
};

const hasOwnPropertyInternal = Object.prototype.hasOwnProperty;

export const hasOwnProperty = (obj, key) =>
  hasOwnPropertyInternal.call(obj, key);

const isReady = () => {
  const {
    readyState,
  } = document;

  return readyState === 'interactive' ||
    readyState === 'complete';
};

export const ready = (fn) => {
  if (isReady()) {
    fn();
  } else {
    let called = false;
    const listener = () => {
      if (called) {
        return;
      }
      if (isReady()) {
        called = true;
        document.removeEventListener('readystatechange', listener, false);
        fn();
      }
    };
    document.addEventListener('readystatechange', listener, false);
  }
};
