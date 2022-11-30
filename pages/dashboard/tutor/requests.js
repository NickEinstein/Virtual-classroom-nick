import DashboardHeader from "../../../component/dashboard/header";
import DashboardLayout from "../../../component/dashboard/layout";
import Image from "next/dist/client/image";
import RequestCard from "../../../component/dashboard/request/requestCard";
import List from "../../../component/dashboard/request/list/list";
import { useState, useEffect, useContext} from "react";
import avatar from "../../../public/images/avatar.png";
import styles from './messages.module.scss';
import { AuthContext } from "../../../store/context/authContext";
import axios from "axios";
import ShopContext from '../../../store/context/shopContext';
import Swal from "sweetalert2";


export default function Requests() {

  const [searchResult, setSearchResult] = useState([])
  const [user, setUser] = useContext(AuthContext)
  const [expand, setExpand] = useState(true)
  const [expandChild, setExpandChild] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  // const context = useContext(ShopContext)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)

  const msgs = [
    {
      text: "Hi",
      sender: "message"
    },
    {
      text: "What's up",
      sender: "response"
    },
    {
      text: "What's good?",
      sender: "response"
    },
    {
      text: "I'm cool, how's your day going ?",
      sender: "message"
    },
    {
      text: "Omo I don tire",
      sender: "response"
    },
  ]
  const tutors = [
    {
      id: '123411', 
      name: 'Peter Onuh A.',
      subject: 'Physics',
      rating: 4.9,
      rating_count: "2,800",
      date: "January 2022",
      avatar: "https://i.pravatar.cc/300?img=63",
      is_active: true
    },
    {
      id: '123421', 
      name: 'Moses Oche',
      subject: 'Web Dev',
      rating: 5.9,
      rating_count: "2,900",
      date: "December 2022",
      avatar: "https://i.pravatar.cc/300?img=3",
      is_active: false
    },
    {
      id: '123438', 
      name: 'Romanus Blair',
      subject: 'Physics',
      rating: 4.9,
      rating_count: "2,800",
      date: "January 2022",
      avatar: "https://i.pravatar.cc/300?img=60",
      is_active: false
    },
    {
      id: '123439', 
      name: 'Tobi Williams',
      subject: 'DevOps',
      rating: 4.9,
      rating_count: "2,800",
      date: "September 2022",
      avatar: "https://i.pravatar.cc/300?img=2",
      is_active: false
    },
    {
      id: '123432', 
      name: 'Daniel Ntoe',
      subject: 'Maths',
      rating: 8.9,
      rating_count: "2,800",
      date: "September 2022",
      avatar: "https://i.pravatar.cc/300?img=14",
      is_active: false
    },
    {
      id: '123431', 
      name: 'Dave Steve',
      subject: 'Physics',
      rating: 2.9,
      rating_count: "2,810",
      date: "January 2022",
      avatar: "https://i.pravatar.cc/300?img=19",
      is_active: false
    },
    {
      id: '123430', 
      name: 'Itodo John',
      subject: 'Biolog',
      rating: 7.9,
      rating_count: "9,800",
      date: "January 2022",
      avatar: "https://i.pravatar.cc/300?img=25",
      is_active: false
    },
    {
      id: '123435', 
      name: 'Peter Onuh A',
      subject: 'Physics',
      rating: 9.2,
      rating_count: "2,200",
      date: "September 2021",
      avatar: "https://i.pravatar.cc/300?img=31",
      is_active: false
    },
  ]
  useEffect(() => {
    getCourses()
    setSearchResult(tutors)
    setTimeout(() => {
      // console.log("Courses", context.courses)
      // setIsOpen(true)
    }, 2000);
    return () => {
      //
    };
  }, [0]);

  function searchTutor(event) {
    const {name, value} = event.target
    let results = tutors.filter(tutor => tutor.name.includes(value) 
      || tutor.name.toLowerCase().includes(value) || 
      tutor.subject.includes(value) || tutor.subject.toLowerCase().includes(value)
    )
    setSearchResult(results)
  }

  function acceptRequest(item, id, decision) {
    setLoading(true)
    axios.post('https://theclassroom.ci-auction.ng/api/v1/tutor/courses/decision', {
      user_id: item.id,
      course_id: id,
      decision: decision
    })
    .then(response => {
      console.log(response)
      getCourses()
    })
    .catch(err =>  {
      if(err.response) {
        let message
        if(err.response.status == 422 || err.response.status == 200 || err.response.status == 401 || err.response.status == 404) {
          if(err.response.data.errors) {
              let errors = err.response.data.errors
              let errorList = Object.values(errors)
              errorList.map(msg => {
                  message = msg
              })
          }
          Swal.fire({
            title: 'Error',
            text: err.response.data.message || message,
            icon: 'error',
            confirmButtonText: 'Close'
          });  
        }        
      }
    })
    .finally(() => setLoading(false))
  }

  function getCourses() {
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/tutor/${user.id}/courses`)
    .then(response => {
      console.log("Requests", response.data.data)
      setCourses(response.data.data)
    })
    .catch(err => console.log(err))
  }

  return (
    <DashboardLayout>
      <DashboardHeader title="Requests"/>
      <div className="dashboard">
        <div className="row p-4">
          <div className="col-md-8 col-lg-8 custom-column">
            <div className={"search "+styles.search}>
                <input 
                  type="text" 
                  name="search" 
                  placeholder="Search" 
                  className="form-control"
                  onKeyUp={searchTutor}
                /> 
              </div>
            <div className="list-group">
              <div className="list-grid class-session">
                {
                  courses.length ? courses.map((course, index) => 
                    // course.subscribers.length ?
                    <RequestCard
                      key={index}
                      name={course.title}
                      title={course.title}
                      subjects={['English', 'Math', 'Physics']}
                      avatar="https://i.pravatar.cc/300?img=58"
                      id={course.id}
                      is_active={course.is_active}
                      time={course.created_at_formatted}
                      message={`This user has requested subscription for your ${course.title} course. Please do take appropriate action`}
                      onClick={() => acceptRequest(course, course.id, 'accept')} 
                      ignore={() => acceptRequest(course, course.id, 'decline')}
                    />
                      // course.subscribers.map((subscriber, index) => (
                      //    subscriber.pivot.tutor_acceptance_status === 'PENDING' ?
                      //   : null
                      // ))
                    // : null
                  )
                  :
                  <p className="text-center">No subscription request yet</p>
                }
              </div>
            </div>
            <div className="divider divider-left"></div>
          </div>
           {/* <div className="col-md-5 col-lg-5 pl-5">
              <h5>Recent Acceptance</h5>
           </div> */}

        </div>

      </div>
    </DashboardLayout>
  )
}