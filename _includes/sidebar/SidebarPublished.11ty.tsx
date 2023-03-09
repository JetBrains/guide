// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import Thumbnail from "../Image.11ty";
import { Author } from "../references/author/AuthorModels";

export type SidebarPublishedProps = {
  displayDate: string;
  author: Author;
};
const SidebarPublished = ({
  displayDate,
  author,
}: SidebarPublishedProps): JSX.Element => {
  return (
    <div className="bio-page-sidenav-published-heading">
      <p className="menu-label bio-page-sidebar-published">Published</p>
      <ul className="menu-list">
        <li>
          <article className="media">
            <figure className="media-left">
              <div className="image is-rounded is-48x48">
                <Thumbnail
                  src={author.thumbnail}
                  alt={`${author.title} Thumbnail`}
                  className="bio-resourcecard-logo"
                />
              </div>
            </figure>
            <div className="media-content">
              <div className="content">
                <div className="bio-page-sidebar-published-date">
                  {displayDate}
                </div>
                <div>by:</div>
                <a aria-label="Author Sidebar" href={author.url}>
                  {author.title}
                </a>
              </div>
            </div>
          </article>
        </li>
      </ul>
    </div>
  );
};

export default SidebarPublished;
