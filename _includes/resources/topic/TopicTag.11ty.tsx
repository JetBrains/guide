import { Topic } from "./TopicModels";
import { Fragment } from "jsx-async-runtime/jsx-dev-runtime";

export type TopicTagProps = {
	topic: Topic;
};

const TopicTag = ({ topic }: TopicTagProps): JSX.Element => {
	return (
		<Fragment>
			<a class="tag is-outlined has-background-white" href={topic.url}>
				{topic.label}
			</a>
			<span>&nbsp;</span>
		</Fragment>
	);
};

export default TopicTag;
