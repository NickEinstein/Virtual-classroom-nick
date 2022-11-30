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
  const [changer, setChanger] = useState(false);
  const [startTime, setStartTime] = useState("01:00");
  const [date, setDate] = useState();
  const [endTime, setEndTime] = useState("01:00");
  const [timeOfDay, setTimeOfDay] = useState("AM");
  const [categories, setCategories] = useState([]);
  const [categoriI, setCategorId] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [levels, setLevels] = useState([]);
  const [plans, setPlans] = useState([]);
  const [categoryColor, setCategoryColor] = useState(false);
  const [subjectColor, setSubjectColor] = useState(false);
  const [levelColor, setlevelColor] = useState(false);
  const [headTeacherColor, setheadTeacherColor] = useState(false);

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

  const columns1 = [
    {
      title: "Category",
      dataIndex: "title",
      key: "id",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "id",
    },
    {
      title: "Date Updated",
      dataIndex: "updated_at",
      key: "id",
      width: "20%",
    },
  ];

   const columnsLevel = [
     {
       title: "Level",
       dataIndex: "name",
       key: "id",
     },
     {
       title: "Description",
       dataIndex: "description",
       key: "id",
     },
     {
       title: "Date Updated",
       dataIndex: "updated_at",
       key: "id",
       width: "20%",
     },
   ];
   const columnsSubject = [
     {
       title: "Subject",
       dataIndex: "name",
       key: "id",
     },
     {
       title: "Description",
       dataIndex: "description",
       key: "id",
     },
     {
       title: "Date Updated",
       dataIndex: "updated_at",
       key: "id",
       width: "20%",
     },
   ];
   const columnsPlans = [
     {
       title: "Title",
       dataIndex: "title",
       key: "id",
     },
     {
       title: "Description",
       dataIndex: "description",
       key: "id",
     },
     {
       title: "Costs",
       dataIndex: "cost",
       key: "id",
     },
     {
       title: "Duration",
       dataIndex: "duration",
       key: "id",
     },
     {
       title: "Date Updated",
       dataIndex: "updated_at",
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
    getSubjects();
    getLevels();
    getPlans();
  }, [changer]);

  const onFinish = (values) => {
    console.log("Success:", values);

    //  moment().format("ll");
    createCategory(values);
  };
  const onFinishLevel = (values) => {
    console.log("Success:", values);

    //  moment().format("ll");
    createLevel({
      category_id: 2,
      ...values
    });
  };

  const onFinishSubjects = (values) => {
    console.log("Success:", values);

    //  moment().format("ll");
    createSubjects({
      category_id: 2,
      ...values,
    });
  };
   const onFinishPlans = (values) => {
     console.log("Success:", values);

     //  moment().format("ll");
     createPlans({
       properties: ["free video", "free food", "free email"],
       ...values,
     });
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
    // console.log(res.data.token)
    if (res) {
      setChanger(!changer)
    }
  };
  const createLevel = async (payload) => {
    // alert('hi')
    const res = await post({
      endpoint: "levels",
      body: payload,
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
    // console.log(res.data.token)
    if (res) {
      setChanger(!changer);

    }
  };
   const createSubjects = async (payload) => {
     // alert('hi')
     const res = await post({
       endpoint: "subjects",
       body: payload,
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
     // console.log(res.data.token)
     if (res) {
      setChanger(!changer);

     }
   };
    const createPlans = async (payload) => {
      // alert('hi')
      const res = await post({
        endpoint: "plans",
        body: payload,
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

        // setChanger(!changer);


      console.log(res);
      // console.log(res.data.token)
      if (res) {
        setChanger(!changer);
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
   const getLevels = async () => {
     //  console.log(moment("2022-10-10T01:01:23.000000Z").format("ll"));

     // alert('hi')
     const res = await get({
       endpoint: "levels",
       //  body: payload,
     });

     console.log(res);
     // console.log(res.data.token)
     if (res.status == 200) {
       let temp = res.data.data.map((e) => ({
         key: e.id,
         id: e.id,
         name: e?.name,
         description: e?.description,
         relationships: e?.relationships,
         created_at: moment(e?.created_at).format("ll"),
         updated_at: moment(e?.updated_at).format("ll"),
         deleted_at: e?.deleted_at,
       }));
       setLevels(temp);
     }
   };
   const getPlans = async () => {
     //  console.log(moment("2022-10-10T01:01:23.000000Z").format("ll"));

     // alert('hi')
     const res = await get({
       endpoint: "plans",
       //  body: payload,
     });

     console.log(res);
     // console.log(res.data.token)
     if (res.status == 200) {
       let temp = res.data.data.map((e) => (
        {
         key: e.id,
         id: e.id,
         title: e?.title,
         description: e?.description,
      slug: e.slug,
      cost: e.cost,
      properties: e.properties,
         duration: e?.duration,
         created_at: moment(e?.created_at).format("ll"),
         updated_at: moment(e?.updated_at).format("ll"),
         deleted_at: e?.deleted_at,
       }
       
       ));
       console.log(temp)
       setPlans(temp);
     }
   };
    const getSubjects = async () => {
      //  console.log(moment("2022-10-10T01:01:23.000000Z").format("ll"));

      // alert('hi')
      const res = await get({
        endpoint: "subjects",
        //  body: payload,
      });

      console.log(res);
      // console.log(res.data.token)
      if (res.status == 200) {
        let temp = res.data.data.map((e) => ({
          key: e.id,
          id: e.id,
          name: e?.name,
          description: e?.description,
          relationships: e?.relationships,
          created_at: moment(e?.created_at).format("ll"),
          updated_at: moment(e?.updated_at).format("ll"),
          deleted_at: e?.deleted_at,
        }));
        setSubjects(temp);
      }
    };
  // const createSubjects = async () => {
  //   // alert('hi')
  //   const res = await post({
  //     endpoint: "login",
  //     body: { ...details },
  //     auth: false,
  //   });

  //   console.log(res);
  //   // console.log(res.data.token)
  //   if (res.status == 200) {
  //   }
  // };

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
                title="Categories"
                dataCount={categories?.length}
                icon="ion-android-people"
                style="grid"
              />
              <ListItem
                title="Levels"
                dataCount={levels?.length}
                icon="ion-android-people"
                style="grid"
              />
              <ListItem
                title="Subjects"
                dataCount={plans?.length}
                icon="ion-ios-book"
                style="grid"
              />
            </ListGrid>
          </div>
        </div>

        <div style={{ width: "90%", margin: "0 auto" }}>
          <Collapse accordion>
            <Panel
              onClick={() => alert("ji")}
              header={<b style={categoryColor ? textColor : {}}>Categories</b>}
              style={categoryColor ? headingColor : {}}
              key="1"
            >
              <div className=" d-flex">
                <Form
                  className="mr-4"
                  style={{ width: "30%" }}
                  name="basic"
                  // labelCol={{
                  //   span: 8,
                  // }}
                  layout="vertical"
                  // wrapperCol={{
                  //   span: 16,
                  // }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Category"
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <TextArea rows={2} />
                  </Form.Item>

                  <div className="">
                    <Form.Item
                      wrapperCol={{
                        offset: 13,
                        // span: 16,
                      }}
                    >
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
                <div className="border" style={{ width: "100%" }}>
                  <Table bordered dataSource={categories} columns={columns1} />
                </div>
              </div>
            </Panel>
          </Collapse>
        </div>

        <div style={{ width: "90%", margin: "0 auto" }}>
          <Collapse accordion>
            <Panel
              onClick={() => alert("ji")}
              header={<b style={categoryColor ? textColor : {}}>Levels</b>}
              style={categoryColor ? headingColor : {}}
              key="1"
            >
              <div className=" d-flex">
                <Form
                  className="mr-4"
                  style={{ width: "30%" }}
                  name="basic"
                  // labelCol={{
                  //   span: 8,
                  // }}
                  layout="vertical"
                  // wrapperCol={{
                  //   span: 16,
                  // }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinishLevel}
                  // onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Level"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <TextArea rows={2} />
                  </Form.Item>

                  <div className="">
                    <Form.Item
                      wrapperCol={{
                        offset: 13,
                        // span: 16,
                      }}
                    >
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
                <div className="border" style={{ width: "100%" }}>
                  <Table bordered dataSource={levels} columns={columnsLevel} />
                </div>
              </div>
            </Panel>
          </Collapse>
        </div>

        <div style={{ width: "90%", margin: "0 auto" }}>
          <Collapse accordion>
            <Panel
              onClick={() => alert("ji")}
              header={<b style={categoryColor ? textColor : {}}>Subjects</b>}
              style={categoryColor ? headingColor : {}}
              key="1"
            >
              <div className=" d-flex">
                <Form
                  className="mr-4"
                  style={{ width: "30%" }}
                  name="basic"
                  // labelCol={{
                  //   span: 8,
                  // }}
                  layout="vertical"
                  // wrapperCol={{
                  //   span: 16,
                  // }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinishSubjects}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Subjects"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <TextArea rows={2} />
                  </Form.Item>

                  <div className="">
                    <Form.Item
                      wrapperCol={{
                        offset: 13,
                        // span: 16,
                      }}
                    >
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
                <div className="border" style={{ width: "100%" }}>
                  <Table
                    bordered
                    dataSource={subjects}
                    columns={columnsSubject}
                  />
                </div>
              </div>
            </Panel>
          </Collapse>
        </div>
        <div style={{ width: "90%", margin: "0 auto" }}>
          <Collapse accordion>
            <Panel
              // onClick={() => alert("ji")}
              header={<b style={categoryColor ? textColor : {}}>Plans</b>}
              style={categoryColor ? headingColor : {}}
              key="1"
            >
              <div className=" d-flex">
                <Form
                  className="mr-4"
                  style={{ width: "30%" }}
                  name="basic"
                  // labelCol={{
                  //   span: 8,
                  // }}
                  layout="vertical"
                  // wrapperCol={{
                  //   span: 16,
                  // }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinishPlans}
                  // onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Plan"
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <TextArea rows={2} />
                  </Form.Item>
                  <Form.Item
                    label="Cost"
                    name="cost"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Duration"
                    name="duration"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <div className="">
                    <Form.Item
                      wrapperCol={{
                        offset: 13,
                        // span: 16,
                      }}
                    >
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
                <div className="border" style={{ width: "100%" }}>
                  <Table bordered dataSource={plans} columns={columnsPlans} />
                </div>
              </div>
            </Panel>
          </Collapse>
        </div>

        {/* <Reminders/> */}
      </DashboardLayout>
    </>
  );
}
