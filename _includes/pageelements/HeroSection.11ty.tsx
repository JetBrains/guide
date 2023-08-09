import h from "vhtml";

export type HeroSectionProps = {
  title: string;
  subtitle: string;
  image: string;
};

function HeroSection({ title, subtitle, image }: HeroSectionProps) {
  const style = `background: url('${image}') center center; background-repeat: no-repeat; background-size: cover`;
  return (
    <section class="hero is-medium" style={style}>
      <div class="hero-body">
        <div class="container">
          <h1 class="mt-2 mb-4 is-size-1 has-text-weight-bold">{title}</h1>
          <p class="subtitle mb-5">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
