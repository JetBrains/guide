// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { Reference } from "../../src/ReferenceModels";

export type SidebarReferencesGroupProps = {
  reftype: string;
  accent: string;
  references: Reference[];
};
const SidebarReferencesGroup = ({
  reftype,
  accent,
  references,
}: SidebarReferencesGroupProps): JSX.Element => {
  return (
    <div className="bio-page-sidebar-references-group">
      {references.length > 0 && (
        <>
          <p className="menu-label" style="margin-top: 1rem">
            <span
              style="text-transform: uppercase"
              className="bio-page-sidebar-references-reftype"
            >
              {reftype}
            </span>
          </p>
          <div>
            {references.map((reference) => (
              <a
                href={reference.url}
                style="display: inline-block; margin: 0 0.2rem"
                className="bio-page-sidebar-references-href"
              >
                <span
                  className={`tag bio-page-sidebar-references-label has-text-${accent}`}
                >
                  {reference.title}
                </span>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SidebarReferencesGroup;
