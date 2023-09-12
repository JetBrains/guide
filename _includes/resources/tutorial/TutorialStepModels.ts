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

	// resolve(allCollections: AllCollections): void {
	//   super.resolve(allCollections);
	//   if (!this.parentTutorial) {
	//     throw new Error(
	//       `Tutorial Step ${this.url} has no assigned parentTutorial`
	//     );
	//   }
	// }
}

export async function getTutorialStep(
	data: TutorialStepFrontmatter,
	page: EleventyPage
): Promise<TutorialStep> {
	validateFrontmatter(TutorialStepFrontmatter, data, page.url);
	const tutorialStep = new TutorialStep({ data, page });
	return tutorialStep;
}
