import h, { JSX } from "vhtml";
import { Reference } from "../../../src/ReferenceModels";
import { Topic } from "../../references/topic/TopicModels";
import TopicTag from "../../references/topic/TopicTag.11ty";

export type ArticleTopicsProps = {
  topics: Reference[];
};

const ArticleTopics = ({ topics }: ArticleTopicsProps): JSX.Element => {
  return (
    <article class="tags mb-4">
      <div class="content p-2 m-0">
        {topics.map((topic: Topic) => (
          <TopicTag topic={topic} />
        ))}
      </div>
    </article>
  );
};

export default ArticleTopics;