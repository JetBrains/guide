/**
 * Render dummy resource cards in <template> tags.
 */
import h from "vhtml";
import fixtures from "../fixtures";
import ResourceCard from "./ResourceCard.11ty";

export const dummyThumbnailResource =
	fixtures.resourceMap.get("/tips/some-tip/");
export const dummyIconResource = fixtures.resourceMap.get(
	"/topics/some-topic/"
);

export const TemplateCards = () => (
	<div>
		<template id="thumbnailTemplate">
			{dummyThumbnailResource && (
				<ResourceCard resource={dummyThumbnailResource} />
			)}
		</template>
		<template id="iconTemplate">
			{dummyIconResource && <ResourceCard resource={dummyIconResource} />}
		</template>
	</div>
);
