import DashboardHeader from "../../../component/dashboard/header";
import DashboardLayout from "../../../component/dashboard/layout";
import Image from "next/dist/client/image";
import avatar from '../../../public/images/avatar.png'
import Link from "next/dist/client/link";
import InfoCard from "../../../component/dashboard/infoCard";
import VideoPlayer from "../../../component/dashboard/videoPlayer";
import { post,get } from "../../../services/fetch";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../store/context/authContext";
import shopContext from "../../../store/context/shopContext";
import axios from "axios";
import { Col, Table, Card, Modal, Spinner } from 'react-bootstrap';
import PreferenceForm from "../../../component/preference-form";
import Swal from 'sweetalert2';

export default function Courses() {

  const [engagements, setEngagements] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [user, setUser] = useContext(AuthContext)
  const context  = useContext(shopContext)
  const [courses, setCourses] = useState([])
  const [course, setCourse] = useState({})
  const [tutor, setTutor] = useState({})
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false)
  const [userSubjects, setUserSubjects] = useState([])
  const [payment, setPayment] = useState({})
  const [subjects, setSubjects] = useState([])
  const [formdata, setformData] = useState({user_id: user.id})


  const [showLink, setShowLink] = useState(false)
  const [link, setLink] = useState(false)

  const [topics, setTopics] = useState([])
  const [levels, setLevel] = useState([])
  const fieldList = [
    {
      week_day: '',
      class_time: '',
    }
  ];
  const [fields, setFields] =  useState(fieldList);
  const userData = {
    periods: fields,
    user_id: user.id
  }  
  const [data, setData] = useState(userData);

  useEffect(() => {
    getEngagements()
    // setCourses(context.courses)
    // getCategories()
    // getCourses()
    // setSearchResult(user.courses)
    // console.log(tutor)
    return () => {
      //
    };
  }, [0]);

  function getUser() {
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/student/${user.id}`)
    .then(response => {
      if(response.data.status) {
        setUser(response.data.data)
      }
    })
  }  

  function getCourses() {
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/student/${user.id}/subjects`)
    .then(response => {
      console.log("student", response)
      if(response.data.status) {
        setUserSubjects(response.data.data)
      }
    })
  }  

  function getTutor(id) {
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/tutor/${id}`)
    .then(response => {
      console.log(response)
      if(response.data.status) {
        setTutor(response.data.data)
      }
    })
  } 

  function filterSubjects(event) {
    const { name, value } = event.target
    let results = userSubjects.filter(subject => subject.title.includes(value) 
      || subject.title.toLowerCase().includes(value) || 
      subject.level.includes(value) || subject.level.toLowerCase().includes(value)
    )
    setUserSubjects(results)
  }  

  function selected(item) {
    let u = searchResult.filter(course => {
      if(course.id !== item.id) {
        course.isActive = false
      }
      else if(course.id === item.id)
      return course
    })
    u[0].isActive = true
    setCourse(item)
    getTutor(item.created_by)
  }

  function inputChange(event) {
    const { name, value } = event.target
    setformData({...formdata, [name]: value})
    setData({...data, [name]:value})
    if(name === 'subject') {
      selectTopic(value)
    }
    if(name === 'topic') {
      selectLevel(value)
    }
  }

  function addField() {
    if(fields.length < 7) {
      setFields([...fields, {week_day: '', class_time: ''}])
    }
  }

  function removeField(e) {
    const id = e.target.id
    if(fields.length == 1) return 
    setFields(fields.filter((item, index) => index != id))
  }


  function selectLevel(id) {
    let level = topics.filter(topic => topic.id == id)[0].levels
    setLevel(level)
  }
  
  function selectTopic(id) {
    let level = subjects.filter(subject => subject.id == id)[0].courses
    setTopics(level)
    
  } 
  function getCategories() {
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/category`)
    .then(response => {
      if(response.data.status) {
        setSubjects(response.data.data.data)
      }
    }) 
  }

  const getEngagements = async ()=>{
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
     console.log(res.data.data)
     setEngagements(res.data.data)
   
     }

  function submitData() {
    setLoading(true)
    axios.post('https://theclassroom.ci-auction.ng/api/v1/add-subject', data)
    .then(response => {
      if(response.data.status) {
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          showCloseButton: true,
        })
        .then(() => window.location.reload())
      }
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

  function payNow(id) {
    let amount = userSubjects.filter(subject => subject.subject_id === id)[0].fee
    // setPayment({...payment, ['amount']: amount, ['subject']: id})
    payWithPaystack(amount, id)
  }

  function payWithPaystack(amount, subject){
    var handler = PaystackPop.setup({
      key: 'pk_test_741bc055b3cfde6f6c5244d89a38b99532d13ea2',
      email: user.email,
      amount: amount * 100,
      currency: "NGN",
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), 
      metadata: {
        userID: user.id,
        child: [],
        course: subject
      },
      callback: function(response){
        // alert('success. transaction ref is ' + response.reference);
        console.log("Response from paystack", response)
        verifyPayment(response.reference)
      },
      onClose: function(){
          // alert('window closed');
      }
    });
    handler.openIframe();
  }

  function verifyPayment(reference) {
    axios.post(`https://theclassroom.ci-auction.ng/api/v1/payment/verify`, {
      // courses: courseIds,
      user_id: user.id,
      reference: reference,
    })
    .then(response => {
      // console.log(response)
      if(response.data.status) {
        Swal.fire({
          title: 'Payment',
          icon: 'success',
          text: 'Payment successful'
        })
        .then(() => {
          window.location.reload()
        })        
      }
    })
    .catch(err => console.log(err))
  }

  function startClass(subject_id) {
    setLoading(true)
    axios.post(`https://theclassroom.ci-auction.ng/api/v1/classroom/join`, {
      user_id: user.id,
      subject_id: subject_id,
    })
    .then(response => {
      // console.log("CLASSROOM", response)
      if(response.data.status) {
        if(response.data.data !== '') {
          window.location.href = response.data.data
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

  const toMeet = async(id)=>{
    //   console.log(id)
    //   let payload = {
    //     class_time : "13:20:00",
    //     class_date : "2022-09-14",
    //     engagement_id : +id
    // }
      const res = await get({
        endpoint: `get-meeting-link/${id}`,
        // body: payload,
        // auth: false,
      });
      console.log(res)
      // return res.data.data
      setLink(res.data.data)
      setShowLink(!showLink)
    }

  function getWeekDay(periods) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];  
    let date = new Date();
    return Object.keys(periods).includes(days[date.getDay()])
  }

  return (
    <DashboardLayout>
      <DashboardHeader title="My Courses"/>
      <div className="dashboard">
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
                  <h6>Add Subject</h6>
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
                  <div class="d-flex align-items-center">
                    <h5>My Registered Classes </h5>
                    {/* <button type="button" className="btn-flat btn-light ml-3" onClick={handleShow}>
                      <small> Add subject <i className="fas fa-plus-circle text-primary ml-2"></i></small> 
                    </button> */}
                  </div>
                  {/* <div className="searchs">
                    <input 
                      type="text" 
                      name="search" 
                      placeholder="Find Courses" 
                      className="form-control"
                      onKeyUp={filterSubjects}
                    /> 
                  </div>                   */}
                </Card.Header>
                <Card.Body className="table-responsive">
                  <Table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Teacher's name</th>
                        <th>Teacher's Subject</th>
                        <th>Meeting Time</th>
                        <th>Meeting Link</th> 
                        {/* <th>Payment</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {
                        engagements && engagements.length ? engagements.map((e, id) =>
                          <tr key={id}>
                            <td>{e.relationships.teacher.first_name} {e.relationships.teacher.last_name}</td>
                            <td>{ e.relationships.teacher.subjects.map((e, id)=>(<span key={id}>{e}</span>))}</td>
                            <td>
                              {/* {
                                course.periods && course.periods.length ? course.periods.map((period, index) => (
                                  <h6 key={index} className="text-sm text-primary">
                                    {period.day+' : '+period.start_end_time}                                    
                                  </h6>
                                ))
                                : null
                              } */}
                              {
                                <div>
                                  <p>{e.class_date}</p>
                                  <p>{e.class_time}</p>
                                  {/* <p></p> */}
                                </div>
                              }
                            </td>                            
                            <td >
                              {!showLink&& <button onClick={()=>toMeet(e.id)}> Show Link</button>}


                              {/* ₦{ course.fee_formatted } */}
                             {showLink && <a href={link}>Go To Meeting</a>}


                             {/* { ()=>toMeet(e.id)} */}
                            
                            </td>
                            {/* <td>
                              <div className="btn-group">
                                <button 
                                  type="button" 
                                  className={course.payment_status === "SUCCESS" ?  
                                  'btn-flat btn-sm bg-success' : 'btn-flat btn-sm bg-danger'}
                                >
                                  {
                                    course.payment_status === 'SUCCESS' ?
                                      <i className="fas fa-check-circle text-white" title="PAID"></i>
                                    :
                                      <i className="fas fa-lock text-white" title="PENDING"></i>
                                  }                                  
                                </button>
                                {
                                  course.payment_status === 'SUCCESS' ?
                                    <button 
                                      type="button" 
                                      disabled={!getWeekDay(course.periods_formatted) || course.virtual_class_id == null} 
                                      className={getWeekDay(course.periods_formatted) && course.virtual_class_id !== null ?  
                                      "btn-flat  bg-primary text-white btn-sm" : 
                                      "btn-flat  bg-secondary text-white btn-sm"} onClick={() => startClass(course.id)}                                      
                                    >
                                      {
                                        loading ? 
                                          <Spinner animation="border" variant="white" size="sm"/>
                                        :
                                        <span>
                                          <i className="fas fa-video text-white mr-1" title="start class"></i> 
                                          Join
                                        </span>
                                      }
                                    </button>
                                  :
                                  <button 
                                    type="button" 
                                    className="btn-flat  bg-secondary text-white btn-sm"
                                    onClick={() => payNow(course.subject_id)}
                                  >
                                    Pay now
                                  </button>
                                }
                                 <button type="button" className="btn-light btn-flat btn-sm">
                                  <i className="fas fa-trash text-danger" title="Delete"></i>
                                </button> 
                              </div>
                            </td> */}
                          </tr>           
                        )
                        : null
                      } 
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>   
            </div>
          </div>
          
        </div>
        
      </div>
    </DashboardLayout>
  )
}