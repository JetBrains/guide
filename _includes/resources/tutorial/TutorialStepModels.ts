import { Static, Type } from "@sinclair/typebox";
import { validateFrontmatter } from "../../../src/validators";
import { Resource, ResourceFrontmatter } from "../../../src/ResourceModels";
import { EleventyPage } from "../../../src/models";
import { Tutorial } from "./TutorialModels";

export const TutorialStepFrontmatter = Type.Intersect([
  ResourceFrontmatter,
  Type.Object({
    videoBottom: Type.Optional(
      Type.Boolean({
        description:
          "True if video should be rendered at the bottom; false otherwise",
      })
    ),
    video: Type.Optional(
      Type.Union([
        Type.String({
          description: "YouTube URL to the video",
        }),
        Type.Object(
          {
            url: Type.String({ description: "YouTube URL to the video" }),
            start: Type.Number({
              description: "start time for the video",
            }),
            end: Type.Number({
              description: "end time for the video",
            }),
          },
          { description: "Animated GIF to show in this tip" }
        ),
      ])
    ),
  }),
]);
export type TutorialStepFrontmatter = Static<typeof TutorialStepFrontmatter>;

export class TutorialStep extends Resource implements TutorialStepFrontmatter {
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
