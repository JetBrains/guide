import h, { JSX } from "vhtml";
import {
  ReferenceLayout,
  ReferenceLayoutProps,
} from "../../layouts/ReferenceLayout.11y";
import { Topic } from "./TopicModels";
import { LayoutContext } from "../../../src/models";

export function TopicsLayout(
  this: LayoutContext,
  data: ReferenceLayoutProps
): JSX.Element {
  const topics = this.getReferences("topic") as Topic[];
  const figure = undefined;
  const listing = (
    <nav className="bd-links bio-resourcecards">
      {topics.map((topic) => (
        <a
          aria-label={`Topic`}
          className="bd-link"
          href={topic.url}
          title={topic.title}
        >
          <h2 className="bd-link-name">
            <figure className="bd-link-figure">
              <span
                data-testid={`sto-accent`}
                className={`bd-link-icon has-text-${topic.accent}`}
              >
                <i data-testid={`sto-icon`} className={topic.icon} />
              </span>
            </figure>
            {topic.title}
          </h2>
          {topic.subtitle && (
            <p className="bd-link-subtitle">{topic.subtitle}</p>
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
      content={data.content}
    />
  );
}

export const render = TopicsLayout;
