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
	constructor (facetMenuNode, listingNode) {
		this.facetMenuNode = facetMenuNode;
		this.listingNode = listingNode;

		// Set click handler for the whole menu
		facetMenuNode.addEventListener("click", () => {
			this.toggleFacet();
		})
	}

	toggleFacet (event)  {
	}
}

// class ExploreDataStructure {
//
// 	constructor(results) {
// 		this.results = results;
// 		this.filters = {
// 			resourceTypes : [],
// 			channels: [],
// 			topics: []
// 		};
// 	}
//
// 	render() {
//
// 		// counts
// 		// filtering
//
// 		let result =
// 			this.results
// 			.filter(r => this.filters.resourceTypes.contains(r.resourceType))
//
// 		let counts = {};
// 		for(const r in result) {
// 			// count all the resourceTypes
// 			// count all the topics
// 			// count all the channels
// 			count[r.resourceType] = count[] ? count[r.resourceType]++ : 1;
// 			count[r.channel] = 1;
//
//
// 		}
//
// 		this.results.count(r => r.resourceType == 'tip')
//
// 		return {
//
// 		}
//
// 	}
//
// }