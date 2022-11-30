import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import CustomButton from '../../component/customButton';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import Header2 from '../../component/header2';

export default function UserProfile() {
  
  const [show, setShow] = useState(false);
  const [hasAccount, setStatus] = useState(false)
  const [validated, setValidated] = useState(false)
  const [tutor, setTutor] = useState({})
  const data = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    username: '',
    accepted_term: '',
    subject: '',
    message: `
    Hi  ${tutor.first_name},
    I'm looking for a tutor to teach Select Subject. I would like to be tutored online using TheClassroom online whiteboard. Please let me know if you are able to help and your availability.
    Thanks.
    `,
  }
  const [details, setDetails] = useState(data)
  const [loading, setLoading] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();

  useEffect(() => {
    if(router.isReady) {
      getTutor(router.query.id)
    }
  }, [router.isReady]);

  function getTutor(id) {
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/tutor/${id}`)
    .then(response => {
      console.log("TTTT", response)
      if(response.data.status) {
        setTutor(response.data.data)
        let message =     `Hi  ${response.data.data.first_name},
        I'm looking for a tutor to teach Select Subject. I would like to be tutored online using TheClassroom online whiteboard. Please let me know if you are able to help and your availability.
        Thanks.
        `
        setDetails({...details, ['message']: message})        
      }
    })
    .catch(err => console.log(err))
  }

  function sendMessage() {
    setLoading(true);
    setDetails({...details, ['user_id']: tutor.id})
    axios.post('https://theclassroom.ci-auction.ng/api/v1/send-tutor-request', details)
    .then(response => {
      if(response.data.status) {
        Swal.fire({
          icon:"success",
          text: "Message successfully sent"
        })
        .then(() => { window.location.reload() })
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

  function checkAccount() {
    setStatus(!hasAccount)
  }

  function handleInput(event) {
    const { name, value } = event.target
    setDetails({...details, [name]: value})
    console.log('details', details)
  }

  function selectSubject(event) {
    console.log(event.target.value)
   let message =  `Hi  ${tutor.first_name},
    I'm looking for a tutor to teach ${event.target.value}. I would like to be tutored online using TheClassroom online whiteboard. Please let me know if you are able to help and your availability.
    Thanks.`
    setDetails({...details, ['message']: message, ['subject']: event.target.value})
  } 

  function splitDate(date) {
    return date.split('-')[0]
  }

  return (
    <React.Fragment>
      <Header2/>
      <div className="container mt-5 py-5 bg-white">
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Send enquiry to {tutor.first_name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={sendMessage}>
              <Row>
                <Col xs="12">
                  <Form.Group>
                    <select name="subject" onChange={selectSubject} className="form-control">
                      <option value="">Select Subject</option>
                      <option value="Maths">Maths</option>
                      <option value="English">English</option>
                      <option value="Basic Science">Basic science</option>
                    </select>
                  </Form.Group>                
                </Col>              
                <Col xs="12">
                  <Form.Group>
                    <Form.Control  as="textarea" onChange={handleInput} value={details.message} name="message" rows={3} placeholder="Send message"  />
                  </Form.Group>                
                </Col> 
              </Row>
                { !hasAccount ?    
                  <Row>   
                    <Col xs="6">
                      <Form.Group>
                        <Form.Control  type="text" onChange={handleInput} name="first_name" placeholder="First Name"  required/>
                      </Form.Group>                
                    </Col>
                    <Col xs="6">
                      <Form.Group>
                        <Form.Control  type="text" onChange={handleInput} name="last_name" placeholder="Last Name"  required/>
                      </Form.Group>                
                    </Col>
                    <Col xs="6">
                      <Form.Group>
                        <Form.Control  type="email" onChange={handleInput} name="email" placeholder="Email address"  required/>
                      </Form.Group>                
                    </Col>
                    <Col xs="6">
                      <Form.Group>
                        <Form.Control  type="tel" onChange={handleInput} name="phone_number" placeholder="Phone number"  required/>
                      </Form.Group>                
                    </Col>
                    <Col xs="6">
                      <Form.Group>
                        <Form.Control  type="password" onChange={handleInput} name="password" placeholder="Password"  required/>
                      </Form.Group>                
                    </Col>
                    <Col xs="6">
                      <Form.Group>
                        <Form.Control  type="password" onChange={handleInput} name="password_confirmation" placeholder="Confirm Password"  required/>
                      </Form.Group>                
                    </Col>
                  </Row>
                :
                <Row>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Control  type="text" onChange={handleInput} name="username" placeholder="Username"  required/>
                    </Form.Group>                
                  </Col>
                  <Col xs="6">
                    <Form.Group>
                      <Form.Control  type="password" onChange={handleInput} name="password" placeholder="Password"  required/>
                    </Form.Group>                
                  </Col>
                </Row>
                }
                <Row>
                <Col xs="12">
                  <Form.Group>
                    <Form.Check type="checkbox" onChange={handleInput} label="I agree to TheClassroom's Terms and Conditions"  />
                  </Form.Group>                
                </Col>
              </Row>
              <Col xs="12">
                <Form.Group>
                  <CustomButton
                    variant="primary"
                    size="sm"
                    text="Send Message"
                    onClick={sendMessage}
                    showLoader={loading}
                    name="submit"
                  />
                </Form.Group>                
              </Col>            
              <Col xs="12">
                <Form.Group>
                  <CustomButton
                    variant="primary"
                    size="sm"
                    text="I already have an account"
                    icon="check-circle"
                    onClick={checkAccount}
                  />
                </Form.Group>                
              </Col>            
            </Form>
          </Modal.Body>
        </Modal>

        <div className="row">
          <div className="col-lg-8 col-md-8">
            <div className="card">
              <div className="card-body">
                <div className="row justify-content-between">
                  <img src={tutor.avatar == null ? "https://via.placeholder.com/150" : tutor.avatar} />
                  <div>
                    {/* <div className="verified bg-success text-white p-2 rounded">
                      Verified
                    </div> */}
                    <h5>{tutor.first_name}</h5>
                  </div>
                  <div>
                    <p><strong>Member Since:</strong> {tutor.created_at_formatted}</p>
                    <p><strong>Last Login:</strong> {tutor.last_login}</p>
                    <p><strong>Response Rate:</strong> 100%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-3 mb-3">
              <div className="card-body">
                {/* <p>
                  <strong>Rate Summary:</strong> N30.00 to N36.00 per hour
                </p> */}
                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td></td>
                        <td>Primary</td>
                        <td>Secondary</td>
                        <td>Nursery</td>
                        <td>KG</td>
                      </tr>
                      {
                        tutor.subjects && tutor.subjects.length ?
                          tutor.subjects.map((subject, index) => (
                            <tr key={index}>
                              <td>{subject.name}</td>
                              <td>₦{new Intl.NumberFormat().format(subject.fee)}</td>
                              <td>₦{new Intl.NumberFormat().format(subject.fee)}</td>
                              <td>₦{new Intl.NumberFormat().format(subject.fee)}</td>
                              <td>₦{new Intl.NumberFormat().format(subject.fee)}</td>
                            </tr>
                          ))
                        :
                        <tr>
                          <td colSpan={5} className='text-center'>No subjects</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="card mt-3 mb-3">
              <div className="card-body">
                <h5>Information about {tutor.first_name}</h5>
                  <div dangerouslySetInnerHTML={{__html: tutor.bio}}></div>
                <Button 
                  className="btn btn-default btn-sm text-white" 
                  type="button"
                  onClick={handleShow}               
                >
                  Contact this Tutor
                </Button> 
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="card mb-3">
              <div className="card-body">
                <Button 
                  className="btn btn-default btn-sm text-white" 
                  type="button"
                  onClick={handleShow}               
                >
                  Contact this Tutor
                </Button>    
                <div className="mt-1">
                  <h5 className="mt-4">My Qualification</h5>
                  <div className="qualifications mt-3">
                    {
                      tutor.qualifications && tutor.qualifications.length ?
                        tutor.qualifications.map((qualification, index) => (
                        <div key={index} className='mt-2'>
                          <div className="d-flex justify-content-between align-items-center">
                            <h6>{qualification.grade}</h6>
                            {
                              tutor.isActive == 1 ?
                                <span className="badge bg-success text-white">Verified</span>
                              :
                                <span className="badge bg-info text-white">Not verified</span>
                            }
                          </div>
                          <span>{qualification.institution}</span> <br/>
                          <span>Attained ({  splitDate(qualification.to_date) })</span>
                        </div>
                      ))
                      :
                      <p className='text-center'>No qualification submitted</p>
                    }
                  </div>
                </div>    
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body">
                <h5>Verification status</h5>
                <p>Rating</p>       
                <div className="ratings">
                  <i className="fas fa-star text-primary"></i>
                  <i className="fas fa-star text-primary"></i>
                  <i className="fas fa-star text-primary"></i>
                  <i className="fas fa-star text-primary"></i>
                  <i className="fas fa-star text-primary"></i>
                </div>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body">
                <h5>Availability</h5>
                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td></td>
                        <td>Mo</td>
                        <td>Tu</td>
                        <td>We</td>
                        <td>Th</td>
                        <td>Fr</td>
                        <td>Sa</td>
                        <td>Su</td>
                      </tr>
                      <tr>
                        {}
                        <td>Morning</td>
                        <td className="text-center"><i className="fas fa-check-circle text-primary"></i></td>
                        <td className="text-center"><i className="fas fa-check-circle text-primary"></i></td>
                        <td className="text-center"><i className="fas fa-check-circle text-primary"></i></td>
                        <td className="text-center"><i className="fas fa-check-circle text-primary"></i></td>
                        <td className="text-center"><i className="fas fa-check-circle text-primary"></i></td>
                        <td className="text-center"><i className="fas fa-check-circle text-primary"></i></td>
                        <td className="text-center"><i className="fas fa-check-circle text-primary"></i></td>
                      </tr>
                      <tr>
                        <td>Afternoon</td>
                        <td className="text-center"><i className="fas fa-check-circle text-primary"></i></td>
                        <td className="text-center"><i className="fas fa-check-circle text-primary"></i></td>
                        <td className="text-center">.</td>
                        <td className="text-center">.</td>
                        <td className="text-center">.</td>
                        <td className="text-center">.</td>
                        <td className="text-center">.</td>
                      </tr>
                      <tr>
                        <td>Evening</td>
                        <td className="text-center"><i className="fas fa-check-circle text-primary"></i></td>
                        <td className="text-center">.</td>
                        <td className="text-center">.</td>
                        <td className="text-center">.</td>
                        <td className="text-center"><i className="fas fa-check-circle text-primary"></i></td>
                        <td className="text-center"><i className="fas fa-check-circle text-primary"></i></td>
                        <td className="text-center"><i className="fas fa-check-circle text-primary"></i></td>
                      </tr>
                    </tbody>
                  </table>
                </div>       
              </div>
            </div>

          </div>
        </div>
      </div>
    </React.Fragment>
  );
}