import h from "vhtml";
import { describe, beforeEach, expect, test } from "vitest";
import { screen } from "@testing-library/dom";

// @ts-ignore
import { renderCards } from "./explore";
import ResourceCard from "../../../_includes/resourcecard/ResourceCard.11ty";
import fixtures from "../../../_includes/fixtures";

describe("Faceted Browse", () => {
	const firstTip = fixtures.resources[0];
	const resourceCard = <ResourceCard resource={firstTip} />;

	beforeEach(() => {
		// Make a ResourceCard string with dummy data
		document.body.innerHTML = `
<body>
    <div id="output"></div>
    <template id="resourceCard">
	    ${resourceCard}    
		</template>
</body>
`;
	});

	test("attach to page", () => {

		const jsonResources = fixtures.resources.map(resource => {
			return {
				title: resource.title
			};
		});
		renderCards(document, jsonResources);
		const resourceCards = screen.getAllByRole("link", { name: "Resource" });
		expect(resourceCards.length).to.equal(jsonResources.length);
		expect(resourceCards[0].textContent).to.equal(jsonResources[0].title);
		expect(resourceCards[21].textContent).to.equal(jsonResources[21].title);
	});

});
