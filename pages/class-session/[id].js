import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/dist/client/router";
import Whiteboard from "../../component/video/meeting/whiteboard";
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../store/context/authContext";
 
const Meeting =  dynamic(
  () => {
    return import("../../component/video/meeting")
  },
  {ssr: false}
)
     
export default function ClassSession() {
  const router =  useRouter()
  const  [courseId, setCourseId] = useState(null)
  const user = useContext(AuthContext)

  useEffect(() => {
    if(router.isReady) {
      setCourseId(router.query.id)
    }     
  }, [router.isReady]);
  return (
    <React.Fragment>
      <div className="row p-4">
        <div className="col-md-8 col-lg-8">
          <Whiteboard courseId={courseId} />
        </div>
        <div className="col-md-4 col-lg-4 ">
          <Meeting />
          {/* {
            user.user_type === 'TUTOR' ?
            :
            <p>{user.user_type}</p>
          } */}
        </div>
      </div>    
    </React.Fragment>
  )
}