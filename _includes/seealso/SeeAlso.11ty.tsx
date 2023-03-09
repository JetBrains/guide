// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";

type SeeAlsoItem = {
  title: string;
  href: string;
};

export type SeeAlsos = SeeAlsoItem[];

export type SeeAlsoProps = {
  items: SeeAlsos;
};

const SeeAlso = ({ items }: SeeAlsoProps): JSX.Element => {
  if (items.length) {
    return (
      <div>
        <header id="see-also" className="is-size-3 is-bold">
          See Also
        </header>
        <div className="content">
          <ul>
            {items.map((see) => (
              <li>
                <a href={see.href}>{see.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  return <></>;
};

export default SeeAlso;
