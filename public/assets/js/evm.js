export class ExploreViewModel {

	constructor(templateNode, facetMenuNode, listingNode, lunrResources, latestContent, noResults) {
		this.templateNode = templateNode;
		this.facetMenuNode = facetMenuNode;
		this.listingNode = listingNode;
		this.lunrResources = lunrResources;
		this.latestContent = latestContent;
		this.noResults = noResults;


		// Set click handler for the whole menu
		this.facetMenuNode.addEventListener("change", (evt) => {
			this.handleSelection(evt);
		});

	}

	getSelectedFacets() {
		const facetGroups = this.facetMenuNode.querySelectorAll("[data-facet-group]");
		const results = {
			channels: [],
			topics: [],
			resources: []
		};
		let facetGroupKey, selections;
		let resultCounts = 0;
		facetGroups.forEach(fg => {
			facetGroupKey = fg.dataset.facetGroup;
			// Get the selected items
			selections = fg.querySelectorAll("input:checked");
			results[facetGroupKey] = Array.from(selections).map(input => input.value);
			resultCounts += results[facetGroupKey].length;
		});
		return resultCounts > 0 ? results : null;
	}

	handleSelection(event) {
		// Turn off the 3 boxes, then turn on the used one.
		this.listingNode.style.display = "none";
		this.latestContent.style.display = "none";
		this.noResults.style.display = "none";

		// Get the currently-selected facets
		const selectedFacets = this.getSelectedFacets();
		if (selectedFacets == null) {
			// No facets selected, restore the default listing
			this.latestContent.style.display = "";
			return;
		}

		// Filter the list of resources
		const selectedResources = this.filterResources(selectedFacets);
		if (selectedResources.length > 0) {
			this.listingNode.style.display = "";
			// Re-render
			this.renderCards(selectedResources);
			return;
		}

		// We have selected facets, but there were no results. Show
		// the no results box.
		this.noResults.style.display = "";
	}

	filterResources(selectedFacets) {
		const { channels, resources, topics } = selectedFacets;

		return this.lunrResources.filter(resource => {
			if (channels.length && !channels.includes(resource.channel)) {
				return false;
			}
			if (resources.length && !resources.includes(resource.resourceType)) {
				return false;
			}
			if (topics.length) {
				// Get intersection of selected topics and this resource's
				// topics array. If there is any overlap, it's true.
				return topics.filter(topic => resource.topics?.includes(topic)).length > 0;
			}

			return true;
		});
	}

	renderCards(filteredResources) {
		let clone, thisField;
		let results = [];
		this.listingNode.replaceChildren();
		filteredResources.forEach(resource => {
			clone = this.templateNode.content.cloneNode(true);
			// const mergeNodes = clone.querySelectorAll("*");
			const merges = [...clone.querySelectorAll("*")]
				.map(t => [...t.attributes])
				.reduce((curr, value) => curr.concat(value))
				.filter(({ name }) => name.startsWith("data-template"))
				.map(attr => {
					return {
						operation: attr.name.split("data-template")[1].slice(1),
						value: attr.value,
						node: attr.ownerElement
					};
				});
			merges.forEach(merge => {
				const { operation, value, node } = merge;
				if (operation === "") {
					// Special case, no "suffix", means change the text content
					node.textContent = resource[value];
				} else {
					node.setAttribute(operation, resource[value]);
				}
			});
			this.listingNode.appendChild(clone);
		});
	}
}

// We are in a browser, not in a test. Go get the lunr JSON, and wire up the class.
if (!window.happyDOM) {
	const templateNode = document.querySelector("#cardTemplate");
	const facetNode = document.querySelector("#facetMenu");
	const listingNode = document.querySelector("#listing");
	const latestContent = document.querySelector("#latest-content");
	const noResults = document.querySelector("#listing-no-results");
	const jsonURL = new URL("/lunr.json", import.meta.url).href;
	fetch(jsonURL).then(response => {
		const jsonResources = response.json();
		jsonResources.then(rj => {
			new ExploreViewModel(templateNode, facetNode, listingNode, rj.results, latestContent, noResults);
		});
	});
}
