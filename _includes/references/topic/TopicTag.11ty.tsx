import h, { JSX } from "vhtml";
import { Topic } from "../../references/topic/TopicModels";

export type TopicTagProps = {
  topic: Topic;
};

const TopicTag = ({ topic }: TopicTagProps): JSX.Element => {
  return (
    <a class="tag is-info is-light" href={topic.url}>{topic.label}</a>
  );
};

export default TopicTag;