import DashboardHeader from "../../../../component/dashboard/header";
import DashboardLayout from "../../../../component/dashboard/layout";
import Image from "next/dist/client/image";
import InfoCardPlain from "../../../../component/dashboard/infoCardPlain";
import VideoPlayer from "../../../../component/dashboard/videoPlayer";
import { post, get, patch } from "../../../../services/fetch";
import { useState, useEffect, useContext } from "react";
import icon from "../../../../public/images/icons/closed.png";
import ChatBox from "../../../../component/dashboard/chat/chatBox";
import Message from "../../../../component/dashboard/chat/message";
import Link from "next/dist/client/link";
import * as Cookies from "js-cookie";
import axios from "axios";
import { AuthContext } from "../../../../store/context/authContext";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";
import { useGlobalMutation, useGlobalState } from "../../../../utils/container";
import { useRouter } from "next/dist/client/router";
import { Table } from "antd";
import { Card, Modal, Form, Row, Col, Spinner } from "react-bootstrap";
import { Button, Collapse } from "antd";
import UploadButton from "../../../../component/UploadButton";
import CustomButton from "../../../../component/customButton";
import PreferenceForm from "../../../../component/preference-form";

const ToolBox = dynamic(
  () => {
    return import("@netless/react-tool-box");
  },
  { ssr: false }
);

const { Panel } = Collapse;

export default function ClassSession() {
  const [searchResult, setSearchResult] = useState([]);
  const [addedSubjects, setAddedSubjects] = useState();
  const [expand, setExpand] = useState(true);
  // const [catchFormValues, setcatchFormValues] = useState({})
  const [isOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [student, setStudent] = useState(0);
  const [signature, setSignature] = useState("");
  const [user, setUser] = useContext(AuthContext);
  const date = new Date();
  const currentTime = date.toLocaleTimeString("default", { time: "short" });
  const today =
    date.getDate() +
    " " +
    date.toLocaleDateString("default", { month: "long" }) +
    ", " +
    date.getFullYear();
  const [joinState, setJoinState] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState([]);
  const [AgoraRTC, setRtc] = useState(undefined);
  const stateCtx = useGlobalState();
  const mutationCtx = useGlobalMutation();
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [newFormSubject, setNewFormSubject] = useState();
  const [newFormCategory, setNewFormCategory] = useState();
  const [k, setk] = useState();
  const [school, setSchool] = useState();
  const [degree, setDegree] = useState();

  const [details, setDetails] = useState({});
  const fieldList = [
    {
      week_day: "",
      class_time: "",
    },
  ];
  const [fields, setFields] = useState(fieldList);
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const handleShow = () => setShow(true);
  const handleShow2 = () => setShow2(true);

  const hostMemberState = {
    currentApplianceName: "rectangle",
    strokeColor: [0, 128, 0],
    strokeWidth: 4,
    textSize: 14,
  };

  const [client, setClient] = useState(null);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [newCategories, setNewCategories] = useState(null);
  const [newSubjects, setNewSubjects] = useState(null);
  const [newLevels, setNewLevels] = useState(null);
  const [subjectId, setSubjectId] = useState({});
  const [isApproved, setIsApproved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState(null);
  const [memberState, setMemberState] = useState(hostMemberState);
  const [userSubjects, setUserSubjects] = useState([]);
  const [teachersClasses, setTeachersClasses] = useState([]);

  useEffect(() => {
    login();
    subjectss();
    levelss();

    //   axios.get(`https://classroom.c-ileasing.com/api.virtualclassroom.com/public/api/v1/categories`)
    //   // axios.get(`https://theclassroom.ci-auction.ng/api/v1/student/${user.id}/subjects`)
    //   .then(response => {
    //     console.log("suer subjects", response)
    //     if(response.data.status) {
    //       setUserSubjects(response.data.data)
    //     }
    //   })

    // // getCategories()
    // // getCourses()
    // // getSubjects()
    // if(typeof window != null)
    //   setWhiteboard(import('white-web-sdk').then(mod => mod))
    //   return () => {
    //   };
  }, []);

  //   const catchFormValues = (e)=>{
  //     console.log(e)
  //   let cow =  {
  //     category : 1,
  //     subjects : {
  //         '10am Mondays' : `English Languate`,
  //         '2am Satuday' : 'Mathmatics'
  //     }
  // }
  //   }

  const login = async () => {
    // alert('hi')
    const res = await get({
      endpoint: "categories",
      // body: { ...details },
      // auth: false,
    });

    setNewCategories(res?.data?.data);
    console.log(res?.data?.data);
  };

  const subjectss = async () => {
    // alert('hi')
    const res = await get({
      endpoint: "subjects",
      // body: { ...details },
      // auth: false,
    });
    setNewSubjects(res?.data?.data);

    console.log(res?.data?.data);
  };
  const levelss = async () => {
    // alert('hi')
    const res = await get({
      endpoint: "levels",
      // body: { ...details },
      // auth: false,
    });

    setNewLevels(res?.data?.data);
    console.log(res?.data?.data);
  };

  function filterSubjects(event) {
    const { name, value } = event.target;
    let results = userSubjects.filter(
      (subject) =>
        subject.title.includes(value) ||
        subject.title.toLowerCase().includes(value) ||
        subject.level.includes(value) ||
        subject.level.toLowerCase().includes(value)
    );
    setUserSubjects(results);
  }

  // function getCourses() {

  //   // axios.get(`https://classroom.c-ileasing.com/api.virtualclassroom.com/public/api/v1/${user.id}/subjects`)
  //   axios.get(`https://theclassroom.ci-auction.ng/api/v1/student/${user.id}/subjects`)
  //   .then(response => {
  //     console.log("suer subjects", response)
  //     if(response.data.status) {
  //       setUserSubjects(response.data.data)
  //     }
  //   })
  // }

  function addField() {
    if (fields.length < 7) {
      setFields([...fields, { week_day: "", class_time: "" }]);
    }
  }

  function removeField(e) {
    const id = e.target.id;
    if (fields.length == 1) return;
    setFields(fields.filter((item, index) => index != id));
  }

  function inputChange(event) {
    console.log(event?.target?.value);
    const { name, value } = event.target;
    setformData({ ...formdata, [name]: value });
    setData({ ...data, [name]: value });
    console.log("data", data);
    if (name === "subjects") {
      // alert(value)
      setk(value);
      // console.log(value)
      // selectTopic(value)
      // setNewFormSubject(newFormSubject.push(value))
    }
    if (name === "category") {
      setNewFormCategory(value);

      // selectLevel(value)
    }
  }

  const [subjects, setSubjects] = useState([]);
  const [formdata, setformData] = useState({ user_id: user.id });
  const [newFormdata, setnewFormData] = useState({
    category: "",
    subjects: [],
  });

  const [topics, setTopics] = useState([]);
  const [levels, setLevel] = useState([]);

  const userData = {
    periods: fields,
    user_id: user.id,
    // subject_id:subject,
  };
  const [data, setData] = useState(userData);
  const [dataz, setDataz] = useState(false);

  //  console.log(catchFormValues)

  useEffect(() => {
    // console.log(data)
    toGetUserProfile();
    setData({ ...data, subject_id: data.subject });
  }, [dataz]);

  const columns1 = [
    {
      title: "Day",
      dataIndex: "day",
      key: "name",
    },
    {
      title: "subject",
      dataIndex: "subject",
      key: "age",
    },
    {
      title: "Time ",
      dataIndex: "time",
      key: "id",
      width: "20%",
    },
    // {
    //   title: "Date Created",
    //   dataIndex: "time",
    //   key: "id",
    //   width: "20%",
    // },
  ];

  const datazz = [
    {
      title: "Name",
      dataIndex: "day",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "subject",
      key: "email",
    },
    {
      title: "Phone number",
      dataIndex: "time",
      key: "phone_number",
    },
    {
      title: "Date Registered",
      dataIndex: "created_at",
      key: "id",
      width: "20%",
    },
  ];

  function selectTopic(id) {
    let level = subjects.filter((subject) => subject.id == id)[0].courses;
    setTopics(level);
  }

  // function getCategories() {
  //   axios.get(`https://theclassroom.ci-auction.ng/api/v1/category`)
  //   .then(response => {
  //     console.log(response)
  //     if(response.data.status) {
  //       setSubjects(response.data.data.data)
  //     }
  //   })
  // }

  const toCreateClass = async (subjects) => {
    console.log(subjects);
    let payload = subjects.map((e) => ({
      variation: e.session,
      day: e.day,
      time: `${e.hour}:${e.minute}:00`,
      end_time: `${e.hourEnd}:${e.minuteEnd}:00`,
      // end_time: "10:20:35",
      subject: e.subjectId,
    }));

    console.log(payload);

    let poster = {
      category: 1,
      subjects: payload,
    };

    console.log(payload);
    const res = await patch({
      endpoint: "add-subjects",
      body: poster,
      // auth: false,
    });
    if (res.status == 200 || res.status == 201) {
      Swal.fire({
        title: "Success",
        text: `${res.data.message}`,
        showCloseButton: true,
      });
    } else {
      Swal.fire({
        title: "Sorry",
        text: `${res.data.message}`,
        showCloseButton: true,
      });
    }

    console.log(res);
    setDataz(!dataz);

    // console.log(res)
  };

  const toGetUserProfile = async () => {
    // console.log(k)

    // console.log(payload)
    const res = await get({
      endpoint: "user-profile",
      // body: payload,
      // auth: false,
    });

    console.log(res);

    console.log(res?.data?.data?.details?.relationships?.classes);
    setTeachersClasses(res?.data?.data?.details?.relationships?.classes);
    setUserSubjects(res?.data?.data?.details?.relationships?.classes);
    setIsApproved(res?.data?.data?.details?.is_approved);
    // console.log(res.data.data.is_approved)
    // setAddedSubjects(res.data.data.details.subjects[0])
  };

  // function submitData() {
  //   console.log(data)

  //   setLoading(true)
  //   // setformData({...formdata, ['user_id']: user.id})
  //   axios.post('https://theclassroom.ci-auction.ng/api/v1/add-subject', data)
  //   .then(response => {
  //     console.log(response)
  //     if(response.data.status) {
  //       Swal.fire({
  //         title: 'Success',
  //         text: response.data.message,
  //         showCloseButton: true,
  //       })
  //       .then(() => window.location.reload())
  //     }
  //   })
  //   .catch(err =>  {
  //     if(err.response) {

  //       let message
  //       if(err.response.status == 422 || err.response.status == 200 || err.response.status == 401 || err.response.status == 404) {
  //         if(err.response.data.errors) {
  //             let errors = err.response.data.errors
  //             let errorList = Object.values(errors)
  //             errorList.map(msg => {
  //                 message = msg
  //             })
  //         }
  //         Swal.fire({
  //           title: 'Error',
  //           text: err.response.data.message || message,
  //           icon: 'error',
  //           confirmButtonText: 'Close'
  //         });
  //       }
  //     }
  //   })
  //   .finally(() => setLoading(false))
  // }

  // function startClass(subject_id) {
  //   setLoading(true)
  //   axios.post(`https://theclassroom.ci-auction.ng/api/v1/classroom/join`, {
  //     user_id: user.id,
  //     subject_id: subject_id,
  //   })
  //   .then(response => {
  //     // console.log("CLASSROOM", response)
  //     if(response.data.status) {
  //       if(response.data.data !== '') {
  //         window.location.href = response.data.data
  //       }
  //       // Swal.fire({
  //       //   title: 'Payment',
  //       //   icon: 'success',
  //       //   text: 'Payment successful'
  //       // })
  //       // .then(() => {
  //       //   window.location.reload()
  //       // })
  //     }
  //   })
  //   .catch(err =>  {
  //     if(err.response) {
  //       let message
  //       if(err.response.status == 422 || err.response.status == 200 || err.response.status == 401 || err.response.status == 404) {
  //         if(err.response.data.errors) {
  //             let errors = err.response.data.errors
  //             let errorList = Object.values(errors)
  //             errorList.map(msg => {
  //                 message = msg
  //             })
  //         }
  //         Swal.fire({
  //           title: 'Error',
  //           text: err.response.data.message || message,
  //           icon: 'error',
  //           confirmButtonText: 'Close'
  //         });
  //       }
  //     }
  //   })
  //   .finally(() => setLoading(false))
  // }

  // function scheduleClass(subject_id) {
  //   axios.post(`https://theclassroom.ci-auction.ng/api/v1/classroom/schedule`, {
  //     user_id: user.id,
  //     subject_id: subject_id,
  //   })
  //   .then(response => {
  //     // console.log("CLASSROOM", response)
  //     if(response.data.status) {
  //       Swal.fire({
  //         icon: 'question',
  //         text: 'You are all set',
  //         confirmButtonText: 'Join class',
  //         showConfirmButton: true,
  //         showCloseButton: true,
  //         preConfirm: () => {
  //           startClass(subject_id)
  //         }
  //       })
  //       .then(() => {
  //         // window.location.reload()
  //       })
  //     }
  //   })
  //   .catch(err =>  {
  //     if(err.response) {
  //       let message
  //       if(err.response.status == 422 || err.response.status == 200 || err.response.status == 401 || err.response.status == 404) {
  //         if(err.response.data.errors) {
  //             let errors = err.response.data.errors
  //             let errorList = Object.values(errors)
  //             errorList.map(msg => {
  //                 message = msg
  //             })
  //         }
  //         Swal.fire({
  //           title: 'Error',
  //           text: err.response.data.message || message,
  //           icon: 'error',
  //           confirmButtonText: 'Close'
  //         });
  //       }
  //     }
  //   })
  //   .finally(() => setLoading(false))
  // }

  // function getWeekDay(periods) {
  //   let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  //   let date = new Date();
  //   return Object.keys(periods).includes(days[date.getDay()])
  // }

  //  var headers = {
  //    "Content-Type": "application/json",
  //  };

  const handlefile = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  const handleCourseWork = async (e) => {
    // e.preventDefault();
    let file = selectedFile;
    let formdata = new FormData();

    formdata.append("pdf_link", file);
    // formdata.append("name", "nick upload");
    formdata.append("subject_id", subjectId);
    // formdata.append("degree_attained", degree);
    console.log(selectedFile);
    console.log(formdata);

    // axios.post("https://v2.convertapi.com/upload ", formdata, config)

    const res = await post({
      endpoint: "course-works",
      body: formdata,
      // auth: false,
    });

    if (res.status == 200 || res.status == 201) {
      Swal.fire({
        title: "Success",
        text: `${res.data.message}`,
        showCloseButton: true,
      });
    } else {
      Swal.fire({
        title: "Sorry",
        text: `${res.data.message}`,
        showCloseButton: true,
      });
    }
  };

  console.log(isApproved);

  return (
    <DashboardLayout>
      <DashboardHeader title="Classes" />
      <div className="dashboard">
        <div className="row p-4 justify-content-centesr">
          <div className="col-md-12 col-lg-12 custom-column">
            <Collapse accordion>
              <Panel header="Add Subjects" key="1">
                {isApproved == "true" ? (
                  <Card>
                    <Card.Header className="bg-white d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        My Subjects
                        <button
                          type="button"
                          className="btn-flat btn-light ml-3"
                          onClick={handleShow}
                        >
                          <small>
                            {" "}
                            Add subject{" "}
                            <i className="fas fa-plus-circle text-primary ml-2"></i>
                          </small>
                        </button>
                      </div>
                      <div className="searchs">
                        <input
                          type="text"
                          name="search"
                          placeholder="Find Courses"
                          className="form-control"
                          onKeyUp={filterSubjects}
                        />
                      </div>
                    </Card.Header>
                    <Card.Body className="table-responsive">
                      <Table
                        bordered
                        dataSource={userSubjects}
                        columns={columns1}
                      />
                    </Card.Body>
                  </Card>
                ) : (
                  <p>You Must Add Your CourseWork FIRST</p>
                )}
              </Panel>
              <Panel header="Upload Course work" key="2">
                <Card>
                  <Card.Header className="bg-white d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <button
                        type="button"
                        className="btn-flat btn-light ml-3"
                        onClick={handleShow2}
                      >
                        <small>
                          {" "}
                          Add Coursework
                          <i className="fas fa-plus-circle text-primary ml-2"></i>
                        </small>
                      </button>
                    </div>
                    <div className="searchs">
                      <input
                        type="text"
                        name="search"
                        placeholder="Find Courses"
                        className="form-control"
                        onKeyUp={filterSubjects}
                      />
                    </div>
                  </Card.Header>
                  <Card.Body className="table-responsive">
                    <Table
                      bordered
                      dataSource={userSubjects}
                      columns={columns1}
                    />
                  </Card.Body>
                </Card>
              </Panel>
            </Collapse>

            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              size="lg"
            >
              <Modal.Header closeButton>
                <h6>Add Subject</h6>
              </Modal.Header>
              <Modal.Body>
                <Col xs={12}>
                  <PreferenceForm
                    onChange={inputChange}
                    // onClick={submitData}
                    onClick={toCreateClass}
                    loading={loading}
                    subjects={subjects}
                    newSubjects={newSubjects}
                    topics={topics}
                    newLevels={newLevels}
                    newCategories={newCategories}
                    levels={levels}
                    fields={fields}
                    data={data}
                    setData={setData}
                    setFields={setFields}
                    removeField={removeField}
                    addField={addField}
                    // catchFormValues={catchFormValues}
                  />
                </Col>
              </Modal.Body>
            </Modal>

            <div className="list-group">
              <div className="list-grid class-session"></div>
            </div>
            {/* <div className="divider divider-left"></div> */}
          </div>
        </div>

        {/* ******************************************************************** */}

        <div className="row p-4 justify-content-centesr">
          <div className="col-md-12 col-lg-12 custom-column">
            <Modal
              show={show2}
              onHide={handleClose2}
              backdrop="static"
              keyboard={false}
              size="md"
            >
              <Modal.Header closeButton>
                <h6>Add Course Work</h6>
              </Modal.Header>
              <Modal.Body>
                <Col xs={12}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Col xs={6} className="mb-2">
                      <Form.Label>Select Subject</Form.Label>
                      <select
                        name="subjects"
                        className="form-control"
                        onChange={(e) => {
                          setSubjectId(e.target.value);
                        }}
                      >
                        <option value="">Select</option>
                        {newSubjects
                          ? newSubjects.map((subject, index) => (
                              <option value={subject.id} key={index}>
                                {subject.name}
                              </option>
                            ))
                          : null}
                      </select>
                    </Col>
                    <input
                      type="file"
                      // value={selectedFile}
                      onChange={(e) => handlefile(e)}
                    />

                    {/* <UploadButton /> */}
                  </div>

                  <Col xs={6} className="mt-2">
                    <Button type="primary" onClick={handleCourseWork}>
                      Send For Approval
                    </Button>
                  </Col>
                </Col>
              </Modal.Body>
            </Modal>

            <div className="list-group">
              <div className="list-grid class-session"></div>
            </div>
            {/* <div className="divider divider-left"></div> */}
          </div>
          {/* <div className="col-md-6 col-lg-6">  
            {
              !isOpen ?         
                    
                  <div className="session-closed">
                    <Image src={icon} width="100" height="100" alt="closed" />
                    <h1>Class is closed</h1>
                    <div className="btn-group">
                      <button 
                        type="button" 
                        className="btn btn-warning btn-lg"
                        title="Start Video Class"
                        onClick={launchVideo}
                      >
                        <i className="fa fa-video"></i>
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-light btn-lg"
                        title="Launch Whiteboard"
                        onClick={createRoom}
                      >
                        <i className="fa fa-chalkboard"></i>
                      </button>
                    </div>                    
                    <p className="time">00:20:05 (to next class)</p>
                      <ul>
                        <li>Monday <span>2pm- 3pm</span></li>
                        <li>Tuesday <span>4pm- 6pm</span></li>
                        <li>Friday <span>2pm- 3pm</span></li>
                      </ul>
                  </div>
                :
                <div>

                  <div className="chat-wrapper">
                    <ChatBox>
                    {
                      msgs.map((message, id) => 
                        <Message 
                          key={id}
                          message={message.text}
                          style={message.sender}
                        />
                      )                
                    }                        
                    </ChatBox>
                  </div>
                </div>
              }   
          </div>
          <div className="col-md-3 col-lg-3 custom-column">
              <div className="divider divider-right"></div>
            <div className="accordion-wrapper">
              {
                Object.entries(course).length ?
                  <div>
                    <a href="#" onClick={toggleView}>
                      Participants <i className={expand ? "fa fa-chevron-up" : "fa fa-chevron-down"}></i>
                    </a>
                    {
                      expand ? 
                        <div className="accordion-content">
                          <div className="accordion-inner">
                              <p>
                                <a href="#" onClick={toggleChild}>
                                  Week 1 <i className={expandChild ? "fa fa-chevron-up" : "fa fa-chevron-down"}></i>
                                </a>
                              </p>
                              {
                                expandChild ? 
                                <div className="inner-content">
                                  <h3>{course.title}</h3>
                                  <p>
                                  {course.description ?? "No description"}
                                  </p>
                                  <div>
                                    <h5>Due Date</h5>
                                      <span className="due-date">{today}. ({currentTime})</span>
                                  </div>
                                  <div>
                                    <div className="btn-group">
                                      <button 
                                        type="button" 
                                        className="btn btn-warning btn-lg"
                                        title="Start Video Class"
                                        onClick={launchVideo}
                                      >
                                        <i className="fa fa-video"></i>
                                      </button>
                                      <button 
                                        type="button" 
                                        className="btn btn-light btn-lg"
                                        title="Launch Whiteboard"
                                        onClick={launchVideo}
                                      >
                                        <i className="fa fa-chalkboard"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                :
                                null
                              }
                          </div>
                        </div>
                      :
                      null
                    }
                  </div>
                : null
              }
            </div>
          </div> */}
        </div>
      </div>
    </DashboardLayout>
  );
}
