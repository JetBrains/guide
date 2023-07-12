import h, { JSX } from "vhtml";

export type ArticleTitleSubtitleProps = {
  title: string;
  subtitle: string | undefined;
};

const ArticleTitleSubtitle = ({ title, subtitle }: ArticleTitleSubtitleProps): JSX.Element => {
  return (
    <>
      <h2 class="title is-size-1">{title}</h2>
      {subtitle && (<h3 class="subtitle is-size-4 pt-1 has-text-grey">{subtitle}</h3>)}
    </>
  );
};

export default ArticleTitleSubtitle;