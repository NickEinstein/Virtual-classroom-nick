import DashboardHeader from "../../../component/dashboard/header";
import DashboardLayout from "../../../component/dashboard/layout";
import Image from "next/dist/client/image";
import InfoCardPlain from "../../../component/dashboard/infoCardPlain";
import { useState, useEffect, useContext } from "react";
import icon from "../../../public/images/icons/closed.png";
import axios from "axios";
import { useGlobalMutation, useGlobalState } from '../../../utils/container'
import { AuthContext } from "../../../store/context/authContext";
import shopContext from "../../../store/context/shopContext";

export default function ClassSession() {

  const stateCtx = useGlobalState()
  const mutationCtx = useGlobalMutation()

  const [searchResult, setSearchResult] = useState([])
  const [user, setUser] = useContext(AuthContext)
  const [expand, setExpand] = useState(true)
  const [expandChild, setExpandChild] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [courses, setCourses] = useState([])
  const [course, setCourse] = useState([])
  const [subject, setSubject] = useState({})
  const courseContext = useContext(shopContext)
  const date = new Date() 
  const currentTime = date.toLocaleTimeString('default', {time: 'short'})
  const today  = date.getDate()+' '+date.toLocaleDateString('default', {month: 'long'})+', '+date.getFullYear()


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
    setSearchResult(tutors)
    getCourses()
    return () => {
      //
    };
  }, [0]);

  function getCourses() {
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/student/courses/${user.id}`)
    .then(response => {
      if(response.data.status) {
        let data = response.data.data
        setCourses(response.data.data)
        data.length ? setCourses(data)  : setCourses(courseContext.courses)
      }
    })
    .catch(err => console.log(err))
  }

  function searchTutor(event) {
    const {name, value} = event.target
    let results = tutors.filter(tutor => tutor.name.includes(value) 
      || tutor.name.toLowerCase().includes(value) || 
      tutor.subject.includes(value) || tutor.subject.toLowerCase().includes(value)
    )
    setSearchResult(results)
  }   

  function selected(event) {
    let id = event.target.id
    let u = tutors.filter(tutor => {
      if(tutor.id !== id && tutor.is_active === true) {
        tutor.is_active = false
      }
      else if(tutor.id === id)     
      return tutor
    })
    // u[0].is_active = true
    setSearchResult(tutors)
    setUser(u[0])
  }

  function joinVideo() {   
    window.open(window.location.origin+'/class-session/'+course.id)
  }

  function joinBoard() {
    window.open(window.location.origin+'/whiteboard?'+course.id)
  }

  function selectCourse(course) {
    setCourse(course)
    mutationCtx.methods.updateConfig({channelName: course.title})
    // mutationCtx.methods.updateConfig({host: false})
    // mutationCtx.methods.updateConfig({userRole: 'audience'})
    // alert(course.title)
    // alert(stateCtx.state.config.channelName)
  }

  return (
    <DashboardLayout>
      <DashboardHeader title="Classes"/>
      <div className="dashboard">
        <div className="row p-4">
          <div className="col-md-3 col-lg-3 custom-column">
            <div className="list-group">
              <div className="list-grid class-session">
                {
                  courses && courses.length ? courses.map((course, id) => 
                    <InfoCardPlain
                      key={id}
                      subject={course.tutor}
                      name={course.title}
                      avatar='https://i.pravatar.cc/300?img=63'
                      id={course.id}
                      is_active={false}
                      onClick={() => selectCourse(course)}
                      time="00:32:20"
                      periods="MON - TUE - WED"
                    />
                  )
                  : <p className="text-center">No course(s) found</p>
                }
              </div>
            </div>
            <div className="divider divider-left"></div>
          </div>
           <div className="col-md-6 col-lg-6">
              <div className="session-closed">
                <Image src={icon} width="100" height="100" alt="closed" />
                <h1>Class is opened</h1>
                <button className="btn btn-dark btn-sm">Join Class</button> <br/>
                <div className="btn-group">
                  <button 
                    type="button" 
                    className="btn btn-warning btn-lg"
                    title="Start Video Class"
                    onClick={joinVideo}
                  >
                    <i className="fa fa-video"></i>
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-light btn-lg"
                    title="Launch Whiteboard"
                    onClick={joinVideo}
                  >
                    <i className="fa fa-chalkboard"></i>
                  </button>
                </div>                  
                <p className="time">00:20:05 (to next class)</p>
                  <ul>
                    <li>Monday <span>2pm- 3pm</span></li>
                    <li>Tuesday <span>4pm- 6pm</span></li>
                    <li>Friday <span>2pm- 3pm</span></li>
                  </ul>
              </div>
           </div> 
           <div className="col-md-3 col-lg-3 custom-column">
              <div className="divider divider-right"></div>
            <div className="accordion-wrapper">
              {
                Object.entries(course).length ?
                  <div>
                    <a href="javascript:;" >
                      Participants <i className="fa fa-chevron-down"></i>
                    </a>
                    {
                      expand ? 
                        <div className="accordion-content">
                          <div className="accordion-inner">
                              <p>
                                <a href="javascript:;">
                                  Week 1 <i className={expandChild ? "fa fa-chevron-up" : "fa fa-chevron-down"}></i>
                                </a>
                              </p>
                              {
                                expandChild ? 
                                <div className="inner-content">
                                  <h3>{course.title}</h3>
                                  <p>
                                  {course.description ?? "No description"}
                                  </p>
                                  <div>
                                    <h5>Due Date</h5>
                                      <span className="due-date">{today}. ({currentTime})</span>
                                  </div>

                                  <div>
                                    <div className="btn-group">
                                      <button 
                                        type="button" 
                                        className="btn btn-warning btn-lg"
                                        title="Start Video Class"
                                        onClick={joinVideo}
                                      >
                                        <i className="fa fa-video"></i>
                                      </button>
                                      <button 
                                        type="button" 
                                        className="btn btn-light btn-lg"
                                        title="Launch Whiteboard"
                                        onClick={joinVideo}
                                      >
                                        <i className="fa fa-chalkboard"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                :
                                null
                              }
                          </div>
                        </div>
                      :
                      null
                    }
                  </div>
                : null
              }
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  )
}