const searchButton = document.getElementById("search");
const searchDropdown = document.getElementById("search-dropdown");
const searchInput = document.getElementById("searchbox-input");
const searchResults = document.getElementById("search-results");
let lunrIndex;
let documents;

searchButton.addEventListener("click", async () => {
  if (documents === undefined) {
    const response = await fetch("/lunr_index.json");
    const json = await response.json();
    documents = json.results;

    // load lunar search index
    lunrIndex = lunr(function () {
      this.ref("url");
      this.field("title");
      this.field("subtitle");

      documents.forEach(function (doc, index) {
        this.add(doc);
      }, this);
    });
  }

  if (searchDropdown) {
    searchDropdown.classList.toggle("is-active");
    if (searchDropdown.classList.contains("is-active")) {
      searchInput.focus();
    }
  }
});

searchInput.addEventListener("focusout", () => {
  //searchDropdown.classList.remove("is-active");
});

searchInput.addEventListener("keyup", (evt) => {
  let query = searchInput.value;
  let results = findSearchResults(query);
  searchResults.innerHTML = "";
  searchResults.innerHTML = results;
});

function findSearchResults(query) {
  const limit = 10;
  let results = lunrIndex.search(query).map(function (result) {
    return documents.find(function (page) {
      return page.url === result.ref;
    });
  });

  console.log(results);

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
