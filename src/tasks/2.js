function deepClone(obj, hash = new WeakMap()) {
  if (Object(obj) !== obj || obj instanceof Function) {
    return obj;
  }

  if (hash.has(obj)) {
    return hash.get(obj);
  }

  let result;

  try {
    result = new obj.constructor();
  } catch (e) {
    result = Object.create(Object.getPrototypeOf(obj));
  }

  if (obj instanceof Map) {
    Array.from(
      obj,
      ([key, val]) =>
        result.set(deepClone(key, hash), deepClone(val, hash)),
    );
  } else if (obj instanceof Set) {
    Array.from(obj, key => result.add(deepClone(key, hash)));
  } else if (obj instanceof Date) {
    result.setTime(obj.getTime());
  }

  hash.set(obj, result);

  return Object.assign(
    result,
    ...Object.keys(obj).map(key => ({ [key]: deepClone(obj[key], hash) })),
  );
}

function deepCopy(obj) {
  return deepClone(obj);
}

export default deepCopy;
