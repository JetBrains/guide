import { Type } from "@sinclair/typebox";

export const ThumbnailField = Type.Object({
	thumbnail: Type.String({ description: "Path to thumbnail image." }),
});

export const IconField = Type.Object({
	accent: Type.Optional(Type.String()),
	icon: Type.Optional(Type.String()),
	logo: Type.Optional(Type.String()),
	topicType: Type.Optional(Type.String()),
});
export const VideoBottomField = Type.Object({
	videoBottom: Type.Optional(
		Type.Boolean({
			description:
				"True if video should be rendered at the bottom; false otherwise",
		})
	),
});

export const VideoField = Type.Object({
	video: Type.Optional(
		Type.Union([
			Type.String({
				description: "YouTube URL to the video",
			}),
			Type.Object(
				{
					url: Type.String({ description: "YouTube URL to the video" }),
					start: Type.Number({
						description: "start time for the video",
					}),
					end: Type.Number({
						description: "end time for the video",
					}),
				},
				{ description: "Animated GIF to show in this tip" }
			),
		])
	),
});

export const LabelField = Type.Object({
	label: Type.Optional(Type.String({ description: "Label of this resource" })), // Can be inferred from parentDir
});
