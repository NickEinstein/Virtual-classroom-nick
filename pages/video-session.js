import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/dist/client/router";
import Whiteboard from "../component/video/meeting/whiteboard";

const Meeting =  dynamic(
  () => {
    return import("../component/video/meeting")
  },
  {ssr: false}
)

export default function VideoMeeting() {
  const router =  useRouter()

  return (
    <React.Fragment>
      <div className="row p-4">
        <div class="col-md-8 col-lg-8">
          <Whiteboard />
        </div>
        <div className="col-md-4 col-lg-4 ">
          <Meeting />
        </div>
      </div>    
    </React.Fragment>
  )
}