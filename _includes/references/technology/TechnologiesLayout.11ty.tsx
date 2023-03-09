import h, { JSX } from "vhtml";
import {
  ReferenceLayout,
  ReferenceLayoutProps,
} from "../../layouts/ReferenceLayout.11y";
import { Technology } from "./TechnologyModels";
import { LayoutContext } from "../../../src/models";

export function TechnologiesLayout(
  this: LayoutContext,
  data: ReferenceLayoutProps
): JSX.Element {
  const { content } = data;
  const technologies = this.getReferences("technology") as Technology[];

  const figure = undefined;
  const listing = (
    <nav className="bd-links bio-resourcecards">
      {technologies.map((technology) => (
        <a
          aria-label={`Technology`}
          className="bd-link"
          href={technology.url}
          title={technology.title}
        >
          <h2 className="bd-link-name">
            <figure className="bd-link-figure">
              <div className="image is-64x64">
                <img
                  src={technology.logo}
                  alt={technology.title}
                  className="bio-resourcecard-logo"
                />
              </div>
            </figure>
            {technology.title}
          </h2>
          {technology.subtitle && (
            <p className="bd-link-subtitle">{technology.subtitle}</p>
          )}
        </a>
      ))}
    </nav>
  );
  return (
    <ReferenceLayout
      {...data}
      figure={figure}
      listing={[listing]}
      content={content}
    />
  );
}

export const render = TechnologiesLayout;
