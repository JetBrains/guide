import h from "vhtml";
import { describe, beforeEach, expect, test } from "vitest";
import { screen } from "@testing-library/dom";

// @ts-ignore
import { renderCards, ExploreViewModel } from "./explore";
import ResourceCard from "../../../_includes/resourcecard/ResourceCard.11ty";
import fixtures from "../../../_includes/fixtures";

describe("Faceted Browse", () => {
	const firstTip = fixtures.resources[0];
	const resourceCard = <ResourceCard resource={firstTip} />;
	let facetMenuNode: any, listingNode: any;
	beforeEach(() => {
		// Make a ResourceCard string with dummy data
		document.body.innerHTML = <body>
		<div id="facetMenu">
			<div data-facet-group="channel">
				<a id="q7" href="#" class="" data-facet-key="python">Python (<span>10</span>)</a>
			</div>
		</div>
		<div id="listing"></div>
		<template id="resourceCard">
			${resourceCard}
		</template>
		</body>
		;
		facetMenuNode = document.getElementById("facetMenu");
		listingNode = document.getElementById("listing");
	});

	test("construct view model", () => {
		const vm = new ExploreViewModel(facetMenuNode, listingNode);
		expect(vm.flag).to.equal(0);
		const target = screen.getByRole("link");
		target.click();
		expect(vm.flag).to.equal(9);
		target.toggle("selected");
	});

	// test("attach to page", () => {
	//
	// 	const jsonResources = fixtures.resources.map(resource => {
	// 		return {
	// 			title: resource.title
	// 		};
	// 	});
	// 	renderCards(document, jsonResources);
	// 	const resourceCards = screen.getAllByRole("link", { name: "Resource" });
	// 	expect(resourceCards.length).to.equal(jsonResources.length);
	// 	expect(resourceCards[0].textContent).to.equal(jsonResources[0].title);
	// 	expect(resourceCards[21].textContent).to.equal(jsonResources[21].title);
	// });

	// test("khalid crazy pseudocode (Jan is going to hate this)", () => {
	//
	// 	// step 0. modify lunr.json [x]
	// 	// step 1. import lunr.json [ ]
	// 	// step 2. enhance the json object with functionality
	// 	// step 3. use this model in the UI
	//
	// 	const data = {
	// 		filter: {
	// 			topics: [""],
	// 			resourceTypes: [""],
	// 			channels: [""]
	// 		},
	// 		results: [],
	// 		filtered : () => {
	// 			return {
	// 				resources : [], // order by date
	// 				totalCount: 0,
	// 				counts: {
	// 					"key" : 0
	// 					// ...
	// 				}
	// 			}
	// 		}
	// 	};
	//
	// 	data.filter.topics.push('click');
	// 	data.filtered(); // used for rendering
	//
	// });

	/*
	- Load the initial set of facets with correct counts
	- Handle a click
	  * Adjust the facet selection
	  * Update the counts
	  * Redraw the results
	*  */


});
