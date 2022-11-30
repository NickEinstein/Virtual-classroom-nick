import "video.js/dist/video-js.css";

import * as React from "react";
import {RouteComponentProps} from "react-router";
import {
    createPlugins,
    DefaultHotKeys, DeviceType,
    PPTKind,
    Room,
    RoomPhase,
    RoomState,
    ViewMode,
    WhiteWebSdk,
    WhiteWebSdkConfiguration,
    InvisiblePlugin,
    WrappedComponents,
} from "white-web-sdk";
import ToolBox from "@netless/tool-box";
import RedoUndo from "@netless/redo-undo";
import PageController from "@netless/page-controller";
import ZoomController from "@netless/zoom-controller";
import OssUploadButton, { UploadType } from "@netless/oss-upload-button";
import {videoPlugin} from "@netless/white-video-plugin";
import {audioPlugin} from "@netless/white-audio-plugin";
import {videoPlugin2} from "@netless/white-video-plugin2";
import {audioPlugin2} from "@netless/white-audio-plugin2";
import { videoJsPlugin } from "@netless/video-js-plugin"
import PreviewController from "@netless/preview-controller";
import DocsCenter from "@netless/docs-center";
import {CursorTool} from "@netless/cursor-tool";
import {message, Tooltip} from "antd";
import {netlessWhiteboardApi} from "./apiMiddleware";
import PageError from "./PageError";
import LoadingPage from "./LoadingPage";
import pages from "./assets/image/pages.svg"
import folder from "./assets/image/folder.svg";
import follow from "./assets/image/follow.svg"
import followActive from "./assets/image/follow-active.svg";
import {h5DemoUrl, h5DemoUrl3, h5OssConfigObj, netlessToken, ossConfigObj, supplierUrl} from "./appToken";
import "./WhiteboardPage.less";
import InviteButton from "./components/InviteButton";
import ExitButtonRoom from "./components/ExitButtonRoom";
import {Identity} from "./IndexPage";
import OssDropUpload from "@netless/oss-drop-upload";
import {pptData} from "./taskUuids";
import {PPTDataType} from "@netless/oss-upload-manager";
import {v4 as uuidv4} from "uuid";
import moment from "moment";
import {LocalStorageRoomDataType} from "./HistoryPage";
import {IframeWrapper, IframeBridge} from "@netless/iframe-bridge";
import { IframeAdapter } from "./tools/IframeAdapter";
import { H5UploadButton } from "./components/H5UploadButton";
import { ossConfigForRegion, Region } from "./region";
import {isMobile, isWindows} from "react-device-detect";
import { SupplierAdapter } from "./tools/SupplierAdapter";
import { withTranslation, WithTranslation } from "react-i18next";
import { SlidePrefetch } from "@netless/slide-prefetch";
import { WhitePPTPlugin, Player } from "@netless/ppt-plugin";

// export type WhiteboardPageStates = {
//     phase: RoomPhase;
//     room?: Room;
//     isMenuVisible: boolean;
//     isFileOpen: boolean;
//     mode?: ViewMode;
//     whiteboardLayerDownRef?: HTMLDivElement;
//     roomController?: ViewMode;
//     pptPlugin?: WhitePPTPlugin;
// };

export default function Whiteboard() {
  render(
    <div className="realtime-box">
      <div className="tool-box-out">
          <ToolBox i18nLanguage={i18n.language} room={room} hotkeys={{
              arrow: "A",
              clear: "",
              clicker: "",
              ellipse: "C",
              eraser: "E",
              hand: "H",
              laserPointer: "Z",
              pencil: "P",
              rectangle: "R",
              selector: "S",
              shape: "",
              straight: "L",
              text: "T"
            }} customerComponent={ undefined }
          />
      </div>
      <div className="redo-undo-box">
          <RedoUndo room={room}/>
      </div>
      <div className="zoom-controller-box">
          <ZoomController room={room}/>
      </div>
      <div className="room-controller-box">
          <div className="page-controller-mid-box">
              <Tooltip placement="bottom" title={"Vision control"}>
                <div className="page-preview-cell"
                    onClick={()=> this.handleRoomController(room)}>
                    <img style={{width: "28px"}} src={this.state.mode === ViewMode.Broadcaster ? followActive : follow} alt={"follow"}/>
                </div>
              </Tooltip>
              <Tooltip placement="bottom" title={"Docs center"}>
                <div className="page-preview-cell"
                    onClick={() => this.setState({isFileOpen: !this.state.isFileOpen})}>
                    <img style={{width: "28px"}} src={folder} alt={"folder"}/>
                </div>
              </Tooltip>
              {useUploadH5 && <Tooltip placement="bottom" title={"HTML5 Course"}>
                  <H5UploadButton region={region} room={room} {...this.props} />
              </Tooltip>}
              <InviteButton uuid={uuid} region={region} />
              <ExitButtonRoom identity={identity} room={room} userId={userId} />
          </div>
      </div>
      <div className="page-controller-box">
          <div className="page-controller-mid-box">
            <PageController pptPlugin={pptPlugin} usePPTPlugin={true} room={room}/>
            <Tooltip placement="top" title={"Page preview"}>
                <div className="page-preview-cell" onClick={() => this.handlePreviewState(true)}>
                    <img src={pages} alt={"pages"}/>
                </div>
            </Tooltip>
          </div>
      </div>
      <PreviewController handlePreviewState={this.handlePreviewState} isVisible={isMenuVisible}
        room={room}
      />
 
    <div ref={this.handleBindRoom} className="whiteboard-box" ></div>
  </div>    
  )
}



