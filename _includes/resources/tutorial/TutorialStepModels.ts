import { Static, Type } from "@sinclair/typebox";
import { validateFrontmatter } from "../../../src/validators";
import { Resource, ResourceFrontmatter } from "../../../src/ResourceModels";
import { EleventyPage } from "../../../src/models";
import { Tutorial } from "./TutorialModels";

export const TutorialStepFrontmatter = Type.Intersect([
  ResourceFrontmatter,
  Type.Object({
    videoBottom: Type.Optional(Type.Boolean({ description: "True if video should be rendered at the bottom; false otherwise" })),
    longVideo: Type.Optional(
      Type.Object({
        url: Type.String({ description: "URL of the video" }),
        posterNumber: Type.Optional(Type.String({ description: "Poster number to render" })),
        poster: Type.Optional(Type.String({ description: "File name of a poster to show for this video" })),
        start: Type.Optional(Type.Number({ description: "Where to start the video in seconds" })),
        end: Type.Optional(Type.Number({ description: "Where to stop the video in seconds" }))
      }, { description: "Long video to show in this tutorial step" })
    ),
  }),
]);
export type TutorialStepFrontmatter = Static<typeof TutorialStepFrontmatter>;

export class TutorialStep extends Resource implements TutorialStepFrontmatter {
  longVideo: TutorialStepFrontmatter["longVideo"];
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
    this.longVideo = data.longVideo;
    this.videoBottom = !!data.videoBottom;
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
  await tutorialStep.init();
  return tutorialStep;
}
