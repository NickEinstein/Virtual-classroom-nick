import DashboardHeader from "../../../component/dashboard/header";
import DashboardLayout from "../../../component/dashboard/layout";
import Reminders from "../../../component/dashboard/reminder/reminders";
import nerd from "../../../public/images/banners/guardian.png";
import Image from "next/dist/client/image";
import ListGrid from "../../../component/dashboard/list/listGrid";
import ListItem from "../../../component/dashboard/list/listItem";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { post, get, patch } from "../../../services/fetch";
import Swal from "sweetalert2";
import { Button } from "antd";
import { AuthContext } from "../../../store/context/authContext";

export default function Guardian() {
  const [user_type, setUserType] = useState("");
  const [stats, setStats] = useState({});
  const [user, setUser] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formdata, setFormData] = useState({ user_id: user.id });
  const [student, setStudent] = useState({});
  const [students, setStudents] = useState([]);
  // const [auth, setAuth] = useContext(AuthContext)

  useEffect(() => {
    // console.log("AUTH", user);
    // // getUser()
    // // analytics()
    // // getChildren()
    // setTimeout(() => {
    //   setUserType(localStorage.setItem("user_type", user.user_type));
    // }, 2000);
    // return () => {
    //   // cleanup
    // };

    toGetUserProfile()
  }, []);

  const toGetUserProfile = async () => {
    // console.log(load);
    const res = await get({
      endpoint: `user-profile`,
      //  body: payload,
    });
    console.log(res)
    setStudents(res.data.data.details.relationships.students)

    // Swal.fire({
  //         title: 'Success',
  //         text: response.data.message,
  //         showCloseButton: true,
  //       })
  };

  function analytics() {
    let userID = "uffdfgkdfkjjdkjd";
    axios
      .get(`https://theclassroom.ci-auction.ng/api/v1/tutor/stats/${userID}`)
      .then((response) => {
        console.log(response);
        if (response.data.status) {
          setStats(response.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const formInputChange = (event) => {
    let { name, value } = event.target;
    setFormData({ ...formdata, [name]: value });
  };

  function getChildren() {
    setLoading(true);
    axios
      .get(
        `https://theclassroom.ci-auction.ng/api/v1/guardian/list-children/${user.id}`
      )
      .then((response) => {
        if (response.data.status) {
          setStudents(response.data.data);
        }
      })
      .catch((err) => {
        if (err.response) {
          Swal.fire({
            title: "Error",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "Close",
          });
        } else if (err.request) {
          Swal.fire({
            title: "Error",
            text: "Could not send request",
            icon: "error",
            confirmButtonText: "Close",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function getUser() {
    setLoading(true);
    axios
      .get(`https://theclassroom.ci-auction.ng/api/v1/guardian/${user.id}`)
      .then((response) => {
        console.log("FIND USER", response.data.data);
        if (response.data.status) {
          setUser(response.data.data);
        }
      })
      .catch((err) => {
        console.log("FIND USER", err);
      });
  }

  function verifyCode() {
    setLoading(true);
    axios
      .get(
        `https://theclassroom.ci-auction.ng/api/v1/student/code/${formdata.student_code}`
      )
      .then((response) => {
        console.log("RESPONE", response);
        if (response.data.status) {
          let child = response.data.data;
          setStudent(child);
          console.log("", child.first_name);
          Swal.fire({
            title: "Confirm Action",
            html: `<p>Link <strong>${
              child.last_name + " " + child.first_name
            }</strong> as your child/ward</p>`,
            showCancelButton: true,
            confirmButtonText: "Proceed",
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),
          }).then((result) => {
            if (result.isConfirmed) {
              addChild();
            }
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          Swal.fire({
            title: "Error",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "Close",
          });
        } else if (err.request) {
          Swal.fire({
            title: "Error",
            text: "Could not send request",
            icon: "error",
            confirmButtonText: "Close",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function addChild() {
    setFormData({ user_id: user.id });
    setLoading(true);
    axios
      .post(
        "https://theclassroom.ci-auction.ng/api/v1/guardian/link-child",
        formdata
      )
      .then((response) => {
        if (response.data.status) {
          setFormData({ ...formdata, student_code: "" });
          Swal.fire({
            title: "Successful",
            text: response.data.message,
            showCloseButton: true,
          });
          window.location.reload();
        }
      })
      .catch((err) => {
        if (err.response) {
          Swal.fire({
            title: "Error",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "Close",
          });
        } else if (err.request) {
          Swal.fire({
            title: "Error",
            text: "Could not send request",
            icon: "error",
            confirmButtonText: "Close",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <DashboardLayout>
        <DashboardHeader title="Parent/Guardian" />
        <div
          className="row mb-3 mt-3 d-flex "
          style={{ justifyContent: "center" }}
        >
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
          <div
            style={{ zIndex: 1 }}
            className="col-md-9 col-lg-9 no-paddings mb-3"
          >
            <ListGrid className="">
              <ListItem
                title="Children/Wards"
                dataCount={students.length ?? 0}
                icon="ion-android-people"
                style="grid"
              />
              <ListItem
                title="Courses"
                dataCount=""
                icon="ion-ios-book-outline"
                style="grid"
              />
              <ListItem
                title="Classes"
                dataCount=""
                icon="ion-android-people"
                style="grid"
              />
            </ListGrid>

            <div className="">
              {/* <div className="analytics card border col-md-8 p-3 mt-5">
                <h4 className="mb-0">Account Alerts</h4>
                <div
                  className=" mt-3"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p className="">Your account expires soon....</p>
                  <Button style={{ backgroundColor: "red", color: "white" }}>
                    <a href="/dashboard/transactions">Subscribe</a>
                  </Button>
                </div>
              </div> */}

              {/* <div className="analytics card  col-md-8">
                <div className="card-header">
                  <div>
                    <h4 className="title">Link child/ward's account</h4> 
                    <p>Use the <strong>Student code</strong> of your child to create a link to his/her account</p>
                  </div>
                </div>
                <div className="charts ">
                  <form>
                    <div className="row justify-content-center">
                      <div className="col-lg-8 col-md-8 col-xs-10">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Student Code"
                            name="student_code"
                            onChange={formInputChange}
                          />
                          <div className="input-group-append">
                            <button 
                              type="button" 
                              className="btn-sm btn-default btn" 
                              style={{"paddingTop": "inherit", "paddingBottom": "inherit"}}
                              onClick={verifyCode}
                            >
                              { loading ? 'Checking...' : 'Verify'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-4  mb-2 mt-2">
                <ListItem 
                  title="Pending Requests"
                  dataCount="1k+"
                  icon="ion-android-people"
                  style="list"
                  size="lg"
                />
              </div>*/}
            </div>
          </div>
        </div>
        {/* <Reminders/> */}
      </DashboardLayout>
    </>
  );
}
