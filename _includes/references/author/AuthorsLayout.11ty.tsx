import h, { JSX } from "vhtml";
import {
  ReferenceLayout,
  ReferenceLayoutProps,
} from "../../layouts/ReferenceLayout.11y";
import { byRole } from "../../../src/TestCases";
import { Author } from "./AuthorModels";
import { LayoutContext } from "../../../src/models";
import Thumbnail from "../../Image.11ty";

export function AuthorsLayout(
  this: LayoutContext,
  data: ReferenceLayoutProps
): JSX.Element {
  const { content, page } = data;
  // Schedule a post-build validation for this view
  this.addTestCase(page.url, [byRole({ role: "link", text: "Paul Everitt" })]);
  const authors = this.getReferences("author") as Author[];
  // TODO It doesn't appear any of the callers use figure
  const figure = undefined;
  const listing = (
    <nav className="bd-links bio-resourcecards">
      {authors.map((author) => (
        <a aria-label={`Author`} className="bd-link" href={author.url}>
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
      figure={figure}
      listing={[listing]}
      content={content}
    />
  );
}

export const render = AuthorsLayout;
