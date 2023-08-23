type ConsistentHashParams = {
	range: number;
	weight: number;
	distribution: "random" | "uniform";
};

declare module "consistent-hash" {
	export default class ConsistentHash {
		constructor(params: ConsistentHashParams);
		add(arg: string): void;
		get(arg: string): string;
	}
}
