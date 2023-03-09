const playlistItemToggles = document.querySelectorAll(".playlist-item-toggle");
const playlistItems = document.querySelectorAll(".playlist-item");

if (playlistItemToggles.length > 0) {
  // Look at URL to see which item in the playlist has the
  // anchor we want to display.
  const thisAnchor = window.location.hash
    ? window.location.hash
    : playlistItemToggles[0].href;
  playlistItemToggles.forEach(function (el) {
    const span = el.querySelector(".steps-marker");
    el.addEventListener("click", function (e) {
      e.preventDefault();
      history.replaceState({}, "", el.href);
      resetPlaylistItemToggles();
      span.classList.add("is-info");
      playlistItems.forEach((playlistItem) => {
        playlistItem.style.display = "none";
        if (el.href.endsWith(playlistItem.id)) {
          // Toggle the currently-displayed resource on left
          playlistItem.style.display = "";
        }
      });
      document.body.scrollTop = 0;
    });
    if (el.href.endsWith(thisAnchor)) {
      // el.click();
      span.classList.add("is-info");
      playlistItems.forEach((playlistItem) => {
        playlistItem.style.display = "none";
        if (el.href.endsWith(playlistItem.id)) {
          // Toggle the currently-displayed resource on left
          playlistItem.style.display = "";
        }
      });
      document.body.scrollTop = 0;
    }
  });
}

function resetPlaylistItemToggles() {
  playlistItemToggles.forEach(function (el) {
    const span = el.querySelector(".steps-marker");
    span.classList.remove("is-info");
  });
}

const navbarBurger = document.getElementById("navbarBurger");
const navMenuIndex = document.getElementById("navMenuIndex");
navbarBurger.addEventListener("click", ({ currentTarget }) => {
  if (navMenuIndex) {
    currentTarget.classList.toggle("is-active");
    navMenuIndex.classList.toggle("is-active");
  }
});
