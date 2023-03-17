import Plyr from "plyr";

const onVisible = function (element, callback) {
  const  options = {
    root: document,
  };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      callback(entry, observer);
    });
  }, options);
  observer.observe(element);
};

const videos = Array.from(document.querySelectorAll(".video-player"));
videos.forEach((video) => {
  onVisible(video, (entry, observer) => {
    if (entry.intersectionRatio > 0) {
      new Plyr(entry.target);
      observer.unobserve(entry.target);
    }
  });
});
