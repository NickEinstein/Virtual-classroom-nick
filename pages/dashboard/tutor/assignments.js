import DashboardHeader from "../../../component/dashboard/header";
import DashboardLayout from "../../../component/dashboard/layout";
import Image from "next/dist/client/image";
import avatar from '../../../public/images/avatar.png'
import InfoCard from "../../../component/dashboard/infoCard";
import { useState, useEffect } from "react";
import Assignment from "../../../component/dashboard/assignment/assignmentCard";
import Container from "../../../component/dashboard/assignment/container";
import AssignmentStatus from "../../../component/dashboard/assignment/assignmentStatus";
import axios from "axios";
import Swal from "sweetalert2";
// import tutors from '../../../component/dashboard/data/tutors.js'

export default function Assignments() {
  const [searchResult, setSearchResult] = useState([])
  const [user, setUser] = useState({})
  const [formdata, setFormData] = useState({user_id: ''})
  const [assignments, setAssignments] = useState([])
  const [formState, setFormState] = useState(false)

  const tutors = [
    {
      id: '123411', 
      name: 'Peter Onuh A.',
      subject: 'Physics',
      rating: 4.9,
      rating_count: "2,800",
      date: "test@test.com",
      avatar: "https://i.pravatar.cc/300?img=63",
      is_active: true,
      status: 'submitted',
    },
    {
      id: '123421', 
      name: 'Moses Oche',
      subject: 'Web Dev',
      rating: 5.9,
      rating_count: "2,900",
      date: "test@test,.com",
      avatar: "https://i.pravatar.cc/300?img=3",
      is_active: false,
      status: 'submitted',
    },
    {
      id: '123438', 
      name: 'Romanus Blair',
      subject: 'Physics',
      rating: 4.9,
      rating_count: "2,800",
      date: "test@test.com",
      avatar: "https://i.pravatar.cc/300?img=60",
      is_active: false,
      status: 'submitted',
    },
    {
      id: '123439', 
      name: 'Tobi Williams',
      subject: 'DevOps',
      rating: 4.9,
      rating_count: "2,800",
      date: "sample@test.com",
      avatar: "https://i.pravatar.cc/300?img=2",
      is_active: false,
      status: 'submitted',
    },
    {
      id: '123432', 
      name: 'Daniel Ntoe',
      subject: 'Maths',
      rating: 8.9,
      rating_count: "2,800",
      date: "sample@test.com",
      avatar: "https://i.pravatar.cc/300?img=14",
      is_active: false,
      status: 'submitted',
    },
    {
      id: '123431', 
      name: 'Dave Steve',
      subject: 'Physics',
      rating: 2.9,
      rating_count: "2,810",
      date: "test@test.com",
      avatar: "https://i.pravatar.cc/300?img=19",
      is_active: false,
      status: 'submitted',
    },
    {
      id: '123430', 
      name: 'Itodo John',
      subject: 'Biolog',
      rating: 7.9,
      rating_count: "9,800",
      date: "test@test.com",
      avatar: "https://i.pravatar.cc/300?img=25",
      is_active: false,
      status: 'submitted',
    },
    {
      id: '123435', 
      name: 'Peter Onuh A',
      subject: 'Physics',
      rating: 9.2,
      rating_count: "2,200",
      date: "sample@test.com",
      avatar: "https://i.pravatar.cc/300?img=31",
      is_active: false,
      status: 'submitted',
    },
  ]

  useEffect(() => {
    // console.log(tutors)
    setUser(tutors[0])
    setSearchResult(tutors)
    getAssignments()
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

  const  formInputChange = (event) => {
    let {name, value} = event.target
    setFormData({...formdata, [name]:value})
  }

  function toggleForm() {
    setFormState(!formState)
  }

  function createAssignment() {
    axios.post('https://theclassroom.ci-auction.ng/api/v1/tutor/assessment/create', details)
    .then(response => {
      if(response.data.status) {
        setDetails({})
        Swal.fire({
          title: 'Successsful',
          text: 'Assignment created',
          icon: 'success',
          confirmButtonText: 'OK'
        });        
      }
    })
    .catch(err => {
      if(err.response) {
        Swal.fire({
          title: 'Error',
          text: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'Close'
        });  
      }
      else if(err.request) {
        Swal.fire({
          title: 'Error',
          text: 'Could not send request',
          icon: 'error',
          confirmButtonText: 'Close'
        });  
      }      
    })
  }  

  function getAssignments() {
    let userID = 'uffdfgkdfkjjdkjd'
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/tutor/assessment/${userID}`)
    .then(response => {
      console.log(response)
      if(response.data.status) { 
        setAssignments(response.data.data)
      }
    })
    .catch(err => {
      console.log(err)
    })
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
    u[0].is_active = true
    setSearchResult(tutors)
    setUser(u[0])
    console.log(user)
    console.log(tutors)
  }

  return (
    <DashboardLayout>
      <DashboardHeader title="Assignments"/>
      <div className="dashboard">
        <div className="p-4 col-lg-4 col-md-4 col-xs-4">
          <button 
            className="btn btn-priary btn-sm btn-default" 
            type="button"
            onClick={toggleForm}
          >
            Add Assignment
          </button>
        </div>
        {
          formState ? 
            <form>          
              <div className="row p-4">
                <div className="col-md-12 col-lg-12"><h3>Add Assignment</h3></div>
                <div className="col-lg-6 col-md-6 col-xs-12 mb-2">
                  <label>Select course</label>
                  <select name="course_id" className="form-control" onChange={formInputChange}>
                    <option value="">Maths</option>
                    <option value="">Physics</option>
                    <option value="">English</option>
                    <option value="">Biology</option>
                  </select>
                </div>
                <div className="col-lg-6 col-md-6 col-xs-12 mb-2">
                  <label>Title</label>
                  <input 
                    type="text" 
                    name="title" 
                    placeholder="Title" 
                    className="form-control" 
                    onChange={formInputChange}
                  />
                </div>
                <div className="col-lg-4 col-md-4 col-xs-12 mb-2">
                  <label>Start Date</label>
                  <input 
                    type="date" 
                    name="starts" 
                    placeholder="Starts" 
                    className="form-control" 
                    onChange={formInputChange}
                  />
                </div>
                <div className="col-lg-4 col-md-4 col-xs-12 mb-2">
                  <label>End Date</label>
                  <input 
                    type="date" 
                    name="ends" 
                    placeholder="Ends" 
                    className="form-control" 
                    onChange={formInputChange}
                  />
                </div>
                <div className="col-lg-4 col-md-4 col-xs-12 mb-2">
                  <label>Marks</label>
                  <input 
                    type="number" 
                    name="marks" 
                    placeholder="Marks" 
                    className="form-control" 
                    onChange={formInputChange}
                  />
                </div>
                <div className="col-lg-12 col-md-12 col-xs-12 mb-2">
                  <label>Task</label>
                  <textarea 
                    name="note" 
                    placeholder="Enter the main assignment task" 
                    className="form-control"
                    onChange={formInputChange}
                  ></textarea>
                </div>
                <div className="col-lg-4 col-md-4 col-xs-4 mb-2">
                  <button 
                    type="button" 
                    className="btn btn-secondary btn-sm"
                    onClick={createAssignment}
                    >
                      Submit
                  </button>
                </div>
              </div>
            </form>
          : null
        }
        <div className="row p-4">
          <div className="col-md-4 col-lg-4">
            <div className="list-group">
              <Assignment
                avatar={avatar}
                title="Computer science"
                count="90"
                students="50"
                onClick={selected}
              />
              <Assignment
                avatar={avatar}
                title="Computer science"
                count="90"
                students="50"
                onClick={selected}
              />
              <Assignment
                avatar={avatar}
                title="Computer science"
                count="90"
                students="50"
                onClick={selected}
              />
              <Assignment
                avatar={avatar}
                title="Computer science"
                count="90"
                students="50"
                onClick={selected}
              />
              <div className="divider divider-left"></div>
            </div>
          </div>          
          <div className="col-md-8 col-lg-8">
            <div className="search">
              <input 
                type="text" 
                name="search" 
                placeholder="Search" 
                className="form-control"
                onKeyUp={searchTutor}
              />
            </div>
            <Container>
                {
                  searchResult.map((tutor, id) => 
                    <AssignmentStatus
                      key={id}
                      title={tutor.name}
                      status={tutor.status}
                      avatar={tutor.avatar}
                      id={tutor.id}
                      onClick={selected}
                      score="100"
                      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates recusandae temporibus, quaerat eaque provident reprehenderit minima distinctio reiciendis dolore id."
                    />
                  )
                }

            </Container>
          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}