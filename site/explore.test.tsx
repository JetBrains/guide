import h from "vhtml";
import { beforeEach, describe, expect, test } from "vitest";
import { screen } from "@testing-library/dom";

// @ts-ignore
import { ExploreViewModel, renderCards } from "../public/assets/js/evm";
import ResourceCard from "../_includes/resourcecard/ResourceCard.11ty";
import fixtures from "../_includes/fixtures";

const firstTip = fixtures.resources[0];
const resourceCard = <ResourceCard resource={firstTip} />;
const lunrResources = fixtures.resources.map((resource) => {
	return {
		title: resource.title,
		channel: "anotherchannel",
		topics: ["topicx", "topicy", "topicz"],
	};
});

describe("Faceted Browse", () => {
	let cardTemplate, facetMenuNode, listingNode, evm: ExploreViewModel;

	// Set some facets
	lunrResources[0].channel = "python";
	lunrResources[1].channel = "python";
	lunrResources[0].topics = ["topic100", "topic200"];
	lunrResources[2].channel = "django";

	beforeEach(() => {
		// Make a ResourceCard string with dummy data
		document.body.innerHTML = (
			<body>
				<div id="facetMenu">
					<div data-facet-group="channels">
						<a href="#" data-facet-value="go">
							Go
						</a>
						<a href="#" data-facet-value="java">
							Java
						</a>
						<a href="#" data-facet-value="python">
							Python
						</a>
						<a href="#" data-facet-value="databases">
							Databases
						</a>
						<a href="#" data-facet-value="django">
							Django
						</a>
						<a href="#" data-facet-value="testing">
							Testing
						</a>
					</div>
					<div data-facet-group="topics">
						<a href="#" data-facet-value="topic100">
							Topic 100
						</a>
						<a href="#" data-facet-value="topic200">
							Topic 200
						</a>
						<a href="#" data-facet-value="topic300">
							Topic 300
						</a>
					</div>
				</div>
				<div id="listing"></div>
				<template id="cardTemplate">${resourceCard}</template>
			</body>
		);
		cardTemplate = document.getElementById("cardTemplate");
		facetMenuNode = document.getElementById("facetMenu");
		listingNode = document.getElementById("listing");
		evm = new ExploreViewModel(
			cardTemplate,
			facetMenuNode,
			listingNode,
			lunrResources
		);
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
		expect(facets.channels.length).to.equal(0);
		// Mark all as selected
		evm.facetMenuNode
			.querySelectorAll("a")
			.forEach((a: HTMLElement) => a.classList.add("selected"));
		facets = evm.getSelectedFacets();
		expect(facets.channels.length).to.equal(6);
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
			channels: ["python"],
			topics: [],
		};
		const filteredResources = evm.filterResources(selectedFacets);
		expect(filteredResources.length).to.equal(2);
	});

	test("filter two facet groups, one facet", () => {
		const selectedFacets = {
			channels: ["python"],
			topics: ["topic100"],
		};
		const filteredResources = evm.filterResources(selectedFacets);
		expect(filteredResources.length).to.equal(1);
	});

	test("filter once community, one eco, one topic", () => {
		const selectedFacets = {
			channels: ["python"],
			topics: ["topic100"],
		};
		const filteredResources = evm.filterResources(selectedFacets);
		expect(filteredResources.length).to.equal(1);
	});
});

test("throw exceptions if facets not found", () => {
	document.body.innerHTML = (
		<body>
			<div id="facetMenu">
				<div data-facet-group="xxx">
					<a href="#" data-facet-value="go">
						Go
					</a>
				</div>
				<div data-facet-group="yyy">
					<a href="#" data-facet-value="databases">
						Databases
					</a>
				</div>
				<div data-facet-group="zzz">
					<a href="#" data-facet-value="topic100">
						Topic 100
					</a>
				</div>
			</div>
			<div id="listing"></div>
			<template id="cardTemplate">${resourceCard}</template>
		</body>
	);
	const cardTemplate = document.getElementById("cardTemplate");
	const facetMenuNode = document.getElementById("facetMenu");
	const listingNode = document.getElementById("listing");
	expect(
		() =>
			new ExploreViewModel(
				cardTemplate,
				facetMenuNode,
				listingNode,
				lunrResources
			)
	).toThrowError(`Missing facet group "channels"`);
});
