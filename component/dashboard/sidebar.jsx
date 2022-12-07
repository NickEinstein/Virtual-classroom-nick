
import Image from "next/dist/client/image"
import Link from "next/dist/client/link"
import { useContext, useState } from "react"
import logo from "../../public/images/logo/logo.png"
import { useEffect } from "react"
import { AuthContext } from "../../store/context/authContext"

export default function Sidebar(props) {
  const [user, setUser] = useContext(AuthContext)
  console.log(user)
  let k ='r'
useEffect(()=>{
  if (typeof window !== "undefined") {

  //   // localStorage.getItem("token");
    k = localStorage.getItem("role");
    
    }
// console.log(k)
},[k])
console.log(k)
if (typeof window !== "undefined") {

    k = localStorage.getItem("role");
// console.log(k)
    // localStorage.setItem(key, value)
  
  }
  // console.log(window.localStorage.getItem("role"))
  
  return (
    <div className={"sidebar " + props.style}>
      {/* <!-- logo --> */}
      <div className="brand">
        <Link href="/">
          <a className="mb-4">
            <Image src={logo} width="200" alt="logo" className="img-fluid" />
          </a>
        </Link>
      </div>

      {/* <!-- menu --> */}
      <div className="menu">
        {
          // user.role === 'student'
          k === "student" ? (
            // user.user_type === 'STUDENT'
            <div>
              <ul>
                <li>
                  <Link href="/dashboard/student">
                    <a className="active">
                      <i className="ion-speedometer"></i> <span>Dashboard</span>
                    </a>
                  </Link>
                </li>
                {/* <li>
                <Link href="/dashboard/student">
                  <a>
                    <i className="ion-ios-person-outline"></i> 
                    <span>Teachers</span>
                  </a>
                </Link>
              </li> */}
                <li>
                  <Link href="/dashboard/student/courses">
                    <a>
                      <i className="ion-ios-book"></i>
                      <span>Subjects</span>
                    </a>
                  </Link>
                </li>
                {/* <li>
                <Link href="/dashboard/student/class-session">
                  <a> 
                    <i className="ion-ios-book-outline"></i> 
                    <span>Classes</span>
                  </a>
                </Link>
              </li> */}
                <li>
                  <Link href={"/dashboard/tutor/profile-update"}>
                    <a>
                      <i className="ion-person"></i>
                      <span>My Profile</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/transactions">
                    <a>
                      <i className="ion-android-notifications-none"></i>
                      <span>Transaction History</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          ) : k === "teacher" ? (
            // user.role === 'teacher' ?
            // user.user_type === 'TUTOR' ?
            <div>
              <ul>
                <li>
                  <Link href="/dashboard/tutor">
                    <a className="active">
                      <i className="ion-speedometer"></i>
                      <span>Dashboard</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/tutor/class-session">
                    <a>
                      <i className="ion-ios-book-outline"></i>
                      <span>My Subjects</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/dashboard/tutor/profile-update"}>
                    <a>
                      <i className="ion-person"></i>
                      <span>My Profile</span>
                    </a>
                  </Link>
                </li>
                {/* <li>
                <Link href="/dashboard/tutor/course-selection">
                  <a> 
                    <i className="ion-ios-book"></i> 
                    <span>Subjects</span>
                  </a>
                </Link>
              </li> */}
                {/* <li>
                <Link href="/dashboard/tutor/students">
                  <a> 
                    <i className="fa fa-users"></i> 
                    <span>Students</span>
                  </a>
                </Link>
              </li> */}
                {/* <li>
                <Link href="/dashboard/tutor/messages">
                  <a> 
                    <i className="ion-chatbox"></i> 
                    <span>Messages</span> 
                    <span className="badge badge-pink">3</span> 
                  </a>
                </Link>
                </li> */}
                {/* <li>
                <Link href="/dashboard/tutor/requests">
                  <a> 
                    <i className="ion-happy-outline"></i> 
                    <span>Request</span> 
                    <span className="badge badge-pink">3</span> 
                    </a>
                </Link>
              </li> */}
                <li>
                  <Link href="/dashboard/transactions">
                    <a>
                      <i className="ion-android-notifications-none"></i>
                      <span>Transaction History</span>
                    </a>
                  </Link>
                </li>
                {/* <li>
                <Link href="/dashboard/tutor/reminders">
                  <a> 
                    <i className="ion-android-notifications-none"></i> 
                    <span>Reminders</span> <span className="badge badge-pink">27</span>
                  </a>
                </Link>
              </li> */}
              </ul>
            </div>
          ) : // user.role === 'guardian' ?
          k === "guardian" ? (
            // user.user_type === 'GUARDIAN' ?
            <div>
              <ul>
                <li>
                  <Link href="/dashboard/guardian">
                    <a className="active">
                      <i className="ion-speedometer"></i>
                      <span>Dashboard</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/guardian/list-children">
                    <a>
                      <i className="fa fa-users"></i>
                      <span>Child/Ward</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/guardian/courses">
                    <a>
                      <i className="ion-ios-book-outline"></i>
                      <span>Subjects</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/transactions">
                    <a>
                      <i className="ion-android-notifications-none"></i>
                      <span>Subcription</span>
                      {/* <span>Transaction History/Subcription</span> */}
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/dashboard/tutor/profile-update"}>
                    <a>
                      <i className="ion-person"></i>
                      <span>My Profile</span>
                    </a>
                  </Link>
                </li>
                {/* <li>
                <Link href="/dashboard/tutor/reminders">
                  <a> 
                    <i className="ion-android-notifications-none"></i> 
                    <span>Reminders</span> <span className="badge badge-pink">27</span>
                  </a>
                </Link>
              </li> */}
              </ul>
            </div>
          ) : k === "superadmin" ? (
            // user.user_type === 'GUARDIAN' ?
            <div>
              <ul>
                <li>
                  <Link href="/dashboard/super-admin">
                    <a className="active">
                      <i className="ion-speedometer"></i>
                      <span>Dashboard</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/super-admin/manager">
                    <a>
                      <i className="fa fa-users"></i>
                      <span>Admin Manager</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/super-admin/users">
                    <a>
                      <i className="ion-ios-book-outline"></i>
                      <span>Users Manager</span>
                    </a>
                  </Link>
                </li>
                {/* <li>
                  <Link href="/dashboard/transactions">
                    <a>
                      <i className="ion-android-notifications-none"></i>
                      <span>Subcription</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/dashboard/tutor/profile-update"}>
                    <a>
                      <i className="ion-person"></i>
                      <span>My Profile</span>
                    </a>
                  </Link>
                </li> */}
                {/* <li>
                <Link href="/dashboard/tutor/reminders">
                  <a> 
                    <i className="ion-android-notifications-none"></i> 
                    <span>Reminders</span> <span className="badge badge-pink">27</span>
                  </a>
                </Link>
              </li> */}
              </ul>
            </div>
          ) : k === "admin" ? (
            // user.user_type === 'GUARDIAN' ?
            <div>
              <ul>
                <li>
                  <Link href="/dashboard/admin">
                    <a className="active">
                      <i className="ion-speedometer"></i>
                      <span>Dashboard</span>
                    </a>
                  </Link>
                </li>
                {/* <li>
                  <Link href="/dashboard/admin/manager">
                    <a>
                      <i className="fa fa-users"></i>
                      <span>Admin Manager</span>
                    </a>
                  </Link>
                </li> */}
                {/* <li>
                  <Link href="/dashboard/guardian/courses">
                    <a>
                      <i className="ion-ios-book-outline"></i>
                      <span>Subjects</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/transactions">
                    <a>
                      <i className="ion-android-notifications-none"></i>
                      <span>Subcription</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={"/dashboard/tutor/profile-update"}>
                    <a>
                      <i className="ion-person"></i>
                      <span>My Profile</span>
                    </a>
                  </Link>
                </li> */}
                {/* <li>
                <Link href="/dashboard/tutor/reminders">
                  <a> 
                    <i className="ion-android-notifications-none"></i> 
                    <span>Reminders</span> <span className="badge badge-pink">27</span>
                  </a>
                </Link>
              </li> */}
              </ul>
            </div>
          ) : null
        }
      </div>

      {/* <!-- Profile progress --> */}
      {/* <div className="profile-update-card card">
        <h3>Profile update progress</h3>
        <div className="p-bar">
          <label htmlFor="progress-bar" className="text-right">
            25%
          </label>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: 50 + "%" }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
        <p>
          Complete your profile to to receive a new badge and get addition 6days
          trial
        </p>
        <Link href="#">
          <a className="btn btn-white">Update Now</a>
        </Link>
        <div className="bubble-wrapper">
          <div className="bubble bubble-primary"></div>
          <div className="bubble bubble-purple"></div>
          <div className="bubble bubble-green"></div>
        </div>
      </div> */}
    </div>
  );
}