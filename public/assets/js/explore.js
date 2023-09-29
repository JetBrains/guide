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
		this.flag = 0;

		// Set click handler for the whole menu
		facetMenuNode.addEventListener("click", () => {
			this.toggleFacet();
		})
	}

	toggleFacet (event)  {
		this.flag = 9;
	}
}
