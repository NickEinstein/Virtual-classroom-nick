import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header2 from "../component/header2";
import PreferenceForm from "../component/preference-form";
import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../store/context/authContext";
import Footer from "../component/footer";
import { useRouter } from 'next/router';

export default function AddSubject() {

  const router = useRouter();

  const [loading, setLoading] = useState(false)
  const [subjects, setSubjects] = useState([])
  const [user, setUser] = useContext(AuthContext)
  const [formdata, setformData] = useState({user_id: user.id})

  const [topics, setTopics] = useState([])
  const [levels, setLevel] = useState([])

  function selectSubject(id) {
    let topic = subjects.filter(subject => subject.id == id)[0].sub
    setTopics(topic)
    console.log(topics)
  }

  function selectLevel(id) {
    let level = subjects.filter(subject => subject.id == id)[0].classes
    setLevel(level)
    console.log('Levels', level)
  }

  useEffect(() => {
    getSubjects()
    return () => {
      setSubjects([])
    };
  }, []);

  function inputChange(event) {
    const { name, value } = event.target
    setformData({...formdata, [name]: value})
    console.log('name', name)
    console.log('value', value)
    if(name === 'subject') {
      selectLevel(value)
    }
    if(name === 'topic') {
      setTopics(value)
    }
  }

  function getSubjects() {
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/courses`)
    .then(response => {
      if(response.data.status) {
        setSubjects(response.data.data.data)
      }
    }) 
  } 

  function submitData() {
    setLoading(true)
    // setformData({...formdata, ['user_id']: user.id})
    axios.post('https://theclassroom.ci-auction.ng/api/v1/add-subject', formdata)
    .then(response => {
      if(response.data.status) {
        Swal.fire({
          title: 'Success',
          text: response.data.message,
          showCloseButton: true,
        })
        .then(() => {
          if(user.user_type === 'STUDENT') {
            router.push('/dashboard/student')
          }
          else if(user.user_type === 'GUARDIAN') {
            router.push('/dashboard/guardian')
          }
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
  
  return (
    <React.Fragment>
      <Header2/>
      <Container className="mt-5 mb-5">
        <Row className="justify-content-center">
          <Col xs={6}>
            <PreferenceForm 
              onChange={inputChange}
              onClick={submitData}
              loading={loading}
              subjects={subjects}
              topics={topics}
              levels={levels}
            />
          </Col>
        </Row>
      </Container>
      <Footer/>
    </React.Fragment>
  );
}