const playlistItemToggles = document.querySelectorAll(".playlist-toggles a");
const playlistItems = document.querySelectorAll(".playlist-item");

if (playlistItemToggles.length > 0) {
  // Look at URL to see which item in the playlist has the
  // anchor we want to display.
  const thisAnchor = window.location.hash
    ? window.location.hash
    : playlistItemToggles[0].href;
  playlistItemToggles.forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      history.replaceState({}, "", el.href);
      resetPlaylistItemToggles();
      el.classList.add("is-active");
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
      el.classList.add("is-active");
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
    el.classList.remove("is-active");
  });
}
