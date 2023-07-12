import h, { JSX } from "vhtml";
import { Author } from "../../references/author/AuthorModels";
import { Reference } from "../../../src/ReferenceModels";

export type ArticleAuthorProps = {
  author: Author | Reference,
  displayDate: string
};

const ArticleTitleSubtitle = ({ author, displayDate }: ArticleAuthorProps): JSX.Element => {
  return (
    <article class="media author mb-4">
      {author instanceof Author && (
        <div class="p-2 is-32x32 media-left">
          <a href={author.url}>
            <figure class="image is-32x32 m-0">
              <img src={author.thumbnail} alt={author.title} loading="lazy" class="avatar" />
            </figure>
          </a>
        </div>
      )}
      <div class="media-content">
        <div class="content">
          <p class="m-0">
            <a href={author.url}>{author.title}</a>
          </p>
          <time class="m-0 has-text-grey-dark" datetime={displayDate}>{displayDate}</time>
        </div>
      </div>
    </article>
  );
};

export default ArticleTitleSubtitle;