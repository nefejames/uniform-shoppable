import { useEffect } from "react";
import "cloudinary-video-player/dist/cld-video-player.min.js";
import "cloudinary-video-player/dist/cld-video-player.min.css";

export default function VideoPlayer({ cloudname, video, products, cta }) {
  useEffect(() => {
    const VideoPlayer = cloudinary.videoPlayer("shoppable-video-player", {
      cloud_name: cloudname,
      muted: true,
      controls: true,
      fluid: true,
    });

    let source = {
      shoppable: {
        products,
        bannerMsg: cta,
        startState: "openOnPlay",
        showPostPlayOverlay: true,
      },
    };

    if (products.length > 0) {
      VideoPlayer.source(video, source);
    } else {
      VideoPlayer.source(video);
    }
  }, [cloudname, products, video, cta]);

  return (
    <div>
      <video
        id="shoppable-video-player"
        className="cld-video-player cld-video-player-skin-light"
      ></video>
    </div>
  );
}
