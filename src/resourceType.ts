export const TIP_RESOURCE = "tip";
export type TIP_RESOURCE_TYPE = typeof TIP_RESOURCE;

export const ARTICLE_RESOURCE = "article";
export type ARTICLE_RESOURCE_TYPE = typeof ARTICLE_RESOURCE;

export const TUTORIAL_RESOURCE = "tutorial";
export type TUTORIAL_RESOURCE_TYPE = typeof TUTORIAL_RESOURCE;

export const TUTORIAL_STEP_RESOURCE = "tutorialstep";
export type TUTORIAL_STEP_RESOURCE_TYPE = typeof TUTORIAL_STEP_RESOURCE;

export const PLAYLIST_RESOURCE = "playlist";
export type PLAYLIST_RESOURCE_TYPE = typeof PLAYLIST_RESOURCE;

export const CHANNEL_RESOURCE = "channel";
export type CHANNEL_RESOURCE_TYPE = typeof CHANNEL_RESOURCE;

export const PAGE_RESOURCE = "page";
export type PAGE_RESOURCE_TYPE = typeof PAGE_RESOURCE;

export const LINK_RESOURCE = "link";
export type LINK_RESOURCE_TYPE = typeof LINK_RESOURCE;
export const ALL_RESOURCES = [
	TIP_RESOURCE,
	ARTICLE_RESOURCE,
	TUTORIAL_RESOURCE,
	TUTORIAL_STEP_RESOURCE,
	PLAYLIST_RESOURCE,
	CHANNEL_RESOURCE,
	PAGE_RESOURCE,
	LINK_RESOURCE,
] as const;

export type POTENTIAL_RESOURCE_TYPES = Array<typeof ALL_RESOURCES>;

export type RESOURCE_TYPES = (typeof ALL_RESOURCES)[number];

export type POSSIBLE_RESOURCE_TYPES = Array<
	RESOURCE_TYPES | "author" | "topic"
>;
