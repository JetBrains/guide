export const onVisible = function (element, callback) {
  const options = {
    root: document,
  };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      callback(entry, observer);
    });
  }, options);
  observer.observe(element);
};
