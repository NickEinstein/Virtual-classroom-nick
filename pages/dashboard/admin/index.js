import DashboardHeader from "../../../component/dashboard/header";
import DashboardLayout from "../../../component/dashboard/layout";
import ListGrid from "../../../component/dashboard/list/listGrid";
import ListItem from "../../../component/dashboard/list/listItem";
import { useState, useEffect, useContext } from "react";
import { post, get, patch } from "../../../services/fetch";
import axios from "axios";
import { Collapse, Button, Table, Form, Input, Modal } from "antd";
import { AuthContext } from "../../../store/context/authContext";
import moment from "moment";
import {
  Card,
  //   Table,
  // Modal,
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
  const [qualification, setQualification] = useState();
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

const [isModalOpen, setIsModalOpen] = useState(false);
const showModal = () => {
  setIsModalOpen(true);
};
const handleOk = () => {
  setIsModalOpen(false);
};
const handleCancel = () => {
  setIsModalOpen(false);
};

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

  const columnsTeacher = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    // {
    //   title: "Email",
    //   dataIndex: "email",
    //   key: "email",
    // },
    {
      title: "Phone number",
      dataIndex: "phone_number",
      key: "phone_number",
    },

    {
      title: "Address",
      dataIndex: "created_at",
      key: "id",
      width: "20%",
    },
    {
      title: "Degree",
      dataIndex: "degree",
      key: "id",
      width: "20%",
    },
    // {
    //   title: "Date Registered",
    //   dataIndex: "created_at",
    //   key: "id",
    //   width: "20%",
    // },
    {
      title: "Action",
      dataIndex: "action",
      key: "id",
      width: "20%",
      render: (_, record) => {
        console.log(record);
        //   const editable = isEditing(record);
        return (
          <div >
            <Button
            type="primary"
              onClick={() => DisplayQualifications(record)}
              style={{
                // backgroundColor: "#1C811C",
                // borderColor: "#1C811C",
                color: "white",
                width: "95%",
                marginBottom: "2px",
              }}
              
            >
              View Teacher's Note
            </Button>
            {record.approval == "false" && (
              <div>
                <Button
                  block
                  onClick={() => ApproveTeacher(record)}
                  style={{
                    backgroundColor: "#1C811C",
                    borderColor: "#1C811C",
                    color: "white",
                    width: "95%",
                  }}
                >
                  Approve Teacher
                </Button>
              </div>
            )}
          </div>
        );
      },
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
  }, []);

  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  const ApproveTeacher = async (load) => {
    console.log(load);
    const res = await patch({
      endpoint: `approve-teachers-account/${load.slug}`,
      //  body: payload,
    });

    if (res?.status == 200 || res?.status == 201) {
      Swal.fire({
        title: "Success",
        text: `${res?.data?.message}`,
        showCloseButton: true,
      });
    } else {
      Swal.fire({
        title: "Sorry",
        text: `${res?.data?.message}`,
        showCloseButton: true,
      });
    }
  };

   const DisplayQualifications = async (load) => {
              showModal()
              console.log(load)
              console.log(load?.qual?.relationships?.course_works)
        // {load?.relationship?.course_works?.map((e) => (

              setQualification(load)

   };

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
    if (res?.status == 200 || res?.status == 201) {
      Swal.fire({
        title: "Success",
        text: `${res?.data?.message}`,
        showCloseButton: true,
      });
    } else {
      Swal.fire({
        title: "Sorry",
        text: `${res?.data?.message}`,
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
    if (res?.status == 200) {
      // setStudents(res.data)
      let temp = res?.data?.data.map((e) => ({
        key: e?.id,
        id: e?.id,
        name: e?.name,
        age: e?.age,
        relationships: e?.relationships,
        created_at: moment(e?.created_at)?.format("ll"),
        updated_at: moment(e?.updated_at)?.format("ll"),
        deleted_at: e?.deleted_at,
      }));
      setStudents(temp);
    }
  };

  const getHeadTeachers = async () => {
    const res = await get({
      endpoint: "teachers",
      //  body: payload,
    });

    console.log(res);
    //  console.log(res);
    if (res?.status == 200) {
      let temp = res?.data?.data.map((e) => ({
        key: e.id,
        id: e.id,
        name: `${e?.firstname} ${e?.lastname}`,
        approval: e?.is_approved,
        slug: e?.slug,
        phone_number: e?.phone_number,
        address: e?.address,
        degree: e?.degree_attained,
        created_at: moment(e?.created_at).format("ll"),
        updated_at: moment(e?.updated_at).format("ll"),
        deleted_at: e?.deleted_at,
        qual:e
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
    if (res?.status == 200) {
      let temp = res?.data?.data.map((e) => ({
        key: e?.id,
        id: e?.id,
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
    if (res?.status == 200 || res?.status == 201) {
      Swal.fire({
        title: "Success",
        text: `${res?.data?.message}`,
        showCloseButton: true,
      });
    } else {
      Swal.fire({
        title: "Sorry",
        text: `${res?.data?.message}`,
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
        <DashboardHeader title="Head Teacher" />
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
                title="Teachers"
                dataCount={headTeacher.length}
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

        {/* <div style={{ width: "90%", margin: "0 auto" }}>
          <div className="mb-4" style={{ width: "100%" }}>
            <h2 className="h3">Students</h2>
            <Table bordered dataSource={students} columns={columns1} />
          </div>
          <div className="border mb-4" style={{ width: "100%" }}>
            <Table bordered dataSource={headTeacher} columns={columns1} />
          </div>
         
        </div> */}
        <div className="border mb-4" style={{ width: "100%" }}>
          <Table bordered dataSource={headTeacher} columns={columnsTeacher} />
        </div>
        {/* <Reminders/> */}
      </DashboardLayout>

      <Modal
        title="View Teachers's Notes"
        visible={isModalOpen}
        // onOk={handleOk}
        footer={false}
        onCancel={handleCancel}
      >
        {qualification?.qual?.relationships?.course_works?.map((e) => (
          <div className="w-100" style={{ display: "flex", alignItems:'center', justifyContent:'space-between' }}>
            <p>{e?.relationships?.subjects?.name}</p>
            <a href={e.pdf_link} target='_blank'>view</a>
            {/* <p>Some contents...</p> */}
          </div>
        ))}
      </Modal>
    </>
  );
}
