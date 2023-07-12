import path from "upath";
import h, { JSX } from "vhtml";
import fs from "fs";

const svgCache = new Map<string, string>();

let getSvgContent = function (file: string): string {
  if (svgCache.has(file)) {
    return svgCache.get(file) as string;
  }

  let relativeFilePath = path.join('node_modules', '@rescui', 'icons', 'svg', `${file}.svg`);
  let data = fs.readFileSync(relativeFilePath).toString('utf8');
  svgCache.set(file, data)
  return data;
}

export type IconProps = {
  name: string;
};

const Icon = ({ name }: IconProps): JSX.Element => {
  return (
    <span dangerouslySetInnerHTML={{ __html: getSvgContent(name) }}></span>
  );
};

export default Icon;