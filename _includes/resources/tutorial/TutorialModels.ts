import { Static, Type } from "@sinclair/typebox";
import {
	getThumbnailPath,
	Resource,
	ResourceFrontmatter,
	ResourceMap,
} from "../../../src/ResourceModels";
import { TUTORIAL_RESOURCE_TYPE } from "../../../src/resourceType";
import { EleventyPage } from "../../../src/models";
import { TutorialStep } from "./TutorialStepModels";
import { ThumbnailField, VideoBottomField } from "../commonModels";
import { join } from "path";

export const TutorialFrontmatter = Type.Intersect([
	ResourceFrontmatter,
	ThumbnailField,
	VideoBottomField,
	Type.Object({
		tutorialItems: Type.Array(
			Type.String({
				description: "Tutorial step(s) that are part of this tutorial",
			})
		),
	}),
]);
export type TutorialFrontmatter = Static<typeof TutorialFrontmatter>;

export class Tutorial
	extends Resource<TUTORIAL_RESOURCE_TYPE>
	implements TutorialFrontmatter
{
	thumbnail: TutorialFrontmatter["thumbnail"];
	tutorialItems: string[];
	tutorialSteps: TutorialStep[];
	videoBottom: boolean;
	static frontmatterSchema = TutorialFrontmatter;

	constructor({
		data,
		page,
	}: {
		data: TutorialFrontmatter;
		page: EleventyPage;
	}) {
		super({ data, page });
		this.tutorialItems = data.tutorialItems;
		this.tutorialSteps = [];
		this.videoBottom = !!data.videoBottom;
		this.thumbnail = getThumbnailPath(data.thumbnail, page.url);
	}

	resolve(allResources: ResourceMap) {
		super.resolve(allResources);

		// then call this
		this.tutorialItems.forEach((ti) => {
			const url = resolveChildPath(this.url, ti);
			const tutorialStep = allResources.get(url) as TutorialStep;
			if (tutorialStep) {
				tutorialStep.parentTutorial = this;
				this.tutorialSteps.push(tutorialStep);
			} else {
				throw new Error(`Tutorial step ${url} not found in ${this.url}`);
			}
		});
	}

	getThumbnail(): string {
		return this.thumbnail;
	}
}

export function resolveChildPath(
	pathPrefix: string,
	tutorialItem: string
): string {
	let result = join(pathPrefix, tutorialItem);
	return !result.endsWith("/") ? result.concat("/") : result;
}
