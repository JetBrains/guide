import fs from "fs";
import { join } from "path";

const svgCache = new Map<string, string>();

let getSvgContent = function (file: string): string {
	if (svgCache.has(file)) {
		return svgCache.get(file) as string;
	}

	let relativeFilePath = join(
		"node_modules",
		"@rescui",
		"icons",
		"svg",
		`${file}.svg`
	);
	let data = fs.readFileSync(relativeFilePath).toString("utf8");
	svgCache.set(file, data);
	return data;
};

export type IconProps = {
	name: string;
};

const Icon = ({ name }: IconProps): JSX.Element => {
	return <span>{getSvgContent(name)}</span>;
};

export default Icon;
