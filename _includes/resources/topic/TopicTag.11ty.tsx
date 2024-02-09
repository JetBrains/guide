import { Topic } from "./TopicModels";
import { Fragment } from "jsx-async-runtime/jsx-dev-runtime";

export type TopicTagProps = {
	topic: Topic;
};

const TopicTag = ({ topic }: TopicTagProps): JSX.Element => {
	return (
		<Fragment>
			<a class="tag is-info is-light" href={topic.url}>
				{topic.label}
			</a>
			<span>&nbsp;&nbsp;</span>
		</Fragment>
	);
};

export default TopicTag;
