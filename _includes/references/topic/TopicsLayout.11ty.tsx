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
  const listing = (
    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          {topics.map((topic) => {
            let figure: string;
            if (topic.icon) {
              figure = (<i class={`${topic.icon} has-text-${topic.accent} fa-5x`} />);
            } else if (topic.logo) {
              figure = (<img src={topic.logo} alt={topic.title} />);
            } else {
              figure = (<i class={`fas fa-file has-text-${topic.accent} fa-5x`} />);
            }

            return (
              <div class="column is-6 is-4-desktop mb-5">
                <div class="is-flex">
                  <span class="mr-4">
                    <a href={topic.url}>
                      <figure class="image is-128x128">
                        {figure}
                      </figure>
                    </a>
                  </span>
                  <div>
                    <a href={topic.url} aria-label={`Topic`} class="is-size-5 has-text-weight-bold mb-2 title">
                      {topic.title}
                    </a>
                    {topic.subtitle && (
                      <p class="has-text-grey-dark">{topic.subtitle}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  return (
    <ReferenceLayout
      {...data}
      figure={undefined}
      listing={[listing]}
      content={data.content}
    />
  );
}

export const render = TopicsLayout;
