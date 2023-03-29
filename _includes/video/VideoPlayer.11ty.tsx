import h, { JSX } from "vhtml";

export type VideoPlayerProps = {
  source: string;
  poster?: string;
  start?: number;
  end?: number;
};

// @ts-ignore
// todo: poster isn't really required because YouTube has thumbnails
const VideoPlayer = ({
  source,
  start,
  end,
  poster,
}: VideoPlayerProps): JSX.Element => {
  return (
    <div
      title="Video Player"
      class="video-player"
      data-plyr-start={start}
      data-plyr-end={end}
      data-plyr-provider="youtube"
      data-plyr-embed-id={`${source}?iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`}
    ></div>
  );
};

export default VideoPlayer;
