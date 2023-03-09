// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { Resource } from "../../src/ResourceModels";
import Thumbnail from "../Image.11ty";
import { Product } from "../references/product/ProductModels";
import { Technology } from "../references/technology/TechnologyModels";
import { Topic } from "../references/topic/TopicModels";

export type ResourceCardProps = {
  resource: Resource;
};
const ResourceCard = ({
  resource: {
    url,
    title,
    resourceType,
    displayDate,
    subtitle,
    thumbnail,
    references,
  },
}: ResourceCardProps): JSX.Element => {
  // @ts-ignore
  const { author, products, technologies, topics } = references;
  return (
    <div className="bio-resourcecard box">
      <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <Thumbnail src={thumbnail} alt="Logo" />
          </figure>
        </div>
        <div className="media-content is-clipped">
          <div className="content">
            <div className="content bio-resourcecard-props">
              <a aria-label={`Resource`} href={url}>
                <strong>
                  {title} {resourceType && <small>({resourceType})</small>}
                </strong>
              </a>
              {subtitle && <div style="min-height: 2.2rem">{subtitle}</div>}
            </div>
            <nav className="level">
              <div className="level-left">
                {thumbnail && (
                  <a className="level-item bio-card-author" href={author.url}>
                    <figure
                      className="image is-rounded is-24x24"
                      style="margin-left: 0.2rem; margin-right: 0.2rem"
                    >
                      {thumbnail && (
                        <div className="image is-rounded is-24x24">
                          <Thumbnail
                            src={author.thumbnail}
                            alt={author.title}
                            className={"bio-resourcecard-logo"}
                          />
                        </div>
                      )}
                    </figure>
                    <span className="bio-card-author-label">
                      {author.title}
                    </span>
                  </a>
                )}

                <div className="level-item tags">
                  {products.map((product: Product) => (
                    <span className="bio-common-card-references">
                      <span className="tag is-rounded">
                        <a href={product.url} className="has-text-info">
                          {product.label}
                        </a>
                      </span>
                    </span>
                  ))}
                  {technologies.map((technology: Technology) => (
                    <span className="bio-common-card-references">
                      <span className="tag is-rounded">
                        <a href={technology.url} className="has-text-danger">
                          {technology.label}
                        </a>
                      </span>
                    </span>
                  ))}
                  {topics.map((topic: Topic) => (
                    <span className="bio-common-card-references">
                      <span className="tag is-rounded">
                        <a href={topic.url} className="has-text-primary">
                          {topic.label}
                        </a>
                      </span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="level-right">
                <div className="level-item">
                  <div className="level-right is-size-7 has-text-grey">
                    <span className="level-item bio-common-card-published">
                      {displayDate}
                    </span>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ResourceCard;
