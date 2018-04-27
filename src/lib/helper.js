import parseJump from './parse-jump';

export const isAllowLink = (url, allowLinks) => {
  const jump = parseJump(url);
  if (!jump) {
    return true;
  }
  for (let i = 0; i < allowLinks.length; ++i) {
    const allowLink = allowLinks[i];
    if (
      jump.indexOf(allowLink) !== -1
    ) {
      return true;
    }
  }

  return false;
};

export const hide = (el) => {
  // eslint-disable-next-line no-param-reassign
  el.style.display = 'none';
};

export const findContainer = (el) => {
  let curr = el;
  while (curr.parentNode.childNodes.length === 1) {
    curr = curr.parentNode;
  }
  return curr;
};

export const shouldHideBr = (br) => {
  const {
    nextSibling,
  } = br;

  if (nextSibling && nextSibling.tagName) {
    if (nextSibling.tagName.toLowerCase() === 'br') {
      return true;
    }

    if (nextSibling.style.display === 'none') {
      return true;
    }
  }

  return false;
};

export const wrapImage = (img, link) => {
  const el = document.createElement('a');
  el.href = link;
  el.referrerPolicy = 'no-referrer';
  el.target = '_blank';

  const {
    parentNode,
    nextSibling,
  } = img;

  el.appendChild(img);

  parentNode.insertBefore(el, nextSibling);
};
