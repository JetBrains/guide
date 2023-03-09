// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";

export type HeadingProps = {
  title: string;
  subtitle?: string;
};
const Heading = ({ title, subtitle }: HeadingProps): JSX.Element => {
  return (
    <header className="bd-header" style="min-height: 100px">
      <div className="bd-header-titles">
        <h1 className="title">{title}</h1>
        {subtitle && <p className="subtitle is-4">{subtitle}</p>}
      </div>
    </header>
  );
};

export default Heading;
