import React from 'react';
import dynamic from 'next/dynamic'
import { useGlobalMutation, useGlobalState } from '../utils/container';
import { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { AuthContext } from '../store/context/authContext';
import { useRouter } from 'next/dist/client/router';

const ToolBox =  dynamic(
  () => {
    return import("@netless/react-tool-box")
  },
  {ssr: false}
)


export default function Whiteboard() {
  
  const headers = {
    'token': 'NETLESSSDK_YWs9ak84QnFRa2FBTGlQUXVQMCZub25jZT0wMWEzZGI1MC04NWM1LTExZWMtYjdjMi1lMTI1ZGY5ZDhkZTMmcm9sZT0wJnNpZz1hZDUwODQ2NGE5NDljNWQ4MDhmNmRkMzEwZjNkYzkxMTFjMjRmMWU4OWE3MTlmN2MxYjI0MDA5NmJiNGZjOGY5',
    'Content-Type': 'application/json',
    'region': 'us-sv',
  }

  const hostMemberState = {
    currentApplianceName: "pencil",
    strokeColor: [0, 128, 0],
    strokeWidth: 4,
    textSize: 14,
  }

  const stateCtx = useGlobalState()
  const mutationCtx = useGlobalMutation()
  const [WhiteWebSdk, setWhiteboard] = useState(null)
  const [loading, setLoading] = useState(false)
  const [room, setRoom] = useState(stateCtx.state.boardRoom)
  const [memberState, setMemberState] = useState(hostMemberState)
  const [roomData, setRoomData] = useState({})
  const [user, setUser] = useContext(AuthContext);
  const [roomKeys, setRoomKeys] = useState({})
  const router = useRouter()
  const userRole = user.user_type === 'ADMIN' || user.user_type === 'TUTOR' ? 'admin' : 'audience';
  // const courseId = 

  function audienceJoin() {
    WhiteWebSdk.then(mod => mod.setClientRole('audience'))
    joinBoard()
  }

  function saveRoomData(data) {
    axios.post('https://theclassroom.ci-auction.ng/api/v1/class-keys/save-keys', {
      type: 'whiteboard',
      room_id: data.uuid,
      roomToken: data.token,
      course_id: router.query.id
    })
    .then(response => {
      if(response.data.status) {
        return response.data.data
      }
    })
    .catch(err => console.log("err =", err))
  }

  function getRoomData() {
    let id = Object.keys(router.query)[0]
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/class-keys/get-keys/${id}`)
    .then(response => {
      if(response.data.status) {
        // setRoomKeys(response.data.data)
        console.log(response.data.data)
        let roomKeys = response.data.data
        const data = {
          uuid: roomKeys.room_id
        }
        joinBoard(roomKeys.room_token, data)
      }
    })
    .catch(err => console.log("err =", err))
  }

  function createRoom() { 
    // console.log("ID", Object.keys(router.query)[0])
    setLoading(true)
    if(userRole === 'audience') {
      getRoomData()
    }
    else {
      axios.post('https://api.netless.link/v5/rooms', { 'isRecord': false }, {
        headers: headers     
      })
      .then(response => {
        if(response.data) {
          console.log('room data', response.data)
          setRoomData(response.data)
          createToken(response.data)
        }
      })
      .catch(err => console.log("create error", err))

    }
  }

  function createToken(data) {
    axios.post(`https://api.netless.link/v5/tokens/rooms/${data.uuid}`, { 'lifespan': 3600000, 'role': userRole }, {
      headers: headers
    })
    .then(response => {
      console.log("response =|| ", response.data)
      if(response.data) {
        console.log('room data', response.data)
        joinBoard(response.data, data)
      }
    })
    .catch(err => console.log("Token err", err))
  }
  
  function joinBoard(roomToken, data) {
    let whiteWebSdk =  WhiteWebSdk.then(mod => {
      return new mod.WhiteWebSdk({
       appIdentifier: 'c0o-gH9mEeyUNDFKAZ2C-g/6DUOyaxZqnuCeg',
       region: 'us-sv'            
      })
    })

    const joinParams = {
      uuid: data.uuid,
      uid: user.id, 
      roomToken: roomToken,
      disableDeviceInputs: false
    }

    data.token = roomToken
    saveRoomData(data)

    let el = document.getElementById("whiteboard")
    whiteWebSdk.then(mod => mod.joinRoom(joinParams)
      .then(room => {
        setRoom(room)
        room.isEraser = true
        room.setMemberState(hostMemberState)
        mutationCtx.methods.setRoom(room)
        mutationCtx.methods.setMemberState(hostMemberState)
        console.log("ROOM==========> ", room)
        room.bindHtmlElement(el);
        // window.open(window.location.origin+'/whiteboard')
      })
      .catch(error => console.log("Join error", error))
      .finally(() => {
        setLoading(false)
      })
    )
  }
  
  function setRoomMemberState(e) {
    room.setMemberState({...memberState, ['currentApplianceName']: e.currentApplianceName})
    setMemberState({...memberState, ['currentApplianceName']: e.currentApplianceName})
    // mutationCtx.methods.setRoom(room)
    // mutationCtx.methods.setMemberState(memberState)
    console.log('tat', stateCtx.state)
  }

  useEffect(() => {
    if(typeof window != null)
      setWhiteboard(import('white-web-sdk').then(mod => mod))    
    return () => {
      
    };
  }, [0]);

  return (
    <React.Fragment>
      <div className='row p-4'>
        <div className='col-md-12 text-right'>
          {
            room ?
            <button 
              type='button' 
              className='btn btn-sm btn-default'
              onClick={createRoom}
            >
              End
            </button>
            :
            <button 
              type='button' 
              className='btn btn-sm btn-default'
              onClick={createRoom}
            >
              Start
            </button>

          }
        </div>
        {
          loading ? 
          <div className="text-center p-4">Loading.....</div> : null
        }
        <div className='col-md-12 col-lg-12'>
          {
            room ? 
              <ToolBox 
                i18nLanguage={{lang: 'en', name: 'English'}}  
                memberState={memberState}
                setMemberState={setRoomMemberState}              
              />
            : null
          }
          <div id="whiteboard" style={{width: 100+"%", height: 100+"vh"}}></div>          
        </div>
      </div>
    </React.Fragment>
  )
}