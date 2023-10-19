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

  searchButton.addEventListener("click", async () => {
    if (searchDropdown) {
      searchDropdown.classList.toggle("is-active");
      if (searchDropdown.classList.contains("is-active")) {
        searchInput.focus();
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

        documents.forEach(function (doc, index) {
          this.add(doc);
        }, this);
      });
    }
  });
}

if (searchInput) {
  searchInput.addEventListener("keyup", (evt) => {
    let query = searchInput.value;

    if (evt.key === "Escape") {
      searchDropdown.classList.remove("is-active");
      return;
    }

    let results = findSearchResults(query);
    searchResults.innerHTML = "";
    searchResults.innerHTML = results;
  });
}

function findSearchResults(query) {
  const limit = 10;
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
      : `<p>Showing ${Math.min(limit, results.length)} of ${
          results.length
        } results</p>
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
