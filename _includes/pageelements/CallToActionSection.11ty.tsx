import h from "vhtml";

export type CallToActionProps = {
  title: string;
  url: string;
  message: string;
  imageUrl: string;
};

function CallToActionSection({
  title,
  url,
  message,
  imageUrl,
}: CallToActionProps) {
  return (
    <section className="section has-background-grey-dark">
      <div className="container">
        <div className="is-vcentered columns is-multiline">
          <div className="column is-5">
            <h2 className="is-size-1 is-size-3-mobile has-text-weight-bold title mb-6 has-text-white">
              {title}
            </h2>
            <p className="subtitle mb-5 has-text-grey-light">{message}</p>
            <a className="button is-rounded" href={url}>
              Learn More
            </a>
          </div>
          <div className="column is-6 ml-auto">
            <img className="image is-fullwidth" src={imageUrl} alt={title} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CallToActionSection;
