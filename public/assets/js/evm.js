export class ExploreViewModel {

	constructor(templateNode, facetMenuNode, listingNode, lunrResources) {
		this.templateNode = templateNode;
		this.facetMenuNode = facetMenuNode;
		this.listingNode = listingNode;
		this.lunrResources = lunrResources;

		// Some checks to ensure the markup matches the contract
		if (!facetMenuNode.querySelector(`div[data-facet-group="channels"]`)) {
			throw new Error(`Missing facet group "channels"`);
		}
		if (!facetMenuNode.querySelector(`div[data-facet-group="topics"]`)) {
			throw new Error(`Missing facet group "topics"`);
		}
		if (!facetMenuNode.querySelector(`div[data-facet-group="resources"]`)) {
			throw new Error(`Missing facet group "resources"`);
		}

		// Set click handler for the whole menu
		this.facetMenuNode.addEventListener("click", (evt) => {
			this.handleClick(evt);
		});

	}

	getSelectedFacets() {
		const facetGroups = this.facetMenuNode.querySelectorAll("div[data-facet-group]");
		const results = {
			channels: [],
			topics: [],
			resources: []
		};
		let facetGroupKey, selections;
		facetGroups.forEach(fg => {
			facetGroupKey = fg.dataset.facetGroup;
			// Get the selected items
			selections = fg.querySelectorAll("a.is-active");
			results[facetGroupKey] = Array.from(selections).map(a => a.dataset.facetValue);
		});
		return results;
	}

	handleClick(event) {
		event.preventDefault();
		const target = event.target;
		if (target.classList.contains("is-active")) {
			target.classList.remove("is-active");
		} else {
			target.classList.add("is-active");
		}

		// Get the currently-selected facets
		const selectedFacets = this.getSelectedFacets();

		// Filter the list of resources
		const selectedResources = this.filterResources(selectedFacets);

		// Re-render
		this.renderCards(selectedResources);
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
				return topics.filter(topic => resource.topics.includes(topic)).length > 0;
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
					if (operation === "src") {
						console.log(operation, value, resource[value])
					}
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
	const jsonURL = new URL("/lunr.json", import.meta.url).href;
	fetch(jsonURL).then(response => {
		const jsonResources = response.json();
		jsonResources.then(rj => {
			new ExploreViewModel(templateNode, facetNode, listingNode, rj.results);
		});
	});
}

// TODO
// Standardize a resource card to avoid whackiness e.g. glow
// Figure out logo thumbnail for Channel models (logo -> thumbnail)

