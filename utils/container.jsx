import {
    createContext,
    useContext,
    useReducer,
    useState,
    useEffect
} from 'react'
import {reducer, defaultState} from './store'
import CustomizedSnackbar from '../utils/snackbar-wrapper'
import Loading from '../utils/loading'

const StateContext = createContext({})
const MutationContext = createContext({})

export const ContainerProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, defaultState) 


    const [toasts, updateToasts] = useState([])

    const methods = {
        startLoading() {
            dispatch({type: 'loading', payload: true})
        },
        stopLoading() {
            dispatch({type: 'loading', payload: false})
        },
        updateConfig(params) {
            dispatch({type: 'config', payload: {...state.config, ...params}})
        },
        setClient(clientInstance) {
            dispatch({type: 'client', payload: clientInstance})
        },
        setCodec(param) {
            dispatch({type: 'codec', payload: param})
        },
        setVideo(param) {
            dispatch({type: 'video', payload: param})
        },
        setAudio(param) {
            dispatch({type: 'audio', payload: param})
        },
        setScreen(param) {
            dispatch({type: 'screen', payload: param})
        },
        setProfile(param) {
            dispatch({type: 'profile', payload: param})
        },
        toastSuccess(message) {
            updateToasts([
                ...toasts,
                {
                    variant: 'success',
                    message
                }
            ])
        },
        toastInfo(message) {
            updateToasts([
                ...toasts,
                {
                    variant: 'info',
                    message
                }
            ])
        },
        toastError(message) {
            updateToasts([
                ...toasts,
                {
                    variant: 'error',
                    message
                }
            ])
        },
        removeTop() {
            const items = toasts.filter((e, idx) => idx > 0)
            updateToasts([...items])
        },
        setLocalStream(param) {
            dispatch({type: 'localStream', payload: param})
        },
        setCurrentStream(param) {
            dispatch({type: 'currentStream', payload: param})
        },
        setDevicesList(param) {
            dispatch({type: 'devicesList', payload: param})
        },
        clearAllStream() {
            dispatch({type: 'clearAllStream'})
        },
        addLocal(evt) {
            const {stream} = evt
            methods.setLocalStream(stream)
            methods.setCurrentStream(stream)
        },
        setRoom(evt) {
            dispatch({type: 'setRoom', payload: evt})
        },
        setMemberState(evt) {
            dispatch({type: 'memberState', payload: evt})
        },
        addStream(evt) {
            const {stream} = evt
            dispatch({type: 'addStream', payload: stream})
        },
        removeStream(evt) {
            const {stream} = evt
            dispatch({type: 'removeStream', stream: stream})
        },
        removeStreamById(evt) {
            const {uid} = evt
            dispatch({type: 'removeStream', uid: uid})
        },
        connectionStateChanged(curState, revState) {
            methods.toastInfo(`${curState}`)
        }
        // enableBeauty(enable) {
        //   dispatch({type: 'enableBeauty', enable});
        // }
    }

    useEffect(() => {
        console.log("STATE ", defaultState)
        // window.rootState = state
        window.sessionStorage.setItem(
            'custom_storage',
            JSON.stringify({
                uid: state.config.uid,
                host: state.config.host,
                channelName: state.config.channelName,
                token: state.config.token,
                resolution: state.config.resolution
            })
        )
    }, [state])

    return (
        <StateContext.Provider value={{state: state}}>
            <MutationContext.Provider value={{methods: methods}}>
                {/* <CustomizedSnackbar toasts={{toasts: toasts}}/> */}
                {state.loading ? <Loading/> : null}
                {children}
            </MutationContext.Provider>
        </StateContext.Provider>
    )
}

export function useGlobalState() {
    return useContext(StateContext)
}

export function useGlobalMutation() {
    return useContext(MutationContext)
}
