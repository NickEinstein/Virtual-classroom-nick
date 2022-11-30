import React, {useEffect, useState, useMemo, useContext} from 'react'
import {useGlobalState, useGlobalMutation} from '../../utils/container'
import RTCClient from '../../rtc-client' 
import Tooltip from '@material-ui/core/Tooltip'
import StreamPlayer from './meeting/stream-player'
import StreamMenu from './meeting/stream-menu'
import { AuthContext } from '../../store/context/authContext'
import { useRouter } from 'next/dist/client/router'
import styles from './meeting/stream-player.module.scss'

const MeetingPage = (props) => {
    const routerCtx = useRouter()
    const stateCtx = useGlobalState()
    const mutationCtx = useGlobalMutation()  
    const [user, setUser] = useContext(AuthContext)  
    const [loaded, setLoaded] = useState(false)

    const onUserPublished = (remoteUser, mediaType) =>   {
        // console.debug(`onUserPublished ${remoteUser.uid}, mediaType= ${mediaType}`)
        localClient.subscribe(remoteUser, mediaType)
            .then(mRemoteTrack => {
                addRemoteUser(remoteUser)  
            })
            .catch(err => {
                mutationCtx.methods.toastError(
                    `stream ${remoteUser.getId()} subscribe failed: ${err}`
                )
            })

        if (mediaType === 'video' || mediaType === 'all') {

        }

        if (mediaType === 'audio' || mediaType ===  'all') {

        }
    }

    const onUserUnPublished = (remoteUser, mediaType) => {
        // remoteUser:
        // mediaType: "audio" | "video" | "all"
        console.debug(`onUserUnPublished ${remoteUser.uid}`)
        removeRemoteUser(remoteUser)
        if (mediaType === 'video' || mediaType === 'all') {

        }

        if (mediaType === 'audio' || mediaType === 'all') {

        }
    }

    const localClient = useMemo(() => {
        const client = new RTCClient()
        client.createClient({codec: stateCtx.state.codec, mode: stateCtx.state.mode})

        client.on('connection-state-change', mutationCtx.methods.connectionStateChanged)
        client.on('user-published', onUserPublished)
        client.on('user-unpublished', onUserUnPublished)

        return client
    }, [stateCtx.state.codec, stateCtx.state.mode])

    const [muteVideo, setMuteVideo] = useState(stateCtx.state.muteVideo)
    const [muteAudio, setMuteAudio] = useState(stateCtx.state.muteAudio)
    const [isShareScreen, setShareScreen] = useState(false)
    const [VideoTrack, setVideoTrack] = useState(null)
    const [AudioTrack, setAudioTrack] = useState(null)
    const [remoteUsers, setRemoteUsers] = useState({})

    const addRemoteUser = (remoteUser) => {
        remoteUsers[remoteUser.uid] = remoteUser
        setRemoteUsers(remoteUsers)
    }

    const removeRemoteUser = (remoteUser) => {
        delete remoteUsers[remoteUser.uid]
        setRemoteUsers(remoteUsers)
    }

    const config = useMemo(() => {
        let element = document.getElementsByTagName('video')
        element && element.length ? element[0].style.position = 'relative' : null
        console.log("VIIID", element)  
        return {
            token: stateCtx.state.config.token,
            channel: stateCtx.state.config.channelName,
            microphoneId: stateCtx.state.config.microphoneId,
            cameraId: stateCtx.state.config.cameraId,
            uid: stateCtx.state.config.uid,
            host: stateCtx.state.config.host,
            userRole: stateCtx.state.config.userRole,
            appid: stateCtx.state.appid
        }  
        
    }, [stateCtx, muteVideo, muteAudio])

    // const params = config.userRole //new URLSearchParams(window.location.search)
    const params = user.user_type.toLowerCase() === 'admin' || user.user_type.toLowerCase() === 'tutor' ? 'host' : 'audience';
    useEffect(() => {
        console.log("USERTYPE", params)
        const roleParams = params //params.get('role')
        if (!config.channel && roleParams !== 'host') {
            routerCtx.push('/dashboard'+user.user_type.toLowerCase())
        }
        // let element = document.getElementsByTagName('video')
        // if(element.length) {
        //     element[0].style.position = 'relative' 
        //     console.log("VIDEI =====>", element[0])        
        //     element[0].addEventListener('loadeddata', function() {
        //         console.log("------ load start --------")
        //     }) 
        // }
        setTimeout(() => {
            let element = document.getElementsByTagName('video')
            // element[0].addEventListener('click', function() {
            //     alert("------ load start --------")
            // })    
            element.length ? element[0].style.position = 'relative' : null
            setLoaded(true)
            console.log("VIDEI =====>", element[0])        
        }, 6000);
    }, [config.channel, routerCtx, params])

    useEffect(() => {
        if (
            config.channel &&
            localClient._created &&
            localClient._joined == false &&   
            localClient._leave == false
        ) {      
            localClient.setClientRole(config.userRole)
            localClient.join(config.channel, config.token)
                .then((uid) => {
                    config.uid = uid          
                    if (config.host) {
                        localClient.startLive(config.microphoneId, config.cameraId)
                            .then(() => {
                                setVideoTrack(localClient.mLocalVideoTrack)
                                setAudioTrack(localClient.mLocalAudioTrack)
                            })
                    }
                    mutationCtx.methods.stopLoading()
                })
                .catch((err) => {
                    mutationCtx.methods.toastError(`join error: ${err.info}`)
                    // routerCtx.push('/dashboard/tutor')
                })
                
        }
    }, [localClient, mutationCtx.methods, config, routerCtx])

    const toggleVideo = () => {
        const newValue = !muteVideo
        if (newValue) {
            localClient._client.unpublish(VideoTrack)
            // let element = document.getElementsByTagName('video')
            // element.length ? element[0].style.position = 'absolute' : null
        } else {
            localClient._client.publish(VideoTrack)
        }  
        setMuteVideo(newValue)
    }

    const toggleAudio = () => {
        const newValue = !muteAudio
        if (newValue) {
            localClient._client.unpublish(AudioTrack)
        } else {
            localClient._client.publish(AudioTrack)
        }
        setMuteAudio(newValue)
    }

    const toggleShareScreen = () => {
        const newValue = !isShareScreen
        if (newValue) {
            setShareScreen(newValue)

            setMuteVideo(false)
            setMuteAudio(false)

            localClient.stopLive()
            localClient.startShareScrren()
                .then(() => {
                    setVideoTrack(localClient.mLocalVideoTrack)
                    setAudioTrack(localClient.mLocalAudioTrack)
                })
                .catch((err) => {
                    mutationCtx.methods.toastError(` code= ${err.code}`)
                })
        } else {
            localClient.stopShareScrren()
            localClient.startLive(config.microphoneId, config.cameraId)
                .then(() => {
                    setShareScreen(newValue)

                    setVideoTrack(localClient.mLocalVideoTrack)
                    setAudioTrack(localClient.mLocalAudioTrack)
                })
        }
    }

    const doLeave = () => {
        localClient.leave().then(() => {
            localClient.stopLive()
            localClient.destroy()
            routerCtx.push('/dashboard/'+user.user_type.toLowerCase())
        })
    }

    return (
        <div className="meeting">
            <div className="current-view">
                <div className="nav"> 
                    <div className="avatar-container">
                        <div className="default-avatar"></div>
                        <div className="avatar-text">Class  session - <strong>{config.channel}</strong></div>
                        <div className="like"></div>
                    </div>  
                    <Tooltip title="quit">
                        <div 
                            className="quit"
                            onClick={doLeave}
                        ><i className='fa fa-close'></i></div>
                    </Tooltip>
                </div>
                <StreamPlayer
                    uid={config.uid}
                    isLocal={true}
                    videoTrack={VideoTrack}
                    audioTrack={AudioTrack} 
                    muteAudio={muteAudio}
                    muteVideo={muteVideo}
                    showInfo={stateCtx.state.profile}
                    rtcClient={localClient._client}
                >
                    {config.host && loaded ? <StreamMenu
                        muteAudio={muteAudio}
                        muteVideo={muteVideo}
                        shareScreen={isShareScreen}
                        toggleVideo={toggleVideo}
                        toggleAudio={toggleAudio}
                        toggleShareScreen={toggleShareScreen}
                    /> : null}
                </StreamPlayer>
                <div className={"stream-container "+styles.streamcontainer}>
                    {Object.values(remoteUsers).map(remoteUser => {
                        return <StreamPlayer
                            key={`key-${remoteUser.uid}`}
                            uid={remoteUser.uid}
                            videoTrack={remoteUser.videoTrack}
                            audioTrack={remoteUser.audioTrack}
                            muteAudio={false}
                            muteVideo={false}
                            showInfo={true}
                            rtcClient={localClient._client}
                        />
                    })}
                </div>
            </div>
        </div>
    )
}

export default React.memo(MeetingPage)
