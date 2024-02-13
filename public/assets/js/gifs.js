import Freezeframe from "freezeframe";
import { onVisible } from "./utils.js";

const gifs = Array.from(document.querySelectorAll(".animated-gif"));

gifs.forEach((gif) => {
  onVisible(gif, (entry, observer) => {
    if (entry.intersectionRatio > 0) {
      new Freezeframe({
        selector: gif,
        trigger: "click",
        overlay: true,
        responsive: true,
        warnings: true,
      });
      // stop creating gifs
      observer.unobserve(entry.target);
    }
  });
});
