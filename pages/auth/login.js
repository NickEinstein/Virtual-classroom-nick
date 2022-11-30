import Link from "next/link";
import student from "../../public/images/banners/student.png";
import Layout from "../../component/layout";
import Image from "next/dist/client/image";
import { post } from "../../services/fetch";
import PlainNavbar from "../../component/plainNavbar";
import Router from "next/router";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { AuthContext } from "../../store/context/authContext";
import Header2 from "../../component/header2";
import { Spinner } from "react-bootstrap";
// import BASE_URL from '../../lib/constant';

export default function Login() {
  const router = useRouter();
  const [details, setDetails] = useState({});
  const [user, setUser] = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const formInputChange = (event) => {
    let { name, value } = event.target;
    setDetails({ ...details, [name]: value });
  };
  // let url = `https://classroom.c-ileasing.com/api.virtualclassroom.com/public/api/v1/`;

  // function login() {
  //   setLoading(true)
  //   axios.post(`${url}login`, details)
  //   .then(response => {
  //     if(response.status==200) {
  //     console.log(response)

  //       // console.log('response', response.data)
  //       // localStorage.setItem("user", JSON.stringify(response.data.data));
  //       setUser(response.data.data)
  //       if(response.data.data.user_type === 'STUDENT') {
  //         // router.push('/add-subject')
  //         router.push('/dashboard/student')
  //       }
  //       else if(response.data.data.user_type === 'GUARDIAN') {
  //         // router.push('/add-subject')
  //         router.push('/dashboard/guardian')
  //       }
  //       else if(response.data.data.user_type === 'TUTOR') {
  //         router.push('/dashboard/tutor')
  //       }
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

  const login = async () => {
    // alert('hi')
    const res = await post({
      endpoint: "login",
      body: { ...details },
      auth: false,
    });

    console.log(res);
    // console.log(res.data.token)
    if (res?.status == 200) {
      window.localStorage.setItem("token", res.data.token);
      window.localStorage.setItem("role", res.data.user.role);
      window.localStorage.setItem("userId", res.data.user.details.id);
      window.localStorage.setItem("il", "yes");
      // window.localStorage.setItem("role", res.data.user.role);

      console.log(res.data.user.role);
      //     console.log(response)

      // console.log('response', response.data)
      // localStorage.setItem("user", JSON.stringify(response.data.data));
      setUser(res.data.user);
      if (res.data.user.role === "student") {
        // router.push('/add-subject')
        router.push("/dashboard/student");
      } else if (res.data.user.role === "guardian") {
        // router.push('/add-subject')
        router.push("/dashboard/guardian");
      } else if (res.data.user.role === "teacher") {
        router.push("/dashboard/tutor");
      } else if (res.data.user.role === "admin") {
        router.push("/dashboard/admin");
      } else if (res.data.user.role === "superadmin") {
        router.push("/dashboard/super-admin");
      }
    }
    else{
      Swal.fire({
        title: "Error",
        text: `${res?.data.message}`,
        showCloseButton: true,
      });
    }
  };

  useEffect(() => {
    console.log(user);
    // if(user.id !== '') {
    //   router.push(`/dashboard/${user.user_type.toLowerCase()}`)
    // }
  }, [user]);

  return (
    <React.Fragment>
      <Header2 />
      <Layout>
        {/* <PlainNavbar/> */}
        <section className="signup signup-single">
          <div className="row align-items-center justify-content-center mt-5 mb-5">
            <div className="col-md-4 col-lg-4 col-xs-12">
              <form action="#" metho="post">
                <div className="row mb-2">
                  <div className="col-md-12 mb-3">
                    <label>Email address</label>
                    <input
                      autoComplete
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      className="form-control"
                      required
                      onChange={formInputChange}
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <label>Password</label>
                    <input
                      autoComplete
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      className="form-control"
                      required
                      onChange={formInputChange}
                    />
                  </div>
                </div>

                <div className="form-group mt-4">
                  <button
                    type="button"
                    onClick={login}
                    className="btn form-control text-white"
                    disabled={loading}
                  >
                    Login{" "}
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
                <div className="link">
                  <Link href="/signup">
                    <a>Go Back</a>
                  </Link>
                </div>
              </form>
            </div>
            <div className="col-md-6 col-lg-5 col-xs-12 text-center">
              <div className="card">
                <div className="card-body">
                  <div className="card-img">
                    <Image src={student} className="img-fluid" alt="student" />
                  </div>
                </div>
              </div>
              <div className="elipse-wrapper">
                <div className="elipse elipse-primary"></div>
                <div className="elipse elipse-magenta"></div>
                <div className="elipse elipse-purple"></div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </React.Fragment>
  );
}
