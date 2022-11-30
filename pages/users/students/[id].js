import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import CustomButton from '../../../component/customButton';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import Header2 from '../../../component/header2';

export default function StudentProfile() {
  
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
    Hi  Emma,
    I'm looking for a tutor to teach Select Subject. I would like to be tutored online using TheClassroom online whiteboard. Please let me know if you are able to help and your availability.
    Thanks.
    `,
  }
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState(data)
  const [loading, setLoading] =  useState(false)
  const [hasAccount, setStatus] = useState(false)
  const [validated, setValidated] = useState(false)
  const [tutor, setTutor] = useState({})

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();

  useEffect(() => {
    if(router.isReady) {
      console.log(router.query.id)
      getTutor(router.query.id)
    }
  }, [router.isReady]);

  function getTutor(id) {
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/tutor/${id}`)
    .then(response => {
      if(response.data.status) {
        setTutor(response.data.data)
      }
    })
    .catch(err => console.log(err))
  }

  function sendMessage(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    axios.post('https://theclassroom.ci-auction.ng/api/v1/inquiry', details)
    .then(response => {
      if(response.data.status) {
        Swal.fire({
          icon:"success",
          text: "Message successfully sent"
        })
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
   let message =  `Hi  Emma,
I'm looking for a tutor to teach ${event.target.value}. I would like to be tutored online using TheClassroom online whiteboard. Please let me know if you are able to help and your availability.
    Thanks.`
    setDetails({...details, ['message']: message, ['subject']: event.target.value})
    // setDetails({...details, ['subject']: event.target.value})
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
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={sendMessage}>

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
                
              <Col xs="12">
                <Form.Group>
                  <CustomButton
                    variant="warning"
                    text="Login"
                    onClick={sendMessage}
                    name="submit"
                  />
                </Form.Group>                
              </Col>            
              {/* <Col xs="12">
                <Form.Group>
                  <CustomButton
                    variant="warning"
                    text="I already have an account"
                    icon="check-circle"
                    onClick={checkAccount}
                  />
                </Form.Group>                
              </Col>             */}
            </Form>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Understood</Button>
          </Modal.Footer> */}
        </Modal>

        <div className="row">
          <div className="col-lg-8 col-md-8">
            <div className="card">
              <div className="card-body">
                <div className="row justify-content-between">
                  <img src="https://via.placeholder.com/150" />
                  <div>
                    {/* <div className="verified bg-success text-white p-2 rounded">
                      Verified
                    </div> */}
                    <h5>Peter</h5>
                  </div>
                  <div>
                    <p><strong>Member Since:</strong> 22/04/2022</p>
                    <p><strong>Last Login:</strong> 4hrs ago</p>
                    <p><strong>Response Rate:</strong> 100%</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-3 mb-3">
              <div className="card-body">
                <p>
                  <strong>Subjects</strong>
                </p>
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
                      <tr>
                        <td>Computer Science</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Computer Science</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="card mt-3 mb-3">
              <div className="card-body">
                <h5>More information about student</h5>
                <p>
                  Lorem ipsum dolor ceta amet alachi.
                </p>
                <Button 
                  className="btn btn-default" 
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
                  className="btn-default" 
                  type="button"
                  onClick={handleShow}               
                >
                  Contact this Student
                </Button>        
              </div>
            </div>

          </div>
        </div>
      </div>
    </React.Fragment>
  );
}