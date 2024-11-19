import { Resource } from "../../../src/ResourceModels";
import { Author } from "../author/AuthorModels";

import { AuthorIcon } from "../../resourcecard/Utilities.11ty";

export type ArticleAuthorProps = {
	author: Author | Resource;
	displayDate: string;
};

const ArticleTitleSubtitle = ({
	author,
	displayDate,
}: ArticleAuthorProps): JSX.Element => {
	return (
		<article class="media author is-size-7">
			{author instanceof Author && (
				<div class="p-1 is-32x32 media-left">
					<a href={author.url}>
						<figure class="image is-32x32 m-0">
							<AuthorIcon {...author} />
						</figure>
					</a>
				</div>
			)}
			<div class="media-content">
				<div class="content">
					<p class="m-0">
						<a href={author.url}>
							{author.title} {(author as any).isGuest && "(Community)"}
						</a>
					</p>
					<time class="m-0 has-text-grey-dark" datetime={displayDate}>
						{displayDate}
					</time>
				</div>
			</div>
		</article>
	);
};

export default ArticleTitleSubtitle;
