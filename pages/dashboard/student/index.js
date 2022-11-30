import DashboardHeader from "../../../component/dashboard/header";
import DashboardLayout from "../../../component/dashboard/layout";
import Reminders from "../../../component/dashboard/reminder/reminders";
import nerd from "../../../public/images/banners/nerd.png";
import { post,get } from "../../../services/fetch";
import Image from "next/dist/client/image";
import ListGrid from "../../../component/dashboard/list/listGrid";
import ListItem from "../../../component/dashboard/list/listItem";
import { useState, useEffect, useContext} from "react"
import axios from "axios";
// import { Col, Table, Card, Modal, Spinner } from 'react-bootstrap';
import Swal from "sweetalert2";
import { AuthContext } from "../../../store/context/authContext";
import { Select } from 'antd';
import { Row, Col, Spinner, Form, Card, Button, Modal } from 'react-bootstrap';
// import style from './preference-form.module.scss';

// import 'antd/lib/button/style/css';


export default function Guardian() {

  const { Option } = Select;

  const [user_type, setUserType] = useState('')
  const [stats, setStats] = useState({})
  const [chosenSubject, setChosenSubject] = useState('')
  const [allSubjects, setAllSubjects] = useState()
  const [user, setUser] = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [formdata, setFormData] = useState({user_id: user.id})
  const [student, setStudent] = useState({})
  const [subjectId, setSubjectId] = useState({})
  const [students, setStudents] = useState([])
  const [displayTeachers, setDisplayTeachers] = useState([])
  // const [auth, setAuth] = useContext(AuthContext)
  const handleShow = () => setShow(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    // getSubjectTeachers(chosenSubject)
getAllSubjects()
getEngagements()
// alert(chosenSubject)
    // console.log('AUTH', user)
    // getUser()
    // analytics()
    // getChildren()
    // setTimeout(() => {
    //   setUserType(localStorage.setItem('user_type', user.user_type))
    // }, 2000);
    // return () => {
    //   // cleanup
    // };
  }, [chosenSubject]);



  function analytics() {
    let userID = 'uffdfgkdfkjjdkjd'
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/tutor/stats/${userID}`)
    .then(response => {
      console.log(response)
      if(response.data.status) { 
        setStats(response.data.data)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }  

  const  formInputChange = (event) => {
    let {name, value} = event.target
    setFormData({...formdata, [name]:value})
  }

  
  function getChildren() {
    setLoading(true)
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/guardian/list-children/${user.id}`)
    .then(response => {
      if(response.data.status) {
        setStudents(response.data.data)
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
    .finally(() => {
      setLoading(false)
    })    
  }
  

const getSubjectTeachers = async(sub)=>{
  let payload = {subject:sub}
  const res = await post({
    endpoint: `get-teachers`,
    body: payload,
    // auth: false,
  });
  console.log(res)
  setDisplayTeachers(res.data.data)
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

}

const getAllSubjects = async()=>{
  const res = await get({
    endpoint: `subjects`,
    // endpoint: `get-teachers${chosenSubject}`,
    // body: { ...details },
    // auth: false,
  });
  console.log(res)
  setAllSubjects(res.data.data)

}

let k
// useEffect(()=>{
//   if (typeof window !== "undefined") {

//   //   // localStorage.getItem("token");
//     k = localStorage.getItem("userId");
    
//     }
// console.log(k)
// },[k])

if (typeof window !== "undefined") {

    k = localStorage.getItem("userId");
// console.log(k)
  // localStorage.setItem(key, value)

}

  function getUser() {
    setLoading(true)
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/guardian/${user.id}`)
    .then(response => {
      console.log("FIND USER", response.data.data)
      if(response.data.status) {
        setUser(response.data.data)
      }
    })
    .catch(err => {
      console.log("FIND USER", err)
    })  
  }
  
  function verifyCode() {
    setLoading(true)
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/student/code/${formdata.student_code}`)
    .then(response => {
      console.log("RESPONE", response)
      if(response.data.status) {
        let child = response.data.data
        setStudent(child)
        console.log("", child.first_name)
        Swal.fire({
          title: 'Confirm Action',
          html: `<p>Link <strong>${child.last_name+' '+child.first_name}</strong> as your child/ward</p>`,
          showCancelButton: true,
          confirmButtonText: 'Proceed',         
          showLoaderOnConfirm: true,
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            addChild()
          }
        })        
      }
    })
    .catch(err => {
      if(err.response) {
        Swal.fire({
          title: 'Error',
          text: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'Close',       
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
    .finally(() => {
      setLoading(false)
    })    
  }

  const catchSelected = (e)=>{
    const selectedIndex = e.target.options.selectedIndex;
    console.log(e.target.options[selectedIndex].getAttribute('title'));
    setSubjectId(e.target.value)
// console.log(e.target.value)
// console.log(e.target.key)
// console.log(e.target)
// console.log(e)
// setChosenSubject(e.target.value)
getSubjectTeachers(e.target.options[selectedIndex].getAttribute('title'))

  }

  const applyToTeacher = async (tid)=>{
   let payload = {
      teacher_id : +tid,
      student_id : +k,
      guardian_id : '',
      subject_id : +subjectId
  }
console.log(payload)
  const res = await post({
    endpoint: `engage-teacher`,
    body: payload,
    // auth: false,
  });
  console.log(res)

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

  }

  const getEngagements = async (tid)=>{
  //   let payload = {
  //      teacher_id : +tid,
  //      student_id : +k,
  //      guardian_id : '',
  //      subject_id : +subjectId
  //  }
//  console.log(payload)
   const res = await get({
     endpoint: `get-all-engagements`,
    //  body: payload,
     // auth: false,
   });
   
   console.log(res)
 
   }

  
  
  function addChild() {
    setFormData({user_id: user.id})
    setLoading(true)
    axios.post('https://theclassroom.ci-auction.ng/api/v1/guardian/link-child', formdata)
    .then(response => {
      if(response.data.status) {
        setFormData({...formdata, student_code: ''})
        Swal.fire({
          title: 'Successful',
          text: response.data.message,
          showCloseButton: true
        })
        window.location.reload()
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
    .finally(() => {
      setLoading(false)
    })    
  }

  return (
    <>
    <DashboardLayout>
      <DashboardHeader title="Student"/>
      <div className="row mb-3 mt-3">
          {/* <!-- Welcome card --> */}
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
                  <div className=" col-lg-8 mb-3">
            <div className="welcome-card card">
              <h4>Welcome <br/>{user.last_name}!</h4>                
              <p>
                Use your dashboard to have an overview of your activities and progress, don’t forget to update your profile too.
              </p>

              <Image src={nerd} layout="responsive"  alt="nerd"/>
            </div>
          </div>

                  </Col>
                </Modal.Body>
              </Modal>            
             
          
          <div className="col-md-9 col-lg-9 no-paddings mb-3">
            <ListGrid>
              <ListItem  
                title="Requests"
                dataCount={students.length ?? 0 }
                icon="ion-android-people"
                style="grid"
              />
              <ListItem 
                title="Courses"
                dataCount="10"
                icon="ion-ios-book-outline"
                style="grid"
              />
              <ListItem 
                title="Classes"
                dataCount="06"
                icon="ion-android-people"
                style="grid"
              />
            </ListGrid>
            <div className="d-flex justify-content-betweens">
              <div className="analytics card  col-md-8">
                {/* <div className="card-header">
                  <div>
                    <h4 className="title">Link child/ward's account</h4> 
                    <p>Use the <strong>Student code</strong> of your child to create a link to his/her account</p>
                  </div>
                </div> */}
                {/* <div className="charts ">
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
                </div> */}
              </div>
{/* 
              <Select
    showSearch
    style={{
      width: 200,
    }}
    placeholder="Search to Select"
    optionFilterProp="children"
    filterOption={(input, option) => option.children.includes(input)}
    filterSort={(optionA, optionB) =>
      optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
    }
  >
    <Option value="1">Not Identified</Option>
    <Option value="2">Closed</Option>
    <Option value="3">Communicated</Option>
    <Option value="4">Identified</Option>
    <Option value="5">Resolved</Option>
    <Option value="6">Cancelled</Option>
  </Select> */}


              
              {/* <div className="col-md-4  mb-2 mt-2">
                <ListItem 
                  title="Pending Requests"
                  dataCount="1k+"
                  icon="ion-android-people"
                  style="list"
                  size="lg"
                />
              </div> */}

              
            </div>
            {/* <Col xs={6} className='mb-2'>
                <Form.Label>Select Subject</Form.Label>
                <select name='subjects' className='form-control' onChange={catchSelected}>
                  <option value=''>Select</option>
                  {
                    allSubjects ? 
                    allSubjects.map((subject, index) => (
                      <option key ={subject.id} value={subject.id} title={subject.name}>{subject.name}</option>
                    ))
                    : null
                  }
                </select>
              </Col>

               <div>
                <h1>Available Teachers</h1>
                {
                   displayTeachers?displayTeachers?.map((e)=>(
                    <div style={{border:'2px solid red', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div>
                      <h3 style={{marginBottom:''}}>{e.firstname} {e.lastname} </h3>
                      <p>{e.subjects[0]}</p>
                    </div>

                    <div>
                      <button onClick={()=>applyToTeacher(e.id)} style={{padding:'0 10px', backgroundColor:'green', color:'white'}}> Apply</button>
                    </div>
                    
                    </div>
                    
                  ))
                  :
                    <>No available teachers for this subject</>
                }
                
              </div>*/}
          </div>
      </div>
      {/* <Reminders/> */}
    </DashboardLayout>
    </>
  )
}