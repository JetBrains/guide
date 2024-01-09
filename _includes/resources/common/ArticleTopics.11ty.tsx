import { Topic } from "../topic/TopicModels";
import TopicTag from "../topic/TopicTag.11ty";

export type ArticleTopicsProps = {
	topics: Topic[];
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
