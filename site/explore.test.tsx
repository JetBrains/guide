import { beforeEach, describe, expect, test } from "vitest";
import { screen } from "@testing-library/dom";

// @ts-ignore
import { ExploreViewModel, renderCards } from "../public/assets/js/evm";
import fixtures, { baseRenderData } from "../_includes/fixtures";
import { ChannelHomepageData } from "../_includes/resources/channel/ChannelModels";

// @ts-ignore
import ExplorePage from "./explore.11ty";
import { HTMLInputElement } from "happy-dom";
import { Resource } from "../src/ResourceModels";
import { renderToString } from "jsx-async-runtime";

const lunrResources = fixtures.resources.map((resource) => {
	return {
		title: resource.title,
		channel: "anotherchannel",
		resourceType: resource.resourceType,
		topics: ["topicx", "topicy", "topicz"],
	};
});
lunrResources[0].channel = "python";
lunrResources[1].channel = "python";
lunrResources[0].topics = ["topic100", "topic200"];
lunrResources[2].channel = "django";

let cardTemplate,
	facetMenuNode,
	listingNode,
	latestContent,
	noResults,
	evm: ExploreViewModel;

describe("Faceted Browse", () => {
	const channelItem = fixtures.channelItems[0];
	const pageLayoutData: ChannelHomepageData = {
		...baseRenderData,
		...channelItem.data,
		page: channelItem.page,
	};

	const rm = fixtures.resourceMap;
	const context = {
		...fixtures.context,
		getResource: () => rm.get("/tips/some-tip/") as Resource,
	};

	let explorePage: ExplorePage;

	beforeEach(async () => {
		explorePage = new ExplorePage();
		document.body.innerHTML = await renderToString(
			explorePage.render.call(context, pageLayoutData),
		);
		cardTemplate = document.getElementById("cardTemplate");
		facetMenuNode = document.getElementById("facetMenu");
		listingNode = document.getElementById("listing");
		latestContent = document.getElementById("latest-content");
		noResults = document.getElementById("listing-no-results");
		evm = new ExploreViewModel(
			cardTemplate,
			facetMenuNode,
			listingNode,
			lunrResources,
			latestContent,
			noResults,
		);
	});

	test("construct view model", () => {
		expect(evm.templateNode).toBeTruthy();
		expect(evm.facetMenuNode).toBeTruthy();
		expect(evm.listingNode).toBeTruthy();
		expect(evm.latestContent).toBeTruthy();
		expect(evm.noResults).toBeTruthy();
		expect(evm.lunrResources.length).to.equal(lunrResources.length);
	});

	test("clicking a menu item toggles it", () => {
		// @ts-ignore
		const target = screen.getAllByRole("checkbox")[0] as HTMLInputElement;
		expect(target.checked).not.to.be.true;
		target.click();
		expect(target.checked).to.be.true;
		target.click();
		expect(target.checked).not.to.be.true;
	});

	test("get initial checked facets", () => {
		let facets = evm.getSelectedFacets();
		expect(facets).to.be.null;
		// Mark all as checked
		evm.facetMenuNode
			.querySelectorAll("input")
			.forEach((input: HTMLInputElement) => (input.checked = true));
		facets = evm.getSelectedFacets();
		expect(facets.channels.length).to.be.greaterThan(2);
	});

	test("render initial json resources", () => {
		evm.renderCards(lunrResources);
		const resourceCards = screen
			.getAllByRole("link")
			.filter((it) => it.className.indexOf("title") >= 0);
		expect(resourceCards.length).to.equal(lunrResources.length);
		expect(resourceCards[0].textContent).to.equal(lunrResources[0].title);
		expect(resourceCards[21].textContent).to.equal(lunrResources[21].title);
	});

	test("filter one facet group, one facet", () => {
		const selectedFacets = {
			channels: ["python"],
			topics: [],
			resources: [],
		};
		const filteredResources = evm.filterResources(selectedFacets);
		expect(filteredResources.length).to.equal(2);
	});

	test("filter two facet groups, one facet", () => {
		const selectedFacets = {
			channels: ["python"],
			topics: ["topic100"],
			resources: ["tip"],
		};
		const filteredResources = evm.filterResources(selectedFacets);
		expect(filteredResources.length).to.equal(1);
	});

	test("filter once channel, one topic, one resource", () => {
		const selectedFacets = {
			channels: ["python"],
			topics: ["topic100"],
			resources: ["tip"],
		};
		const filteredResources = evm.filterResources(selectedFacets);
		expect(filteredResources.length).to.equal(1);
	});

	test("Test full explore template", () => {
		expect(screen.getByTitle("Channels Group")).toBeTruthy();
		expect(screen.getByTitle("Resources Group")).toBeTruthy();

		cardTemplate = document.getElementById("cardTemplate");
		facetMenuNode = document.getElementById("facetMenu");
		listingNode = document.getElementById("listing");
		evm = new ExploreViewModel(
			cardTemplate,
			facetMenuNode,
			listingNode,
			lunrResources,
		);

		// Click something, see if it is selected
		if (facetMenuNode) {
			const target = facetMenuNode.querySelectorAll("a[data-facet-value]")[0];
			if (target) {
				// @ts-ignore
				target.click();
				expect(target.classList.contains("is-active")).to.be.true;
				// @ts-ignore
				target.click();
				expect(target.classList.contains("is-active")).not.to.be.true;
			}
		}
	});
});
