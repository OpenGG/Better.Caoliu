import {
  imgRules,
} from '../config';

import {
  hasOwnProperty,
  parseUrl,
} from './utils';

const getImageRect = url =>
  new Promise((resolve) => {
    const img = new Image();
    img.onerror = () =>
      resolve([0, 0]);

    img.onload = () =>
      resolve([img.naturalWidth, img.naturalHeight]);

    img.src = url;
  });

const detectImgUrl = (url) => {
  const {
    hostname,
  } = parseUrl(url);

  const matches = hostname.match(/[^.]+\.[^.]+$/);

  if (!matches) {
    return null;
  }

  const top = matches[0];

  if (!hasOwnProperty(imgRules, top)) {
    return null;
  }

  const [find, replacement] = imgRules[top];
  const transformed = url.replace(find, replacement);
  const jpeg = transformed.replace('.jpg', '.jpeg');

  const promises = [getImageRect(transformed)];

  promises.push(
    jpeg !== transformed ?
      getImageRect(jpeg) :
      [0, 0]
  );

  const limit = 200 * 200;

  return Promise.all(
    promises
  ).then(([[w, h], [wJ, hJ]]) => {
    const size = w * h;
    const sizeJ = wJ * hJ;
    if (sizeJ > size && sizeJ > limit) {
      return jpeg;
    } else if (size > limit) {
      return transformed;
    }
    return null;
  });
};

export default detectImgUrl;
