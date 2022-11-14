//防抖
const throttle = (callback, time) => {
  let times = null;
  return function (...args) {
    clearTimeout(times);
    times = setTimeout(() => {
      callback.call(this, args);
      times = null;
    }, time);
  };
};

export { throttle };
