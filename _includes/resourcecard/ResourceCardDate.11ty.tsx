// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";

export type ResourceCardDateProps = {
  date?: string;
};
const ResourceCardDate = ({ date }: ResourceCardDateProps): JSX.Element => {
  return (
    <div className="level-right is-size-7 has-text-grey">
      <span className="level-item bio-common-card-published">{date}</span>
    </div>
  );
};

export default ResourceCardDate;
