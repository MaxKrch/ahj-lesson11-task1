const croppingText = (text, length, ending) => {
  if (text.length <= length) {
    return text;
  }

  if (ending?.length) {
    length = length - ending.length;
  }

  const newText = text.slice(0, length);

  if (ending) {
    return `${newText}${ending}`;
  }

  return newText;
};

export { croppingText };
