import React, {useMemo, useState, useEffect} from 'react'
import clsx from 'clsx'
import Tooltip from '@material-ui/core/Tooltip'
import styles from './stream-player.module.scss'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
    menu: {
        height: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    customBtn: {
        width: '50px',
        height: '50px',
        marginLeft: '20px',
        borderRadius: '26px',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backgroundSize: '50px',
        cursor: 'pointer'
    },
    leftAlign: {
        display: 'flex',
        flex: '1',
        justifyContent: 'space-evenly'
    },
    rightAlign: {
        display: 'flex',
        flex: '1',
        justifyContent: 'center'
    },
    menuContainer: {
        width: '100%',
        height: 'inherit',
        position: 'absolute',
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'flex-end',
        zIndex: '2',
        bottom: '-30px',
    }
})

export default function StreamMenu(props) {
    const {muteVideo, muteAudio, shareScreen} = props

    const classes = useStyles()

    function toggleVideo() {
        props.toggleVideo()
    }

    function toggleAudio() {
        props.toggleAudio()
    }

    function toggleShareScreen() {
        props.toggleShareScreen()
    }

    return (
        <div className={classes.menuContainer}>
            <div className={classes.menu}>
                <Tooltip title={muteVideo ? 'mute-video' : 'unmute-video'}>
                    <i
                        onClick={toggleVideo}
                        className={styles.customBtn + `${muteVideo ? ' fa fa-video' : ' fa fa-video-slash'}`}
                    />
                </Tooltip>
                <Tooltip title={muteAudio ? 'mute-audio' : 'unmute-audio'}>
                    <i
                        onClick={toggleAudio}
                        className={styles.customBtn + `${muteAudio ? ' fa fa-microphone' : ' fa fa-microphone-slash'}`}
                    />
                </Tooltip>
                <Tooltip title={shareScreen ? 'stop-screen-share' : 'start-screen-share'}>
                <i
                        onClick={toggleShareScreen}
                        className={styles.customBtn + `${shareScreen ? ' fa fa-arrow-down' : ' fa fa-share-alt'}`}
                    />
                </Tooltip>
            </div>
        </div>
    )
}
