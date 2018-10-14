// refactored & upgraded function

// Add ability to look for more than 2 chars
function getLastIndexOfChars(target, ...search) {
  // Return -1 instead of Error (in the original function) when target isn't a string
  if ((typeof target !== 'string') || target === '') {
    return -1;
  }

  // In the original function we can use numbers for search like "func('123', 1, 2)" (it returns 1),
  // but I think it's a bug, not a feature.
  const chars = search.filter(char => (typeof char === 'string') && char.length === 1);

  if (!chars.length) {
    return -1;
  }

  const uniqueChars = new Set(chars);

  // In the original function we look for characters up to index 0 (non-inclusive)
  // but I think it's a bug, not a feature.
  for (let i = target.length; i--;) {
    if (uniqueChars.has(target[i])) {
      return i;
    }
  }

  return -1;
}

export default getLastIndexOfChars;
