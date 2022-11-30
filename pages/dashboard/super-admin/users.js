import DashboardHeader from "../../../component/dashboard/header";
import DashboardLayout from "../../../component/dashboard/layout";
import ListGrid from "../../../component/dashboard/list/listGrid";
import ListItem from "../../../component/dashboard/list/listItem";
import { useState, useEffect, useContext } from "react";
import { post, get } from "../../../services/fetch";
import axios from "axios";
import { Collapse, Button, Table, Form, Input } from "antd";
import { AuthContext } from "../../../store/context/authContext";
import moment from "moment";
import {
  Card,
  //   Table,
  Modal,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
// import PreferenceForm from "../../../component/preference-form";

export default function Tutor() {
  const [stats, setStats] = useState({});
  // const [showLink, setShowLink] = useState(false)
  const [link, setLink] = useState();
  const [showLink, setShowLink] = useState(false);
  const [engagements, setEngagements] = useState([]);
  const [user, setUser] = useContext(AuthContext);
  const route = useRouter();
  const [show, setShow] = useState(false);
  const [startTime, setStartTime] = useState("01:00");
  const [date, setDate] = useState();
  const [endTime, setEndTime] = useState("01:00");
  const [timeOfDay, setTimeOfDay] = useState("AM");
  const [categories, setCategories] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [categoryColor, setCategoryColor] = useState(false);
  const [subjectColor, setSubjectColor] = useState(false);
  const [levelColor, setlevelColor] = useState(false);
  const [headTeacherColor, setheadTeacherColor] = useState(false);
  const [headTeacher, setHeadTeacher] = useState([]);

  const [engagement_id, setEngagement_id] = useState("AM");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { Panel } = Collapse;
  const { TextArea } = Input;

  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

  // const dataSource1 = [
  //   {
  //     key: "1",
  //     name: "Mike",
  //     age: 32,
  //     address: "10 Downing Street",
  //   },
  //   {
  //     key: "2",
  //     name: "John",
  //     age: 42,
  //     address: "10 Downing Street",
  //   },
  // ];

  const columns1 = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Date Registered",
      dataIndex: "created_at",
      key: "id",
      width: "20%",
    },
  ];

  const columnsHeadTeacher = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Date Registered",
      dataIndex: "created_at",
      key: "id",
      width: "20%",
    },
  ];

  const headingColor = {
    backgroundColor: "#4166f5",
  };
  const textColor = {
    color: "white",
  };

  useEffect(() => {
    getCategories();
    getStudents();
    getHeadTeachers();
    getTeacherss()
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);

    //  moment().format("ll");
    createCategory(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const createCategory = async (payload) => {
    // alert('hi')
    const res = await post({
      endpoint: "categories",
      body: payload,
    });

    console.log(res);
    // console.log(res.data.token)
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

  const getStudents = async () => {
    // getTeachers;
    const res = await get({
      endpoint: "students",
      //  body: payload,
    });

    console.log(res);
    console.log(res);
    if (res.status == 200) {
      // setStudents(res.data)
      let temp = res.data.data.map((e) => ({
        key: e.id,
        id: e.id,
        name: e?.name,
        age: e?.age,
        relationships: e?.relationships,
        created_at: moment(e?.created_at).format("ll"),
        updated_at: moment(e?.updated_at).format("ll"),
        deleted_at: e?.deleted_at,
      }));
      setStudents(temp);
    }
  };

   const getTeacherss = async () => {
     // getTeachers;
     const res = await get({
       endpoint: "teachers",
       //  body: payload,
     });

     console.log(res);
     console.log(res);
    //  if (res.status == 200) {
    //    // setStudents(res.data)
    //    let temp = res.data.data.map((e) => ({
    //      key: e.id,
    //      id: e.id,
    //      name: e?.name,
    //      age: e?.age,
    //      relationships: e?.relationships,
    //      created_at: moment(e?.created_at).format("ll"),
    //      updated_at: moment(e?.updated_at).format("ll"),
    //      deleted_at: e?.deleted_at,
    //    }));
    //    setTeachers(temp);
    //  }
   };


  const getHeadTeachers = async () => {
    const res = await get({
      endpoint: "admins",
      //  body: payload,
    });

    console.log(res);
    //  console.log(res);
    if (res.status == 200) {
      let temp = res.data.data.map((e) => ({
        key: e.id,
        id: e.id,
        name: `${e?.firstname} ${e?.firstname}`,
        email: e?.email,
        phone_number: e?.phone_number,
        created_at: moment(e?.created_at).format("ll"),
        updated_at: moment(e?.updated_at).format("ll"),
        deleted_at: e?.deleted_at,
      }));
      setHeadTeacher(temp);
    }
  };

  const getCategories = async () => {
    //  console.log(moment("2022-10-10T01:01:23.000000Z").format("ll"));

    // alert('hi')
    const res = await get({
      endpoint: "categories",
      //  body: payload,
    });

    console.log(res);
    // console.log(res.data.token)
    if (res.status == 200) {
      let temp = res.data.data.map((e) => ({
        key: e.id,
        id: e.id,
        title: e?.title,
        description: e?.description,
        relationships: e?.relationships,
        created_at: moment(e?.created_at).format("ll"),
        updated_at: moment(e?.updated_at).format("ll"),
        deleted_at: e?.deleted_at,
      }));
      setCategories(temp);
    }
  };
  const createSubjects = async () => {
    // alert('hi')
    const res = await post({
      endpoint: "login",
      body: { ...details },
      auth: false,
    });

    console.log(res);
    // console.log(res.data.token)
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

  function getUser() {
    axios
      .get(`https://theclassroom.ci-auction.ng/api/v1/tutor/${user.id}`)
      .then((response) => {
        if (response.data.status) {
          let teacher = response.data.data;
          if (!teacher.qualifications.length) {
            route.push("tutor/profile-update");
          }
          setUser(response.data.data);
        }
      });
    // .catch(err => console.log("error", err))
  }

  console.log(categoryColor);

  return (
    <>
      <DashboardLayout>
        <DashboardHeader title="Super Admin" />
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
                title="Students"
                dataCount={students?.length}
                icon="ion-android-people"
                style="grid"
              />
              <ListItem
                title="Head Teachers"
                dataCount={headTeacher?.length}
                icon="ion-android-people"
                style="grid"
              />
              <ListItem
                title="Subscriptions"
                dataCount={user.courses ? user.courses.length : 0}
                icon="ion-ios-book"
                style="grid"
              />
            </ListGrid>
          </div>
        </div>

        <div style={{ width: "90%", margin: "0 auto" }}>
          <div className="mb-4" style={{ width: "100%" }}>
            <h2 className="h3">Students</h2>
            <Table bordered dataSource={students} columns={columns1} />
          </div>
          <div className="mb-4" style={{ width: "100%" }}>
            <h2 className="h3">Head Teacher</h2>

            <Table
              bordered
              dataSource={headTeacher}
              columns={columnsHeadTeacher}
            />
          </div>
          {/*<div className="border mb-4" style={{ width: "100%" }}>
            <Table bordered dataSource={dataSource1} columns={columns1} />
          </div> */}
        </div>
        {/* <Reminders/> */}
      </DashboardLayout>
    </>
  );
}
