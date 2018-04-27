const parseOnClick = (img, onClick) => {
  if (!/^window\.open\(/.test(onClick)) {
    return null;
  }

  const matches = onClick.match(/https?:\/\/[^'"]+/);

  if (!matches) {
    return null;
  }

  return matches[0];
};

export default parseOnClick;
