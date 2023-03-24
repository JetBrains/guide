import { Static, Type } from "@sinclair/typebox";
import { Resource, ResourceFrontmatter } from "../../../src/ResourceModels";
import { EleventyPage } from "../../../src/models";
import path from "upath";
import { AllCollections } from "../../../src/registration";
import { TutorialStep } from "./TutorialStepModels";

export const TutorialFrontmatter = Type.Intersect([
  ResourceFrontmatter,
  Type.Object({
    thumbnail: Type.Optional(Type.String({ description: "File name of a thumbnail for this tutorial" })),
    tutorialItems: Type.Array(Type.String({ description: "Tutorial step(s) that are part of this tutorial" })),
    videoBottom: Type.Optional(Type.Boolean({ description: "True if video should be rendered at the bottom; false otherwise" })),
  }),
]);
export type TutorialFrontmatter = Static<typeof TutorialFrontmatter>;

export class Tutorial extends Resource implements TutorialFrontmatter {
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
  }

  resolve(allCollections: AllCollections) {
    super.resolve(allCollections);
    const { allResources } = allCollections;

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
}

export function resolveChildPath(
  pathPrefix: string,
  tutorialItem: string
): string {
  let result = path.join(pathPrefix, tutorialItem);
  return !result.endsWith("/") ? result.concat("/") : result;
}
