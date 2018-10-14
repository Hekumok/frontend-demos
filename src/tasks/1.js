function checkBraces(target) {
  if (typeof target !== 'string') {
    return 1;
  }

  const stack = [];

  const matching = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
  };

  const rightBraces = Object.values(matching);

  for (const char of target) {
    if (char in matching) {
      stack.push(char);
    } else if (rightBraces.includes(char)) {
      if (matching[stack.pop()] !== char) {
        return 1;
      }
    }
  }

  return stack.length ? 1 : 0;
}

export default checkBraces;
