export function renderCards(document, jsonResources) {
	// Define the fields to merge
	const FIELDS = ["title"];

	const template = document.querySelector("#resourceCard");
	const target = document.querySelector("#output");
	let clone, thisField;
	jsonResources.forEach(resource => {
		clone = template.content.cloneNode(true);
		FIELDS.forEach(field => {
			thisField = clone.querySelector(`[data-template="${field}"]`);
			thisField.textContent = resource.title;
		});
		target.appendChild(clone);
	});
}

export class ExploreViewModel {
	// Define the fields to merge
	mergeFields = ["title"];

	constructor(templateNode, facetMenuNode, listingNode, lunrResources) {
		this.templateNode = templateNode;
		this.facetMenuNode = facetMenuNode;
		this.listingNode = listingNode;
		this.lunrResources = lunrResources;

		// Set click handler for the whole menu
		this.facetMenuNode.addEventListener("click", (evt) => {
			this.handleClick(evt);
		});
	}

	getSelectedFacets() {
		const facetGroups = this.facetMenuNode.querySelectorAll("div[data-facet-group]");
		const results = {
			communities: [],
			ecosystems: [],
			topics: [],
		};
		let facetGroupKey, selections;
		facetGroups.forEach(fg => {
			facetGroupKey = fg.dataset["facet-group"];
			// Get the selected items
			selections = fg.querySelectorAll("a.selected");
			results[facetGroupKey] = selections.map(a => a.dataset["facet-value"]);
		})
		return results;
	}

	handleClick(event) {
		event.preventDefault()
		const target = event.target;
		if (target.classList.contains("selected")) {
			target.classList.remove("selected");
		} else {
			target.classList.add("selected");
		}

		// Get the currently-selected facets
		const selectedFacets = this.getSelectedFacets();

		// Filter the list of resources
		const selectedResources = this.filterResources(selectedFacets);

		// Re-render
		this.renderCards(selectedResources);
	}

	filterResources(selectedFacets) {
		const { communities, ecosystems, topics } = selectedFacets;

		// Communities and ecosystems are both kinds of channels. Union
		// these two piles of selections to allow "or"
		const channels = [...communities, ...ecosystems];
		return this.lunrResources.filter(resource => {
			if (channels.length && !channels.includes(resource.channel)) {
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
		filteredResources.forEach(resource => {
			clone = this.templateNode.content.cloneNode(true);
			this.mergeFields.forEach(field => {
				thisField = clone.querySelector(`[data-template="${field}"]`);
				thisField.textContent = resource.title;
			});
			this.listingNode.appendChild(clone);
		});
	}
}
