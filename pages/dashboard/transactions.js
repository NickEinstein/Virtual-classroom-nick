import DashboardHeader from "../../component/dashboard/header";
import DashboardLayout from "../../component/dashboard/layout";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../store/context/authContext";
import { useRouter } from "next/router";
import { Button } from "antd";
import { Form, Col, Row, Table, Card, Modal, Spinner } from "react-bootstrap";
import { post, get } from "../../services/fetch";
import Swal from "sweetalert2";

export default function Courses() {
  // const [user, setUser] = useContext(AuthContext)
  const router = useRouter();
  const [transactions, setTransactions] = useState(true);
  const [searchQueryId, setSearchQueryId] = useState("");
  const [paymentLink, setPaymentLink] = useState("");
  const [details, setDetails] = useState({});
  const [plans, setPlans] = useState([]);
  const [userId, setUserId] = useState();
  const [students, setStudents] = useState();
  const [studentId, setStudentId] = useState();

  const [plantoPost, setPlantoPost] = useState();
  // const [user, setUser] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  let token = null;

  const getPlans = async () => {
    //  console.log(moment("2022-10-10T01:01:23.000000Z").format("ll"));

    // alert('hi')
    const res = await get({
      endpoint: "plans",
      //  body: payload,
    });

    setPlans(res?.data?.data);
    //  }
  };

  useEffect(() => {
    token = new URL(location.href).searchParams.get("token");
    if (token) {
      console.log(token);
      setSearchQueryId(token);
      setTransactions(false);
    } else setTransactions(true);
  }, []);

  const getStudents = async () => {
    //  console.log(moment("2022-10-10T01:01:23.000000Z").format("ll"));

    // alert('hi')
    const res = await get({
      endpoint: "students",
      //  body: payload,
    });
    console.log(res?.data?.data);

    setStudents(res?.data.data);
    //  }
  };

  const getPlanObject = (id) => {
    let cow = plans.filter((e) => id == e.id);
    let cow2 = plans.find((e) => id == e.id);
    setPlantoPost(cow2);
    console.log(cow);
    console.log(cow2);
  };
  const login = async () => {
    let payload = {
      student_id: +studentId,
      guardian_id: +userId,
      plan_id: +plantoPost?.id,
      type: plantoPost?.title,
      amount: +plantoPost?.cost,
      description: plantoPost?.description,
    };
    // alert('hi')
    const res = await post({
      endpoint: "make-payment",
      body: { ...payload },
      // auth: false,
    });

    console.log(res.data.url);
    setPaymentLink(res.data.url);

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

  const verifyPayment = async () => {
    const res = await get({
      endpoint: `verify-payment/${searchQueryId}`,
      //  body: { ...payload },
      // auth: false,
    });

    if (res.status == 200) {
      Swal.fire({
        title: "Success",
        text: res.data.message,
        showCloseButton: true,
      });

      setTransactions(true);

    }

    else{
      Swal.fire({
        title: "Error",
        text: res?.data.message,
        showCloseButton: true,
      });
    }
  };

  const formInputChange = (event) => {
    let { name, value } = event.target;
    setDetails({ ...details, [name]: value });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(localStorage.getItem("userId"));
    }
    // getTransactions()
    getPlans();
    getStudents();
  }, [0]);

  return (
    <DashboardLayout>
      <DashboardHeader title="Transaction History" />
      <div className="dashboard">
        <div className=" p-4">
          <div className="col-md-12 col-lg-12">
            <section className="signup signup-single">
              <div className="mb-5 w-50 m-auto">
                <div className="">
                  {transactions ? (
                    <div className="analytics card border p-3 mt-5">
                      <h4 className="mb-0">Subscribe to a plan</h4>
                      <form action="#" metho="post">
                        <div className="col text-left">
                          <p className="mt-3">Select the student</p>
                          <select
                            placeholder="Enter Subject"
                            name="subjects"
                            className="form-control"
                            onChange={(e) => setStudentId(e.target.value)}
                          >
                            <option value="">Select </option>
                            {students
                              ? students.map((subject, index) => (
                                  <option
                                    key={subject.id}
                                    value={subject.id}
                                    title={subject.name}
                                  >
                                    {subject.name}
                                  </option>
                                ))
                              : null}
                          </select>
                        </div>
                        <div className="col text-left bold">
                          <p className="mt-3">Select Preferred Plan</p>
                          <select
                            placeholder="Enter Subject"
                            name="subjects"
                            className="form-control"
                            onChange={(e) => getPlanObject(e.target.value)}
                          >
                            <option value="">Select Preferred Plan</option>
                            {plans
                              ? plans.map((subject, index) => (
                                  <option
                                    key={subject.id}
                                    value={subject.id}
                                    title={subject.title}
                                  >
                                    {subject.title}
                                  </option>
                                ))
                              : null}
                          </select>
                        </div>

                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <div
                            style={{ width: "30%" }}
                            className="form-group w-30 mt-4"
                          >
                            <button
                              type="button"
                              onClick={login}
                              className="btn form-control text-white"
                              // disabled={loading}
                            >
                              Subscribe
                              {loading ? (
                                <Spinner
                                  animation="border"
                                  variant="primary"
                                  size="sm"
                                  className="ml-2"
                                />
                              ) : null}
                            </button>
                          </div>

                          {paymentLink && (
                            <a className="p-10 m-t-20" href={paymentLink}>
                              Click to redirect to payment portal
                            </a>
                          )}
                        </div>
                      </form>
                      {/* <div
                      className=" mt-3"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p className="">Your account expires in 12 days</p>
                      <Button
                        style={{ backgroundColor: "red", color: "white" }}
                      >
                        Subscribe
                      </Button>
                    </div> */}
                    </div>
                  ) : (
                    <Button
                      // variant="primary"
                      type="primary"
                      size="large"
                      className="  btn form-control text-white"
                      onClick={verifyPayment}
                    >
                      Please click to Verify Your Payment
                    </Button>
                  )}
                </div>
                <div className="col-md-6 col-lg-5 col-xs-12 text-center">
                  <div className="card"></div>
                  <div className="elipse-wrapper">
                    <div className="elipse elipse-primary"></div>
                    <div className="elipse elipse-magenta"></div>
                    <div className="elipse elipse-purple"></div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
