import h, { JSX } from "vhtml";

export type HeadingProps = {
  title: string;
  subtitle?: string;
};
const Heading = ({ title, subtitle }: HeadingProps): JSX.Element => {
  return (
    <header class="bd-header" style="min-height: 100px">
      <div class="bd-header-titles">
        <h1 class="title">{title}</h1>
        {subtitle && <p class="subtitle is-4">{subtitle}</p>}
      </div>
    </header>
  );
};

export default Heading;
