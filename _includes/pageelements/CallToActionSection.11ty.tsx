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
    <section class="section has-background-grey-dark">
      <div class="container">
        <div class="is-vcentered columns is-multiline">
          <div class="column is-5">
            <h2 class="is-size-1 is-size-3-mobile has-text-weight-bold title mb-6 has-text-white">
              {title}
            </h2>
            <p class="subtitle mb-5 has-text-grey-light">{message}</p>
            <a class="button is-rounded" href={url}>
              Learn More
            </a>
          </div>
          <div class="column is-6 ml-auto">
            <img class="image is-fullwidth" src={imageUrl} alt={title} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CallToActionSection;
