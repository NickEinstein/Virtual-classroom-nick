import DashboardHeader from "../../../component/dashboard/header";
import DashboardLayout from "../../../component/dashboard/layout";
import { useState, useEffect, useContext } from "react";
import styles from "./courses.module.scss";
import Course from "../../../component/dashboard/course/course";
import Swal from "sweetalert2";
import axios from "axios";
import ChildrenCard from "../../../component/ChildrenCards";
import ShopContext from "../../../store/context/shopContext";
import { AuthContext } from "../../../store/context/authContext";
import { post, get, patch } from "../../../services/fetch";
import Categories from "../../../component/dashboard/course/categories";
import Category from "../../../component/dashboard/course/category";
import { useRouter } from "next/router";
import { Button } from "antd";
import { Form, Col, Row, Card, Modal, Spinner } from "react-bootstrap";
import PreferenceForm from "../../../component/preference-form";
import { Space, Table, Tag } from "antd";
import TeachersProfile from "../../../component/homepage/TeachersProfile";
import SearchForm from "../../../component/homepage/search-form";

export default function Courses() {
  const courseContext = useContext(ShopContext);

  const [searchResult, setSearchResult] = useState([]);
  const [user, setUser] = useContext(AuthContext);
  const [engagements, setEngagements] = useState([]);
  const [courses, setCourses] = useState([]);
  const [link, setLink] = useState([]);
  const [parent, setparent] = useState([]);
  const [individualClasses, setIndividualClasses] = useState([]);
  // const router = useRouter()
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);

  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tablename, setTableName] = useState("");
  // const [subjects, setSubjects] = useState([])

  const fieldList = [
    {
      week_day: "",
      class_time: "",
    },
  ];
  const [fields, setFields] = useState(fieldList);
  const userData = {
    periods: fields,
    user_id: user.id,
  };
  const [data, setData] = useState(userData);

  useEffect(() => {
    // getCourses()
    toGetUserProfile();
    toGetEngagements();
    // getCategories()
  }, [0]);

  const getClassFillTable = async (id,name) => {
    const res = await get({
      endpoint: `students/${id}`,
      //  body: payload,
    });

    console.log(res?.data?.data?.relationships?.engagements);
    //  setIndividualClasses(res?.data?.data?.relationships?.classes);
    fillTable(res?.data?.data?.relationships?.engagements, name);
  };

  const toGetEngagements = async () => {
    // console.log(load);
    const res = await get({
      endpoint: `get-all-engagements`,
      //  body: payload,
    });

    setEngagements(res?.data?.data);

    // console.log(res.data.data)
    // setparent(res.data.data.details.relationships.students);
    // console.log(res.data.data.details.relationships.students);
  };

  const toGetUserProfile = async () => {
    // console.log(load);
    const res = await get({
      endpoint: `user-profile`,
      //  body: payload,
    });
    setparent(res?.data?.data?.details?.relationships?.students);
    //  console.log(res.data.data.details.relationships.students);
  };

  function categoryFilter(event) {
    const { name, value } = event.target;
    let results = courseContext.categories.filter(
      (category) =>
        category.name.includes(value) ||
        category.name.toLowerCase().includes(value)
    );
    setSearchResult(results);
  }

  function selected(id) {
    let selected_course = courseContext.categories.filter((c) => c.id === id);
    setCategory(selected_course[0]);
    // console.log('===', router.pathname)
    router.push(`${router.pathname}/${id}`);
  }

  const fillTable = (tam, name) => {
    console.log(tam);
    // let tableholder = tam?.relationships?.student.map((e, idx) => ({
    //   key: idx,
    //   name: e.name,
    //   subject: e.name,
    //   // day: e.day,
    //   // time: e.time,
    //   joinMeet: tam?.class_meeting_id,
    // }));

    let tableholder = tam.map((tam, idx) => ({
      key: idx,
      name: name,
      subject: tam?.relationships?.subject?.name,
      day: tam?.relationships?.class?.day,
      // day: tam?.relationships?.subject?.dat,

      time:
        tam.status == "true" &&
        `${tam?.relationships?.class?.time} ${tam?.relationships?.class?.variation}`,

      joinMeet: tam?.relationships?.class?.id,
    }));

    setTableDataz(tableholder);

    // console.log(tableholder)

    // let tableholder = tam?.relationships?.classes?.map((e,idx) => ({
    //   key:idx,
    //   name: tam.name,
    //   subject: e.subject,
    //   meeting_id: e.meeting_id,
    //   day: e.day,
    //   time: e.time,
    //   joinMeet: tam?.relationships?.engagements[idx].class_meeting_id,
    // }));

    // setTableDataz(tableholder)

    // console.log(tableholder)
  };

  function getCourses() {
    axios
      .get(`https://theclassroom.ci-auction.ng/api/v1/courses`)
      .then((response) => {
        if (response.data.status) {
          console.log(response.data.data.data);
          // setCourses(response.data.data.data)
          setSearchResult(response.data.data.data);
        }
      });
  }

  function getCategories() {
    axios
      .get(`https://theclassroom.ci-auction.ng/api/v1/category`)
      .then((response) => {
        if (response.data.status) {
          setSubjects(response.data.data.data);
        }
      });
  }

  function inputChange(event) {
    const { name, value } = event.target;
    setformData({ ...formdata, [name]: value });
    console.log("name", name);
    console.log("value", value);
    if (name === "subject") {
      selectLevel(value);
    }
    if (name === "topic") {
      setTopics(value);
    }
  }

  const [subjects, setSubjects] = useState([]);
  const [userSubjects, setUserSubjects] = useState([]);
  const [formdata, setformData] = useState({ user_id: user.id });
  const [showClass, setshowClass] = useState(false);

  const [topics, setTopics] = useState([]);
  const [levels, setLevel] = useState([]);
  const [tableDataz, setTableDataz] = useState([]);

  const addToAClass = () => setshowClass(true);

  function inputChange(event) {
    const { name, value } = event.target;
    setformData({ ...formdata, [name]: value });
    setData({ ...data, [name]: value });
    if (name === "subject") {
      selectTopic(value);
    }
    if (name === "topic") {
      selectLevel(value);
    }
  }

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

  function selectLevel(id) {
    let level = topics.filter((topic) => topic.id == id)[0].levels;
    setLevel(level);
  }

  function selectTopic(id) {
    let level = subjects.filter((subject) => subject.id == id)[0].courses;
    setTopics(level);
  }

  function getCategories() {
    axios
      .get(`https://theclassroom.ci-auction.ng/api/v1/category`)
      .then((response) => {
        if (response.data.status) {
          setSubjects(response.data.data.data);
        }
      });
  }

  function getCourses() {
    axios
      .get(
        `https://theclassroom.ci-auction.ng/api/v1/student/${user.id}/subjects`
      )
      .then((response) => {
        console.log("student", response);
        if (response.data.status) {
          setUserSubjects(response.data.data);
        }
      });
  }

  function submitData() {
    setLoading(true);
    axios
      .post("https://theclassroom.ci-auction.ng/api/v1/add-subject", data)
      .then((response) => {
        if (response.data.status) {
          Swal.fire({
            title: "Success",
            text: response.data.message,
            showCloseButton: true,
          }).then(() => window.location.reload());
        }
      })
      .catch((err) => {
        if (err.response) {
          let message;
          if (
            err.response.status == 422 ||
            err.response.status == 200 ||
            err.response.status == 401 ||
            err.response.status == 404
          ) {
            if (err.response.data.errors) {
              let errors = err.response.data.errors;
              let errorList = Object.values(errors);
              errorList.map((msg) => {
                message = msg;
              });
            }
            Swal.fire({
              title: "Error",
              text: err.response.data.message || message,
              icon: "error",
              confirmButtonText: "Close",
            });
          }
        }
      })
      .finally(() => setLoading(false));
  }

  function payNow(id) {
    let amount = userSubjects.filter((subject) => subject.subject_id === id)[0]
      .fee;
    // setPayment({...payment, ['amount']: amount, ['subject']: id})
    payWithPaystack(amount, id);
  }

  function payWithPaystack(amount, subject) {
    var handler = PaystackPop.setup({
      key: "pk_test_741bc055b3cfde6f6c5244d89a38b99532d13ea2",
      email: user.email,
      amount: amount * 100,
      currency: "NGN",
      ref: "" + Math.floor(Math.random() * 1000000000 + 1),
      metadata: {
        userID: user.id,
        child: [],
        course: subject,
      },
      callback: function (response) {
        // alert('success. transaction ref is ' + response.reference);
        console.log("Response from paystack", response);
        verifyPayment(response.reference);
      },
      onClose: function () {
        // alert('window closed');
      },
    });
    handler.openIframe();
  }

  function verifyPayment(reference) {
    axios
      .post(`https://theclassroom.ci-auction.ng/api/v1/payment/verify`, {
        // courses: courseIds,
        user_id: user.id,
        reference: reference,
      })
      .then((response) => {
        // console.log(response)
        if (response.data.status) {
          Swal.fire({
            title: "Payment",
            icon: "success",
            text: "Payment successful",
          }).then(() => {
            window.location.reload();
          });
        }
      })
      .catch((err) => console.log(err));
  }

  function startClass(subject_id) {
    setLoading(true);
    axios
      .post(`https://theclassroom.ci-auction.ng/api/v1/classroom/join`, {
        user_id: user.id,
        subject_id: subject_id,
      })
      .then((response) => {
        // console.log("CLASSROOM", response)
        if (response.data.status) {
          if (response.data.data !== "") {
            window.location.href = response.data.data;
          }
          // Swal.fire({
          //   title: 'Payment',
          //   icon: 'success',
          //   text: 'Payment successful'
          // })
          // .then(() => {
          //   window.location.reload()
          // })
        }
      })
      .catch((err) => {
        if (err.response) {
          let message;
          if (
            err.response.status == 422 ||
            err.response.status == 200 ||
            err.response.status == 401 ||
            err.response.status == 404
          ) {
            if (err.response.data.errors) {
              let errors = err.response.data.errors;
              let errorList = Object.values(errors);
              errorList.map((msg) => {
                message = msg;
              });
            }
            Swal.fire({
              title: "Error",
              text: err.response.data.message || message,
              icon: "error",
              confirmButtonText: "Close",
            });
          }
        }
      })
      .finally(() => setLoading(false));
  }

  function getWeekDay(periods) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let date = new Date();
    return Object.keys(periods).includes(days[date.getDay()]);
  }

  const joinTheMeeting = async (record) => {
    const res = await get({
      endpoint: `get-meeting-link/${record.joinMeet}`,
      //  body: payload,
    });

    setShow2(true);

    // setLink(res.data.data);
    setLink(res.data.data?.zoom?.url);

    console.log(res.data.data);

    // get - meeting - link / 11;
    // console.log(record)
  };

  const dataz = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "age",
    },
    {
      title: "Day",
      dataIndex: "day",
      key: "address",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "address",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.joinMeet ? (
          <Button
            style={{
              backgroundColor: "#4166f5",
              color: "white",
              borderRadius: "16px",
            }}
            onClick={() => joinTheMeeting(record)}
            // color="primary"
            // className={"btn btn-default btn-sm text-white " + style.btn}
            size="large"
          >
            {/* <a>Invite {record.name}</a> */}
            <a>Get Class Link</a>
          </Button>
        ) : (
          <Button disabled type="primary">
            Awaiting Admittance
          </Button>
        ),
    },
  ];

  return (
    <DashboardLayout>
      <DashboardHeader title="My Courses" />
      <div className="dashboard">
        <div className="d-flex">
          {parent?.map((e) => (
            <div
              class="m-r-3"
              style={{ marginRight: "5px" }}
              onClick={() => {
                getClassFillTable(e?.id,e?.name);
                setTableName(e?.name);
              }}
              // onClick={() => fillTable(e)}
            >
              <ChildrenCard details={e} />
            </div>
          ))}
        </div>
        {/* <ChildrenCard/> */}

        <div className="row p-4">
          <div className="col-md-12 col-lg-12">
            <div className="list-groups">
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
              >
                <Modal.Header closeButton>
                  {/* <h6>Add Subject</h6> */}
                </Modal.Header>
                <Modal.Body>
                  <Col xs={12}>
                    <PreferenceForm
                      onChange={inputChange}
                      onClick={submitData}
                      loading={loading}
                      subjects={subjects}
                      topics={topics}
                      levels={levels}
                      fields={fields}
                      data={data}
                      setData={setData}
                      setFields={setFields}
                      removeField={removeField}
                      addField={addField}
                    />
                  </Col>
                </Modal.Body>
              </Modal>
              <Card>
                <Card.Header className="bg-white d-flex justify-content-between">
                  {/* <div class="d-flex align-items-center">
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
                  </div> */}
                  <div
                    className="searchs border"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {/* <input
                      type="text"
                      name="search"
                      placeholder="Find Courses"
                      className="form-control"
                      onKeyUp={filterSubjects}
                    /> */}
                    <Button type="primary" onClick={addToAClass}>
                      Add child to class
                    </Button>
                  </div>
                </Card.Header>
                <Card.Body className="table-responsive">
                  <Table columns={columns} dataSource={tableDataz} />

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

                  {/* <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Level</th>
                        <th>Periods</th>
                        <th>Fee</th>
                        <th>Payment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userSubjects && userSubjects.length
                        ? userSubjects.map((course, id) => (
                            <tr key={id}>
                              <td>{course.title}</td>
                              <td>{course.level}</td>
                              <td>
                                {course.periods && course.periods.length
                                  ? course.periods.map((period, index) => (
                                      <h6
                                        key={index}
                                        className="text-sm text-primary"
                                      >
                                        {period.day +
                                          " : " +
                                          period.start_end_time}
                                      </h6>
                                    ))
                                  : null}
                              </td>
                              <td>₦{course.fee_formatted}</td>
                              <td>
                                <div className="btn-group">
                                  <button
                                    type="button"
                                    className={
                                      course.payment_status === "SUCCESS"
                                        ? "btn-flat btn-sm bg-success"
                                        : "btn-flat btn-sm bg-danger"
                                    }
                                  >
                                    {course.payment_status === "SUCCESS" ? (
                                      <i
                                        className="fas fa-check-circle text-white"
                                        title="PAID"
                                      ></i>
                                    ) : (
                                      <i
                                        className="fas fa-lock text-white"
                                        title="PENDING"
                                      ></i>
                                    )}
                                  </button>
                                  {course.payment_status === "SUCCESS" ? (
                                    <button
                                      type="button"
                                      disabled={
                                        !getWeekDay(course.periods_formatted) ||
                                        course.virtual_class_id == null
                                      }
                                      className={
                                        getWeekDay(course.periods_formatted) &&
                                        course.virtual_class_id !== null
                                          ? "btn-flat  bg-primary text-white btn-sm"
                                          : "btn-flat  bg-secondary text-white btn-sm"
                                      }
                                      onClick={() => startClass(course.id)}
                                    >
                                      {loading ? (
                                        <Spinner
                                          animation="border"
                                          variant="white"
                                          size="sm"
                                        />
                                      ) : (
                                        <span>
                                          <i
                                            className="fas fa-video text-white mr-1"
                                            title="start class"
                                          ></i>
                                          Join
                                        </span>
                                      )}
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      className="btn-flat  bg-secondary text-white btn-sm"
                                      onClick={() => payNow(course.subject_id)}
                                    >
                                      Pay now
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        : null}
                    </tbody>
                  </table> */}
                </Card.Body>
              </Card>
            </div>
            {showClass && (
              <div className="border">
                <SearchForm hide={true} />
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
