// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";

export type FooterProps = {
  copyright: string;
};
const Footer = ({ copyright }: FooterProps): JSX.Element => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="columns">
          <div className="column is-4 is-offset-4 has-text-centered">
            <p
              className="is-size-6"
              dangerouslySetInnerHTML={{ __html: copyright }}
            ></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
