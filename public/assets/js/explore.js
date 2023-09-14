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
