import h, { JSX } from "vhtml";
import { Topic } from "./TopicModels";

export type TopicTagProps = {
	topic: Topic;
};

const TopicTag = ({ topic }: TopicTagProps): JSX.Element => {
	return (
		<>
			<a class="tag is-info is-light" href={topic.url}>
				{topic.label}
			</a>
			<span>&nbsp;&nbsp;</span>
		</>
	);
};

export default TopicTag;
