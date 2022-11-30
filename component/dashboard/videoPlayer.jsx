import ReactPlayer from "react-player";
import { useState } from "react";

export default function VideoPlayer(props) {
  const [autoPlay, setAutoPlay] = useState(true)
  return <ReactPlayer 
    url={props.url}
    playing={autoPlay}
    width="100%"
    height="100%"
    controls={true}
    config={ {
      file: {
        attributes: {
          controlsList: "nodownload"
        }
      }
    } }     
  />
}