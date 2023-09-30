import h from "vhtml";
import { beforeEach, describe, expect, test } from "vitest";
import { screen } from "@testing-library/dom";

// @ts-ignore
import { ExploreViewModel, renderCards } from "./explore";
import ResourceCard from "../../../_includes/resourcecard/ResourceCard.11ty";
import fixtures from "../../../_includes/fixtures";

describe("Faceted Browse", () => {
	const firstTip = fixtures.resources[0];
	const resourceCard = <ResourceCard resource={firstTip} />;
	let cardTemplate, facetMenuNode, listingNode, evm: ExploreViewModel;
	const lunrResources = fixtures.resources.map(resource => {
		return {
			title: resource.title,
			channel: "anotherchannel",
			topics: ["topicx", "topicy", "topicz"]
		};
	});

	// Set some facets
	lunrResources[0].channel = "python";
	lunrResources[1].channel = "python";
	lunrResources[0].topics = ["topic100", "topic200"];
	lunrResources[2].channel = "django";

	beforeEach(() => {
		// Make a ResourceCard string with dummy data
		document.body.innerHTML = (<body>
		<div id="facetMenu">
			<div data-facet-group="ecosystems">
				<a href="#" data-facet-value="go">Go</a>
				<a href="#" data-facet-value="java">Java</a>
				<a href="#" data-facet-value="python">Python</a>
			</div>
			<div data-facet-group="communities">
				<a href="#" data-facet-value="databases">Databases</a>
				<a href="#" data-facet-value="django">Django</a>
				<a href="#" data-facet-value="testing">Testing</a>
			</div>
			<div data-facet-group="topics">
				<a href="#" data-facet-value="topic100">Topic 100</a>
				<a href="#" data-facet-value="topic200">Topic 200</a>
				<a href="#" data-facet-value="topic300">Topic 300</a>
			</div>
		</div>
		<div id="listing"></div>
		<template id="cardTemplate">
			${resourceCard}
		</template>
		</body>)
		;
		cardTemplate = document.getElementById("cardTemplate");
		facetMenuNode = document.getElementById("facetMenu");
		listingNode = document.getElementById("listing");
		evm = new ExploreViewModel(cardTemplate, facetMenuNode, listingNode, lunrResources);
	});

	test("construct view model", () => {
		expect(evm.templateNode).to.exist;
		expect(evm.facetMenuNode).to.exist;
		expect(evm.listingNode).to.exist;
		expect(evm.lunrResources.length).to.equal(lunrResources.length);
	});

	test("clicking a menu item toggles it", () => {
		const target = screen.getAllByRole("link")[0];
		target.click();
		expect(target.classList.contains("selected")).to.be.true;
		target.click();
		expect(target.classList.contains("selected")).not.to.be.true;
	});

	test("get initial selected facets", () => {
		let facets = evm.getSelectedFacets();
		expect(facets.ecosystems.length).to.equal(0);
		expect(facets.communities.length).to.equal(0);
		// Mark all as selected
		evm.facetMenuNode.querySelectorAll("a").forEach((a: HTMLElement) => a.classList.add("selected"));
		facets = evm.getSelectedFacets();
		expect(facets.ecosystems.length).to.equal(3);
		expect(facets.communities.length).to.equal(3);
	});

	test("render initial json resources", () => {
		evm.renderCards(lunrResources);
		const resourceCards = screen.getAllByRole("link", { name: "Resource" });
		expect(resourceCards.length).to.equal(lunrResources.length);
		expect(resourceCards[0].textContent).to.equal(lunrResources[0].title);
		expect(resourceCards[21].textContent).to.equal(lunrResources[21].title);
	});

	test("filter one facet group, one facet", () => {
		const selectedFacets = {
			communities: [],
			ecosystems: ["python"],
			topics: []
		};
		const filteredResources = evm.filterResources(selectedFacets);
		expect(filteredResources.length).to.equal(2);
	});

	test("filter two facet groups, one facet", () => {
		const selectedFacets = {
			communities: [],
			ecosystems: ["python"],
			topics: ["topic100"]
		};
		const filteredResources = evm.filterResources(selectedFacets);
		expect(filteredResources.length).to.equal(1);
	});

	test("filter once community, one eco, one topic", () => {
		const selectedFacets = {
			communities: ["django"],
			ecosystems: ["python"],
			topics: ["topic100"]
		};
		const filteredResources = evm.filterResources(selectedFacets);
		expect(filteredResources.length).to.equal(1);
	});

});
