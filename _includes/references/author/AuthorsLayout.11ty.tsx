import h, { JSX } from "vhtml";
import {
  ReferenceLayout,
  ReferenceLayoutProps,
} from "../../layouts/ReferenceLayout.11y";
import { Author } from "./AuthorModels";
import { LayoutContext } from "../../../src/models";
import Thumbnail from "../../Image.11ty";

export function AuthorsLayout(
  this: LayoutContext,
  data: ReferenceLayoutProps
): JSX.Element {
  const { content } = data;
  const authors = this.getReferences({
    resourceType: "author",
  }) as Author[];
  const listing = (
    <nav class="bd-links bio-resourcecards">
      {authors.map((author) => (
        <a aria-label={`Author`} class="bd-link" href={author.url}>
          <h2 className="bd-link-name">
            <figure className="bd-link-figure">
              <div className="image is-rounded is-64x64">
                <Thumbnail
                  src={author.thumbnail}
                  alt={`${author.title} image`}
                  className="bio-resourcecard-logo"
                />
              </div>
            </figure>
            {author.title}
          </h2>
          {author.subtitle && (
            <p className="bd-link-subtitle">{author.subtitle}</p>
          )}
        </a>
      ))}
    </nav>
  );

  return (
    <ReferenceLayout
      {...data}
      listing={[listing]}
      content={content}
    />
  );
}

export const render = AuthorsLayout;
