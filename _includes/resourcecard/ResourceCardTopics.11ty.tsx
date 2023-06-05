// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";

export type ResourceCardTopic = {
  label: string;
  slug: string;
  url: string;
};

export type ResourceCardTopics = ResourceCardTopic[];
export type ResourceCardTopicProps = {
  items: ResourceCardTopics;
};
const ResourceCardTopics = ({ items }: ResourceCardTopicProps): JSX.Element => {
  return (
    <>
      {items.map((topic) => (
        <span className="bio-common-card-references">
          <span className="tag is-rounded is-success is-light">
            <a href={topic.url} className="has-text-success">
              {topic.label}
            </a>
          </span>
        </span>
      ))}
    </>
  );
};

export default ResourceCardTopics;
