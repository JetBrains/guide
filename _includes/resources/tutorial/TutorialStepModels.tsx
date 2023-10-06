import { Static, Type } from "@sinclair/typebox";
import { validateFrontmatter } from "../../../src/validators";
import {
	getThumbnailPath,
	Resource,
	ResourceFrontmatter,
} from "../../../src/ResourceModels";
import { EleventyPage } from "../../../src/models";
import { Tutorial } from "./TutorialModels";
import { ThumbnailField, VideoBottomField, VideoField } from "../commonModels";
import { TUTORIAL_STEP_RESOURCE_TYPE } from "../../../src/resourceType";
import h from "vhtml";

export const TutorialStepFrontmatter = Type.Intersect([
	ResourceFrontmatter,
	ThumbnailField,
	VideoBottomField,
	VideoField,
]);
export type TutorialStepFrontmatter = Static<typeof TutorialStepFrontmatter>;

export class TutorialStep
	extends Resource<TUTORIAL_STEP_RESOURCE_TYPE>
	implements TutorialStepFrontmatter
{
	thumbnail: TutorialStepFrontmatter["thumbnail"];
	video: TutorialStepFrontmatter["video"];
	parentTutorial?: Tutorial;
	videoBottom: boolean;
	static frontmatterSchema = TutorialStepFrontmatter;

	constructor({
		data,
		page,
	}: {
		data: TutorialStepFrontmatter;
		page: EleventyPage;
	}) {
		super({ data, page });
		this.video = data.video;
		this.videoBottom = !!data.videoBottom;
		this.thumbnail = getThumbnailPath(data.thumbnail, page.url);
	}

	getThumbnail(): string {
		return (
			<img
				data-template-src="thumbnail"
				data-template-alt="title"
				src={this.thumbnail}
				alt={this.title}
			/>
		);
	}
}

export async function getTutorialStep(
	data: TutorialStepFrontmatter,
	page: EleventyPage
): Promise<TutorialStep> {
	validateFrontmatter(TutorialStepFrontmatter, data, page.url);
	const tutorialStep = new TutorialStep({ data, page });
	return tutorialStep;
}
