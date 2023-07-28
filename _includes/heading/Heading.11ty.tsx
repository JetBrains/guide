import h, { JSX } from "vhtml";

export type HeadingProps = {
  title: string;
  subtitle?: string;
};
const Heading = ({ title, subtitle }: HeadingProps): JSX.Element => {
  return (
    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-8">
            <h1 class="mt-2 mb-4 is-size-1 has-text-weight-bold">{title}</h1>
            {subtitle && <p class="subtitle has-text-grey mb-5">{subtitle}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Heading;
