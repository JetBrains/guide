import { Type } from "@sinclair/typebox";

export const VideoType = Type.Union([
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
		{ description: "Animated GIF to show in this link" }
	),
]);
