// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";

export type ResourceCardMediaProps = {
  href: string;
  title: string;
  subtitle?: string;
  resourceType?: string;
};
const ResourceCardMedia = ({
  href,
  title,
  subtitle,
  resourceType,
}: ResourceCardMediaProps): JSX.Element => {
  return (
    <div className="content bio-resourcecard-props">
      <a href={href}>
        <strong>
          {title} {resourceType && <small>({resourceType})</small>}
        </strong>
      </a>
      {subtitle && <div style="min-height: 2.2rem">{subtitle}</div>}
    </div>
  );
};

export default ResourceCardMedia;
