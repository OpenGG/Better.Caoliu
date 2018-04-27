import {
  querySelectorAll,
  ready,
} from './lib/utils';

import {
  isAllowLink,
  hide,
  findContainer,
  shouldHideBr,
  wrapImage,
} from './lib/helper';

import parseJump from './lib/parse-jump';
import parseOnClick from './lib/parse-onclick';

import {
  allowLinks,
} from './config';

import detectImgUrl from './lib/detect-img-url';

const init = () => {
// hide non-allow links
  querySelectorAll('.tpc_content a')
    .forEach((a) => {
      const attr = a.getAttribute('onclick');
      if (attr && attr.indexOf('iframe')) {
        hide(a);
        return;
      }

      const allow = a.querySelector('img') ||
      isAllowLink(a.href, allowLinks);

      if (!allow) {
        const container = findContainer(a);
        hide(container);
      } else {
      // do nothing
      }
    });

  // hide gif images
  querySelectorAll('.tpc_content iframe')
    .forEach(hide);

  // hide gif images
  querySelectorAll('.tpc_content img')
    .forEach((image) => {
      const isGif = image.src.indexOf('.gif') !== -1;
      if (isGif) {
        hide(image);
      }
    });

  // hide unnecessary <br>
  querySelectorAll('.tpc_content br')
    .forEach((br) => {
      if (shouldHideBr(br)) {
        hide(br);
      }
    });

  // rewrite img
  querySelectorAll('.tpc_content img')
    .forEach((img) => {
      const url = parseOnClick(img, img.getAttribute('onclick'));

      if (img.style.display === 'none') {
        return;
      }

      if (!url) {
        return;
      }

      img.removeAttribute('onclick');

      // eslint-disable-next-line no-param-reassign
      img.onclick = null;

      wrapImage(img, url);
    });

  // rewrite links
  querySelectorAll('.tpc_content a')
    .forEach((a) => {
    // eslint-disable-next-line no-param-reassign
      a.referrerPolicy = 'no-referrer';

      const url = parseJump(a.href);

      if (url) {
      // eslint-disable-next-line no-param-reassign
        a.href = url;
      }
    });

  querySelectorAll('.tpc_content a>img')
    .forEach(img =>
      Promise.resolve(
        detectImgUrl(img.src)
      ).then((url) => {
        if (url) {
        // eslint-disable-next-line no-param-reassign
          img.parentNode.href = url;
        }
      })
    );
};

ready(init);
