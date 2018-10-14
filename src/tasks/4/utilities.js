function debounce(func, ms) {
  let timer = null;

  return function (...args) {
    const onComplete = () => {
      func.apply(this, args);
      timer = null;
    };

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(onComplete, ms);
  };
}

function isFunction(variable) {
  return (typeof variable === 'function');
}

export {
  debounce,
  isFunction,
};
