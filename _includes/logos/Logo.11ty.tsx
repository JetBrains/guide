import path from "upath";
import fs from "fs";

const svgCache = new Map<string, string>();

let getResizedSvgContent = function (
	product: string,
	variant?: string,
	width?: number,
	height?: number
): string {
	let svgContent = getSvgContent(product, variant);
	if (width && height) {
		svgContent = svgContent.replace(
			'width="70" height="70"',
			`width=\"${width}\" height=\"${height}\"`
		);
	}
	return svgContent;
};

let getSvgContent = function (product: string, variant?: string): string {
	if (svgCache.has(product + "_" + variant)) {
		return svgCache.get(product + "_" + variant) as string;
	}

	let relativeFilePath = variant
		? path.join(
				"node_modules",
				"@jetbrains",
				"logos",
				product,
				`${product}-${variant}.svg`
		  )
		: path.join(
				"node_modules",
				"@jetbrains",
				"logos",
				product,
				`${product}.svg`
		  );
	let data = fs.readFileSync(relativeFilePath).toString("utf8");
	svgCache.set(product + "_" + variant, data);
	return data;
};

export type IconProps = {
	product: string;
	variant?: string;
	width?: number;
	height?: number;
};

const Logo = ({ product, variant, width, height }: IconProps): JSX.Element => {
	return <span>{getResizedSvgContent(product, variant, width, height)}</span>;
};

export default Logo;
