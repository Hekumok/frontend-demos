// refactored (only) function (without any new functional)

function getLastIndexOfChars(target, char1, char2) {
  if (typeof target !== 'string') {
    throw new TypeError('First argument must be a string');
  }

  if (target === '') {
    return -1;
  }

  const chars = [char1, char2]
    .filter(char => ['string', 'number'].includes(typeof char) && char.toString().length === 1)
    .map(char => char.toString());

  if (!chars.length) {
    return -1;
  }

  const result = Math.max(...chars.map(char => target.lastIndexOf(char)));

  return result || -1;
}

export default getLastIndexOfChars;
