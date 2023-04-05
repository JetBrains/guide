import Plyr from "plyr";

const onVisible = function (element, callback) {
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

const videos = Array.from(document.querySelectorAll(".video-player"));
videos.forEach((video) => {
  onVisible(video, (entry, observer) => {
    if (entry.intersectionRatio > 0) {
      const start = parseInt(entry.target.dataset.plyrStart);
      const end = parseInt(entry.target.dataset.plyrEnd);
      const hasStart = !isNaN(start);
      const hasEnd = !isNaN(end);

      let config = {};

      if (hasStart && hasEnd) {
        config.markers = {
          enabled: true,
          points: [
            { time: start, label: "start of clip" },
            { time: end, label: "end of clip" },
          ],
        };
      }

      const plyr = new Plyr(entry.target, config);

      plyr.on("playing", () => {
        if (hasStart && plyr.currentTime < start) {
          plyr.currentTime = start;
        }
      });

      plyr.on("timeupdate", () => {
        if (hasEnd && plyr.currentTime >= end) {
          plyr.currentTime = hasStart ? start : 0;
          plyr.stop();
        }
      });

      observer.unobserve(entry.target);
    }
  });
});
