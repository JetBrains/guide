import h, { JSX } from "vhtml";

export type BlockquoteSectionProps = {
  name: string;
  imageSrc: string;
  title: string;
  children: string[];
};

function BlockquoteSection({
  title,
  children,
  imageSrc,
  name,
}: BlockquoteSectionProps): JSX.Element {
  return (
    <section className="section has-background-dark">
      <div className="container">
        <div className="is-vcentered columns is-multiline is-centered">
          <div className="column">
            <div className="is-flex is-align-items-center">
              <div className="is-vcentered columns is-multiline">
                <div className="column is-6 is-4-desktop">
                  <img
                    className="image is-fullwidth is-128x128"
                    src={imageSrc}
                    alt={name}
                  />
                  <h4 className="mt-2 mb-2 is-size-4 has-text-weight-bold has-text-grey-lighter">
                    {name}
                  </h4>
                  <p className="has-text-grey">{title}</p>
                </div>
                <div className="column is-12 is-8-desktop">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlockquoteSection;
