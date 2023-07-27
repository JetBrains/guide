import Plyr from "plyr";
import { onVisible } from "./utils.js";

const videos = Array.from(document.querySelectorAll(".video-player"));
videos.forEach((video) => {
  onVisible(video, (entry, observer) => {
    if (entry.intersectionRatio > 0) {

      const start = parseInt(entry.target.dataset.start);
      const end = parseInt(entry.target.dataset.end);
      const hasStart = !isNaN(start);
      const hasEnd = !isNaN(end);
      let lastSeekingTimeStamp = -1

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

      plyr.on("ready", () => {
        if (hasStart) {
          plyr.currentTime = start;
        }
      });

      plyr.on("timeupdate", () => {
        if (plyr.currentTime >= end && !hasSkipped())
          plyr.stop();
      });

      plyr.on("seeked", event => {
        lastSeekingTimeStamp = event.detail.plyr.currentTime;
      })

      const hasSkipped = () => {
        return hasStart && hasEnd && lastSeekingTimeStamp >= 0 && (lastSeekingTimeStamp < start || lastSeekingTimeStamp > end)
      }

      observer.unobserve(entry.target);
    }
  });
});
