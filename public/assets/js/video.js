import Plyr from "plyr";

const videos = Array.from(document.querySelectorAll(".video-player")).map(
  (p) => new Plyr(p)
);
