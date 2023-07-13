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
  const topics = this.getReferences({
    resourceType: "topic",
  }) as Topic[];
  const figure = undefined;
  const listing = (
    <nav class="bd-links bio-resourcecards">
      {topics.map((topic) => (
        <a
          aria-label={`Topic`}
          class="bd-link"
          href={topic.url}
          title={topic.title}
        >
          <h2 class="bd-link-name">
            <figure class="bd-link-figure">
              <span
                data-testid={`sto-accent`}
                class={`bd-link-icon has-text-${topic.accent}`}
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
