import DashboardHeader from "../../../component/dashboard/header";
import DashboardLayout from "../../../component/dashboard/layout";
import Reminders from "../../../component/dashboard/reminder/reminders";
import nerd from "../../../public/images/banners/class-tutor.png";
import Image from "next/dist/client/image";
import ListGrid from "../../../component/dashboard/list/listGrid";
import ListItem from "../../../component/dashboard/list/listItem";
import { useState, useEffect, useContext } from "react";
import { post, get } from "../../../services/fetch";
import axios from "axios";
import { AuthContext } from "../../../store/context/authContext";
import { Card, Modal, Form, Row, Col, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import { Table, Button } from "antd";
import PreferenceForm from "../../../component/preference-form";
import Swal from "sweetalert2";

export default function Tutor() {
  const [stats, setStats] = useState({});
  // const [showLink, setShowLink] = useState(false)
  const [link, setLink] = useState();
  const [showLink, setShowLink] = useState(false);
  const [engagements, setEngagements] = useState([]);
  const [user, setUser] = useContext(AuthContext);
  const [student, setStudent] = useState(0);
  const route = useRouter();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [dataz2, setDataz2] = useState([]);
  const [dataz3, setDataz3] = useState([]);
  const [date, setDate] = useState();
  const [unApproved, setUnApproved] = useState(true);
  const [unApprovedNo, setUnApprovedNo] = useState(true);
  const [approved, setApproved] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState("AM");
  const [call, setCall] = useState(false);
  const [engagement_id, setEngagement_id] = useState("AM");
  const [no_Of_Students, setNo_Of_Students] = useState();
  const [no_Of_Engagements, setNo_Of_Engagements] = useState();
  const [teachersClasses, setTeachersClasses] = useState();
  const [selectedTeacherClassId, setSelectedTeacherClassId] = useState();

  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const handleShow = () => setShow(true);
  const handleShow2 = () => setShow2(true);

  useEffect(() => {
    // console.log(user)
    //     localStorage.getItem("role");
    // console.log(
    //   // localStorage.getItem("role")

    // )
    getEngagements();
    getTeachersClasses();
    toGetUserProfile();

    // if(route.isReady) {
    //   getUser()
    //   analytics()
    // }
  }, []);

  useEffect(() => {
    getApproved();
    getUnApproved();
    // console.log(user)
    //     localStorage.getItem("role");
    // console.log(
    //   // localStorage.getItem("role")
    // )
    // if(route.isReady) {
    //   getUser()
    //   analytics()
    // }
  }, [engagements]);

  function analytics() {
    let userID = user.id;
    axios
      .get(`https://theclassroom.ci-auction.ng/api/v1/tutor/stats/${userID}`)
      .then((response) => {
        console.log(response);
        if (response?.data?.status) {
          setStats(response?.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getTeachersClasses = async () => {
    const res = await get({
      endpoint: `classes`,
      // body: payload,
      // auth: false,
    });

    console.log(res);
    setTeachersClasses(res?.data?.data);

    if (res) {
      // setCall(!call)
    }
  };

  const catchEngagements = (man) => {
    const eng = man?.filter((e) => e?.status == "false");

    const stud = man?.filter((e) => e?.status == "true");

    console.log(stud);
    console.log(eng);
    // setNo_Of_Students;
    setNo_Of_Engagements(eng);
    setNo_Of_Students(stud);
  };

  const toAccept = async (id) => {
    console.log(id);
    let payload = {
      class_id: +selectedTeacherClassId,
      engagement_id: +engagement_id,
    };

    console.log(payload);
    const res = await post({
      endpoint: `approve-teachers-engagement`,
      body: payload,
      // auth: false,
    });

    if (res?.status == 200) {
      Swal.fire({
        title: "Success",
        text: `${res.data.message}`,
        showCloseButton: true,
      });

      handleClose();
      handleClose2();
    } else {
      Swal.fire({
        title: "",
        text: `${res.data.message}`,
        showCloseButton: true,
      });
    }
  };

  const addToClass = (rec) => {
    setEngagement_id(rec.key);
    // console.log(rec)
    handleShow();
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
    // setClasses(res?.data?.data?.details?.relationships.classes);
    // setTeachersClasses(res?.data?.data?.details?.relationships?.classes);
    // setUserSubjects(res?.data?.data?.details?.relationships?.classes);

    // console.log(res.data.data.details.subjects[0])
    // setAddedSubjects(res.data.data.details.subjects[0])
  };

  const toMeet = async (payload) => {
    //   console.log(id)
    //   let payload = {
    //     class_time : "13:20:00",
    //     class_date : "2022-09-14",
    //     engagement_id : +id
    // }
    console.log(payload);
    const res = await get({
      endpoint: `get-meeting-link/${payload.meetingId}`,
      // body: payload,
      // auth: false,
    });
    console.log(res);
    // setLink(res?.data?.data);
    setLink(res?.data?.data?.zoom?.url);
    setShowLink(!showLink);
    handleShow2(true);

    if (res?.status == 200 || res?.status == 201) {
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

  const columns1 = [
    {
      title: "Day",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "age",
    },
    {
      title: "Time ",
      dataIndex: "status",
      key: "id",
      width: "20%",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        //   const editable = isEditing(record);
        return (
          <Button
            block
            onClick={() => addToClass(record)}
            style={{
              backgroundColor: "#1C811C",
              borderColor: "#1C811C",
              color: "white",
              width: "95%",
            }}
          >
            Add to a Class
          </Button>
        );
      },
    },
    {
      title: "Join Meeting",
      dataIndex: "action",
      render: (_, record) => {
        //   const editable = isEditing(record);
        return (
          <Button
            block
            onClick={() => toMeet(record)}
            style={{
              backgroundColor: "#1C811C",
              borderColor: "#1C811C",
              color: "white",
              width: "95%",
            }}
          >
            Generate Meeting Link
          </Button>
        );
      },
    },
  ];
  const columns2 = [
    {
      title: "Day",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "age",
    },
    {
      title: "Time ",
      dataIndex: "status",
      key: "id",
      width: "20%",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        //   const editable = isEditing(record);
        return (
          <Button
            block
            onClick={() => addToClass(record)}
            style={{
              backgroundColor: "#1C811C",
              borderColor: "#1C811C",
              color: "white",
              width: "95%",
            }}
          >
            Add to a Class
          </Button>
        );
      },
    },
  ];

  const columns3 = [
    {
      title: "Day",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "age",
    },
    {
      title: "Time ",
      dataIndex: "status",
      key: "id",
      width: "20%",
    },
    //  {
    //    title: "Action",
    //    dataIndex: "action",
    //    render: (_, record) => {
    //      //   const editable = isEditing(record);
    //      return (
    //        <Button
    //          block
    //          onClick={() => addToClass(record)}
    //          style={{
    //            backgroundColor: "#1C811C",
    //            borderColor: "#1C811C",
    //            color: "white",
    //            width: "95%",
    //          }}
    //        >
    //          Add to a Class
    //        </Button>
    //      );
    //    },
    //  },
    {
      title: "Join Meeting",
      dataIndex: "action",
      render: (_, record) => {
        //   const editable = isEditing(record);
        return (
          <Button
            block
            onClick={() => toMeet(record)}
            style={{
              backgroundColor: "#1C811C",
              borderColor: "#1C811C",
              color: "white",
              width: "95%",
            }}
          >
            Generate Meeting Link
          </Button>
        );
      },
    },
  ];

  const getUnApproved = () => {
    // alert('ji')
    const datazz = engagements?.filter((e, idx) => e?.status == `false`);
    setUnApproved(true);
    setUnApprovedNo(engagements?.filter((e, idx) => e?.status == `false`));
    setApproved(false);
    console.log(datazz);
    setDataz2(
      datazz?.map((e, idx) => ({
        name: e?.relationships?.student?.name,
        subject: e?.relationships?.subject?.name,
        status:
          e?.status && e.status == "false" ? "Pending Approval" : "Approved",
        key: e?.id,
        meetingId: e?.class_meeting_id,
      }))
    );
  };

  const getApproved = () => {
    //  alert("ji");
    const datazz = engagements?.filter((e, idx) => e?.status !== `false`);

    setApproved(true);
    setUnApproved(false);
    // console.log(datazz);

    setDataz3(
      datazz?.map((e, idx) => ({
        name: e?.relationships?.student?.name,
        subject: e?.relationships?.subject?.name,
        status:
          e?.status && e?.status == "false" ? "Pending Approval" : "Approved",
        key: e.id,
        meetingId: e?.class_meeting_id,
      }))
    );
  };

  const dataz = engagements?.map((e, idx) => ({
    name: e?.relationships?.student?.name,
    subject: e?.relationships?.subject?.name,
    status: e?.status && e?.status == "false" ? "Pending Approval" : "Approved",
    key: e.id,
    meetingId: e?.class_meeting_id,
  }));

  console.log(engagements);

  const data = [
    {
      title: "Name",
      dataIndex: "name",
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

  const getEngagements = async () => {
    const res = await get({
      endpoint: `get-all-engagements`,
      //  body: payload,
      // auth: false,
    });
    console.log(res.data.data);
    setEngagements(res.data.data);
    catchEngagements(res.data.data);
  };

  const timeSetters = (e) => {
    setStartTime(e);
    // alert(e.replace('00','30'))
    setEndTime(e.replace("00", "30"));
    // setStartTime(e)
  };

  function getUser() {
    axios
      .get(`https://theclassroom.ci-auction.ng/api/v1/tutor/${user.id}`)
      .then((response) => {
        if (response?.data?.status) {
          let teacher = response?.data?.data;
          if (!teacher?.qualifications?.length) {
            route.push("tutor/profile-update");
          }
          setUser(response?.data?.data);
        }
      });
    // .catch(err => console.log("error", err))
  }

  return (
    <>
      <DashboardLayout>
        <DashboardHeader title="Subject Teacher" />
        <div className="row mb-3 mt-3">
          {/* <!-- Welcome card --> */}
          {/* <div className="col-md-3 col-lg-3 mb-3">
            <div className="welcome-card card">
              <h4>Welcome <br/>{user.last_name}!</h4>                
              <p>
                Use your dashboard to have an overview of your activities and progress, don’t forget to update your profile too.
              </p>

              <Image src={nerd} layout="responsive"  alt="nerd"/>
            </div>
          </div> */}
          <div className="col-md-12 col-lg-12 no-paddings mb-3">
            <ListGrid>
              <ListItem
                title="Engagements"
                dataCount={dataz2 && dataz2.length}
                icon="ion-android-people"
                style="grid"
                click={() => getUnApproved()}
              />

              <ListItem
                title="Students"
                dataCount={dataz3 && dataz3.length}
                // dataCount={no_Of_Students && no_Of_Students.length}
                icon="ion-android-people"
                style="grid"
                click={() => getApproved()}
                // onClick={}
              />

              <ListItem
                title="Weekly Classes"
                dataCount={teachersClasses ? teachersClasses.length : 0}
                icon="ion-ios-book"
                style="grid"
              />
            </ListGrid>
            {/* *********************** Graph for analytics************************************************* */}
            {/* <div className="d-flex justify-content-betweens">
              <div className="analytics card col-md-8">
                <div className="card-header">
                  <div>
                    <span className="title">Hours spent</span>{" "}
                    <span className="sub-title">in classNamees</span>
                  </div>
                  <form action="#">
                    <select name="period" id="period">
                      <option value="">This week</option>
                      <option value="">Last week</option>
                    </select>
                  </form>
                </div>
                <div className="chart">
                  <div className="chart-item">
                    <div className="chart-bar" duration="2hrs" title="MON">
                      <div
                        className="bar-filled"
                        style={{ height: 15 + "%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="chart-item">
                    <div className="chart-bar" duration="2.5hrs" title="TUE">
                      <div
                        className="bar-filled"
                        style={{ height: 20 + "%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="chart-item">
                    <div className="chart-bar" title="WED" duration="16hrs">
                      <div
                        className="bar-filled"
                        style={{ height: 75 + "%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="chart-item">
                    <div className="chart-bar" duration="8hrs" title="THUR">
                      <div
                        className="bar-filled"
                        style={{ height: 37.5 + "%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="chart-item">
                    <div className="chart-bar" duration="20hrs" title="FRI">
                      <div
                        className="bar-filled"
                        style={{ height: 85 + "%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="chart-item">
                    <div className="chart-bar" duration="8.6hrs" title="SAT">
                      <div
                        className="bar-filled"
                        style={{ height: 40.5 + "%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="chart-item">
                    <div className="chart-bar" duration="23hrs" title="SUN">
                      <div
                        className="bar-filled"
                        style={{ height: 95 + "%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* *********************** Graph for analytics************************************************* */}
          </div>
        </div>

        {approved && <Table bordered dataSource={dataz3} columns={columns3} />}

        {unApproved && (
          <Table bordered dataSource={dataz2} columns={columns2} />
        )}

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <h6>Set up class</h6>
          </Modal.Header>
          <Modal.Body>
            <div className="col">
              <select
                placeholder="Enter Subject"
                name="subjects"
                className="form-control"
                onChange={(e) => setSelectedTeacherClassId(e.target.value)}
              >
                <option value="">Select Class</option>
                {teachersClasses
                  ? teachersClasses.map((e, index) => (
                      <option key={e.id} value={e.id} title={e.subject}>
                        {`${e.subject} - ${e.day} -  ${e.time} `}
                      </option>
                    ))
                  : null}
              </select>
              <Button
                onClick={toAccept}
                block
                htmlType="submit"
                style={{
                  backgroundColor: "#1C811C",
                  borderColor: "#1C811C",
                  color: "white",
                  width: "95%",
                  marginTop: "20px",
                }}
              >
                Accept student
              </Button>
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          show={show2}
          onHide={handleClose2}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <h6>Join Your Class</h6>
          </Modal.Header>
          <Modal.Body>
            <Button block>
              <a href={link} target="_blank">
                Join Class
              </a>
            </Button>
          </Modal.Body>
        </Modal>
        {/* <Reminders/> */}
      </DashboardLayout>
    </>
  );
}
