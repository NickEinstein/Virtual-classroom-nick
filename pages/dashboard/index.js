import DashboardHeader from "../../component/dashboard/header";
import DashboardLayout from "../../component/dashboard/layout";
import Reminders from "../../component/dashboard/reminder/reminders";
import nerd from "../../public/images/banners/nerd.png";
import Image from "next/dist/client/image";
import medal from "../../public/images/icons/medal.png";
import badge from "../../public/images/icons/badge.png";
import { useContext, useState } from "react"
import axios from "axios";
import Swal from 'sweetalert2';
import { AuthContext } from "../../store/context/authContext";

export default function Dashboard() {

  const [user_type, setUserType] = useState('')
  const [details, setDetails] = useState()
  const [user, setUser] = useContext(AuthContext)

  const  formInputChange = (event) => {
    let {name, value} = event.target
    setDetails({...details, [name]:value})
  }

  setTimeout(() => {
    if (typeof window !== "undefined") {
    setUserType(window.localStorage.setItem("user_type", "student"));
      
    }
  }, 2000);

  // const addCourse() {
  //   axios.post('https://theclassroom.ci-auction.ng/api/v1/courses/create', details)
  //   .then(response => {
  //     if(response.data.status) {
  //       console.log('response', response.data)
  //       let id = response.data.data.id
  //       setDetails({})
  //       Swal.fire({
  //         title: 'Successsful',
  //         text: 'Course added',
  //         icon: 'success',
  //         confirmButtonText: 'OK'
  //       });
  //     }
  //   })
  //   .catch(err =>  {
  //     if(err.response) {
  //       Swal.fire({
  //         title: 'Error',
  //         text: err.response.data.message,
  //         icon: 'error',
  //         confirmButtonText: 'Close'
  //       });  
  //     }
  //     else if(err.request) {
  //       Swal.fire({
  //         title: 'Error',
  //         text: 'Could not send request',
  //         icon: 'error',
  //         confirmButtonText: 'Close'
  //       });  
  //     }
  //   })
  // }

  return (
    <>
    <DashboardLayout>
      <DashboardHeader title="Overview"/>
      <div className="row justify-content-between mb-3 mt-3">
          {/* <!-- Welcome card --> */}
          <div className="col-md-3 col-lg-3 mb-3">
            <div className="welcome-card card">
              <h4>Welcome <br/>Peter!</h4>                
              <p>
                Use your dashboard to have an overview of your activities and progress, don’t forget to update your profile too.
              </p>

              <Image src={nerd} layout="responsive" alt="nerd"/> 
            </div>
          </div>
          <div className="col-md-6 col-lg-6 no-padding mb-3">
            <div className="list-grid">
              <div className="list-item card">
                <h3>Tutor</h3>
                <div className="card-base">
                  <div className="count">05</div>
                  <div className="icon-wrapper">
                    <i className="ion-android-people"></i>
                  </div>
                </div>
              </div>
              <div className="list-item card">
                <h3>Classes</h3>
                <div className="card-base">
                  <div className="count">05</div>
                  <div className="icon-wrapper">
                    <i className="ion-ios-book-outline"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="analytics card">
              <div className="card-header">
                <div>
                  <span className="title">Hours spent</span>  <span className="sub-title">in classNamees</span>
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
                    <div className="bar-filled" style={{height: 15+"%"}}></div>
                  </div>
                </div>
                <div className="chart-item">
                  <div className="chart-bar" duration="2.5hrs" title="TUE">
                    <div className="bar-filled" style={{height: 20+"%"}}></div>
                  </div>
                </div>
                <div className="chart-item">
                  <div className="chart-bar" title="WED" duration="16hrs">
                    <div className="bar-filled" style={{height: 75+"%"}}></div>
                  </div>
                </div>
                <div className="chart-item">
                  <div className="chart-bar" duration="8hrs" title="THUR">
                    <div className="bar-filled" style={{height: 37.5+"%"}}></div>
                  </div>
                </div>
                <div className="chart-item">
                  <div className="chart-bar" duration="20hrs" title="FRI">
                    <div className="bar-filled" style={{height: 85+"%"}}></div>
                  </div>
                </div>
                <div className="chart-item">
                  <div className="chart-bar" duration="8.6hrs" title="SAT">
                    <div className="bar-filled" style={{height: 40.5+"%"}}></div>
                  </div>
                </div>
                <div className="chart-item">
                  <div className="chart-bar" duration="23hrs" title="SUN">
                    <div className="bar-filled" style={{height: 95+"%"}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Medals card --> */}
          <div className="col-md-3 col-lg-3 mb-3">
            <div className="medals card">
              <div className="card-title">
                <h5>Badges</h5>
                <div className="icon-wrapper">
                  <i className="ion-ribbon-b"></i>
                </div>
              </div>

              <div className="medal-wrapper">
                <div className="title">Current Badge</div>
                <div className="sub-title">
                  For Signing Up you reiceived a new badge
                </div>
                <div className="medal-wrapper">
                  <Image src={medal} width="45" height="45" alt=""/>
                </div>
              </div>

              <div className="medal-wrapper">
                <div className="title">Next Badge</div>
                <div className="sub-title">
                  Update profile to get next badge & extra 6day trial
                </div>
                <div className="medal-wrapper">
                  <Image src={badge} width="45" height="45" alt=""/>
                </div>
              </div>
            </div>
          </div>
      </div>
      <Reminders/>
    </DashboardLayout>
    </>
  )
}