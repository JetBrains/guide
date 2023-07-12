// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { Resource } from "../../src/ResourceModels";
import { Topic } from "../references/topic/TopicModels";
import TopicTag from "../references/topic/TopicTag.11ty";

export type ResourceCardProps = {
  resource: Resource;
};
const ResourceCard = ({
  resource: { url, title, displayDate, subtitle, thumbnail, references },
}: ResourceCardProps): JSX.Element => {
  // @ts-ignore
  const { author, topics } = references;
  return (
    <div class="column is-half-tablet is-one-third-desktop">
      <div class="card is-equal-height">
        <div class="card-image">
          <a href={url}>
            <figure class="image is-1by1"><img src={thumbnail} alt={title} /></figure>
          </a>
        </div>
        <div class="card-content">
          <a class="title" aria-label={`Resource`} href={url}>{title}</a>
          {subtitle && (<div class="content mt-2">{subtitle}</div>)}
        </div>
        <footer class="card-footer">
          <div class="container p-4">
            <div class="tags mb-2">
              {topics.map((topic: Topic) => (
                <TopicTag topic={topic} />
              ))}
            </div>

            <div class="media author">
              <div class="p-2 media-left">
                <a href={author.url}>
                  <figure class="image m-0 is-24x24">
                    <img src={author.thumbnail} alt={author.title} loading="lazy" class="avatar" />
                  </figure>
                </a>
              </div>
              <div class="media-content">
                <div class="content is-size-7">
                  <p class="m-0">
                    <a href={author.url}>{author.title}</a>
                  </p>
                  <time class="m-0 has-text-grey-dark" datetime={displayDate}>{displayDate}</time>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ResourceCard;
