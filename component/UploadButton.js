// // import React from 'react';
// // import logo from './logo.svg';
// // import './App.css';
// // import RequestMaintenance from './pages/RequestMaintenance';

// // import MaintenanceRequestManagement from './pages/MaintenanceRequestManagement';
// // import Header1 from './components/Header1';

// import React, { useContext, useEffect, useRef, useState } from "react";
// import {
//   Table,
//   Input,
//   Button,
//   Select,
//   Form,
//   Space,
//   Alert,
//   InputNumber,
//   DatePicker,
//   Upload,
//   message,
// } from "antd";
// import {
//   UserOutlined,
//   SolutionOutlined,
//   UploadOutlined,
//   SmileOutlined,
// } from "@ant-design/icons";
// import cookie from "js-cookie";
// import { patch } from "../../api-services/fetch";
// import notification from "../../utility/notification";

// // import { SwapTableContext } from '../Contexts/SwapTableContext'

// // const cookie = new Cookies()
// function UploadButton(prop) {
//   // const { handleImage, imageHolder, handleMfilesArray, holdMfilesArray,handleReloadDev

//   // } = useContext(SwapTableContext)

//   let arrayz = [];
//   const [infoz, setinfoz] = useState([]);
//   let [count, setCount] = useState(1000);
//   let [counter, setCounter] = useState(1000);
//   let [loading, setLoading] = useState(false);
//   let [showIcon, setShowIcon] = useState(true);
//   let token = cookie.get("token");

//   const props = {
//     name: "file",
//     action: "https://edogoverp.com/services/api/documents/admin-stores",

//     headers: {
//       authorization: `Bearer ${token}`,
//     },

//     // beforeUpload: file => {
//     //   if (file.type !== 'image/png') {
//     //     message.error(`${file.name} is not a png file`);
//     //   }
//     //   return file.type === 'image/png' ? true : Upload.LIST_IGNORE;
//     // },

//     onChange(info) {
//       setinfoz(info);
//       if (info.file.status == "uploading") {
//         setLoading(true);
//         // console.log(info.file, info.fileList);
//       }
//       if (info.file.percent !== 0 || info.file.percent !== 100) {
//         setCounter(info.file.percent);
//         // console.log('looking')
//         // console.log(info.file, info.fileList);
//       }

//       if (info.file.status === "done") {
//         setLoading(false);
//         setShowIcon(false);

//         // const it = message?.success(`${info.file.name} file uploaded successfully`);
//         // handleMfilesArray({
//         //   key: count++,
//         //   id: 0,
//         //   name: info.file.name,
//         //   path: info.fileList[info.fileList.length - 1].response.doclink,
//         // });
//         let a =
//           prop?.handleDoc &&
//           prop?.handleDoc(
//             {
//               id: 0,
//               createdAt: "2021-11-28T20:53:57.685Z",
//               modifiedAt: "2021-11-28T20:53:57.685Z",
//               createdBy: 0,
//               modifiedBy: 0,
//               path: info.fileList[info.fileList.length - 1].response.doclink,
//               name: info.file.name,
//               fileId: 0,
//               meetingScheduleId: prop.idz,
//             },
//             prop.isMinutes

//             // {
//             //  key:count++,
//             //  name : info.file.name,
//             //     image : info.fileList[info.fileList.length-1].response.doclink
//             // }
//           );
//         // let b = prop?.handleActionDoc && prop?.handleActionDoc(
//         //   {
//         //     id: 0,

//         //     path: info.fileList[info.fileList.length - 1].response.doclink,
//         //     name: info.file.name,
//         //     //  status:'actioned'
//         //   })

//         setCount(count);
//         // // handleImage(info.file.name, info.fileList[0].response.doclink)
//         // if (handleImage.doclink == '') {
//         //   console.log(handleImage)
//         //   // arrayz.push(handleImage)
//         // }

//         console.log(info.fileList[0].response.doclink);
//         console.log(info.file.name);
//         // getList()

//         //  console.log(arrayz);
//       } else if (info.file.status === "error") {
//         message.error(`${info.file.name} file upload failed.`);
//         setLoading(false);
//       }
//     },
//   };

//   // useEffect(()=>(
//   //   handleReloadDev()

//   // ),[counter])
//   console.log(infoz);
//   // showUploadList={false}

//   return (
//     <div
//       style={{
//         width: "100%",
//         borderRadius: "10px",
//         marginBottom: loading ? "20px" : 0,
//       }}
//     >
//       <Upload
//         progress
//         percent
//         showUploadList={showIcon}
//         {...props}
//         maxCount={1}
//       >
//         <Button
//           loading={loading}
//           style={{
//             backgroundColor: prop.button ? "#EFD66BF2" : "#017D34",
//             borderRadius: "22px",
//             fontSize: prop.p == "Upload Other Documents" && "11px",
//             color: !prop.isMunutes && "white",
//           }}
//           icon={<UploadOutlined />}
//         >
//           {prop?.handleActionDoc ? "Upload Document" : prop.p}
//         </Button>
//       </Upload>
//       {/* <Upload >
//                 <Button  className="border buttonz" style={{ borderTopRightRadius: "20px", borderBottomRightRadius: "20px", borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px", backgroundColor:"#EFD66BF2", color:"black" }} block icon={<UploadOutlined style={{margin:"none", fontSize:"10px"}} />}> {prop.p}</Button>
//             </Upload> */}
//     </div>
//   );
// }

// export default UploadButton;


import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
const props = {
  name: "file",
  // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  action: "https://edogoverp.com/services/api/documents/admin-stores",

  headers: {
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiIyNTQiLCJGaXJzdE5hbWUiOiJURVNUIiwiTGFzdE5hbWUiOiJVU0VSVFdFTFZFIiwiZXhwIjoxNjY5ODA3NTk4LCJpc3MiOiJzZXJ2ZXIiLCJhdWQiOiJjbGllbnQifQ.qrsHR-Qnfu3_xsq5FV_wQ2TuPmN_2FI2yhrCROwKWjA`,
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const UploadButton = () => (
  <Upload {...props}>
    <Button >Click to Upload</Button>
  </Upload>
);
export default UploadButton;