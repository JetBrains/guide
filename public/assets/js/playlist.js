const playlistItemToggles = document.querySelectorAll(".playlist-item-toggle");
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
      updateVisiblePlaylistItem(el);
    });

    if (el.href.endsWith(thisAnchor)) {
      updateVisiblePlaylistItem(el);
    }
  });
}

function updateVisiblePlaylistItem(el) {
  const listItem = el.parentElement;
  playlistItems.forEach((playlistItem) => {
    playlistItem.style.display = "none";
    if (el.href.endsWith(playlistItem.id)) {
      // Toggle the currently-displayed resource on left
      playlistItem.style.display = "";
    }
  });
  listItem.classList.add("is-active");
  document.body.scrollTop = 0;
}

function resetPlaylistItemToggles() {
  playlistItemToggles.forEach(function (el) {
    const listItem = el.parentElement;
    listItem.classList.remove("is-active");
  });
}
