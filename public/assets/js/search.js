import lunr from "lunr";

const searchButton = document.getElementById("search");
const searchDropdown = document.getElementById("search-dropdown");
const searchInput = document.getElementById("searchbox-input");
const searchResults = document.getElementById("search-results");
let lunrIndex;
let documents;

if (searchButton) {
  document.addEventListener("click", function (event) {
    // If user clicks inside the element, do nothing
    if (event.target.closest(`#${searchDropdown.id}`)) return;
    // If user clicks outside the element, hide it!
    searchDropdown.classList.remove("is-active");
  });

  let shiftKeyPressed = false;
  let focusedResultIndex = -1;
  document.addEventListener("keydown", async (e) => {
    // Handle Escape
    if (e.key === 'Escape' && searchDropdown) {
      searchDropdown.classList.remove("is-active");
    }

    // Handle double-shift
    if (e.key === 'Shift' && !searchDropdown.classList.contains("is-active")) {
      if (shiftKeyPressed) {
        searchButton.dispatchEvent(new CustomEvent('click'));
        searchButton.scrollIntoView();
        shiftKeyPressed = false;
      } else {
        shiftKeyPressed = true;
        setTimeout(() => shiftKeyPressed = false, 400);
      }
    }

    // Select item with down/up key
    if (searchDropdown.classList.contains("is-active") && searchResults) {
      const resultElements = searchResults.getElementsByTagName("a");
      if (e.keyCode === 40 && resultElements.length > 0 && focusedResultIndex < resultElements.length - 1) { // down
        resultElements[++focusedResultIndex].focus();
        resultElements[focusedResultIndex].classList.add('has-background-info-light');
        if (focusedResultIndex > 0) {
          resultElements[focusedResultIndex - 1].classList.remove('has-background-info-light');
        }
        e.preventDefault();
      } else if (e.keyCode === 38 && resultElements.length > 0 && focusedResultIndex >= 0) { // up
        if (focusedResultIndex <= 0) {
          resultElements[0].classList.remove('has-background-info-light');
          searchResults.getElementsByTagName("div")[0].scrollIntoView();

          searchInput.focus();
          searchInput.select();
          focusedResultIndex = -1;

          // move caret to end
          if (searchInput.setSelectionRange) {
            setTimeout(() => searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length), 50);
          }
        } else {
          resultElements[--focusedResultIndex].focus();
          resultElements[focusedResultIndex].classList.add('has-background-info-light');
          if (focusedResultIndex < resultElements.length - 1) {
            resultElements[focusedResultIndex + 1].classList.remove('has-background-info-light');
          }
        }

        e.preventDefault();
      }
    }
  });

  searchButton.addEventListener("click", async () => {
    if (searchDropdown) {
      searchDropdown.classList.toggle("is-active");
      if (searchDropdown.classList.contains("is-active")) {
        searchInput.focus();
        focusedResultIndex = -1;
      }
    }

    if (documents === undefined) {
      const jsonUrl = new URL("/lunr.json", import.meta.url).href;
      const response = await fetch(jsonUrl);
      const json = await response.json();
      documents = json.results;

      console.log("Loaded " + documents.length + " document(s).");

      // load lunr search index
      lunrIndex = lunr(function () {
        this.ref("url");
        this.field("title");
        this.field("subtitle");

        documents.forEach(function (doc) {
          this.add(doc);
        }, this);
      });
    }
  });
}

if (searchInput) {
  searchInput.addEventListener("keyup", (evt) => {
    let query = searchInput.value;
    searchResults.innerHTML = "";

    if (query !== '') {
      searchResults.innerHTML = findSearchResults(query);
    }
  });
}

function findSearchResults(query) {
  const limit = 250;
  let results = lunrIndex.search(query).map(function (result) {
    return documents.find(function (page) {
      return page.url === result.ref;
    });
  });

  if (results.length === 0 && query.indexOf("*") < 0) {
    return findSearchResults(query + "*");
  }

  const description =
    results.length === 0
      ? "<p>No results have been found</p>"
      : `<p>Showing ${Math.min(limit, results.length)} results</p>
    `;

  const list = results.slice(0, limit).map((result) => {
    return `
    <a class="panel-block is-active" href="${result.url}">
      <div class="has-text-left">
        <b>${result.title}</b><br/>
        <small class="is-small">${result.subtitle}</small>
      </div>
    </a>`;
  });

  return `<div class="panel-block">${description}</div>\n${list.join("")}`;
}

if (!Element.prototype.matches)
  Element.prototype.matches = Element.prototype.msMatchesSelector;
if (!Element.prototype.closest)
  Element.prototype.closest = function (selector) {
    let el = this;
    while (el) {
      if (el.matches(selector)) {
        return el;
      }
      el = el.parentElement;
    }
  };
