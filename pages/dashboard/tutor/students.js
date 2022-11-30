import DashboardHeader from "../../../component/dashboard/header";
import DashboardLayout from "../../../component/dashboard/layout";
import Image from "next/dist/client/image";
import avatar from '../../../public/images/avatar.png'
import InfoCard from "../../../component/dashboard/infoCard";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../store/context/authContext";
import axios from "axios";
import PreferenceForm from "../../../component/preference-form";
import { Table, Col, Button, Modal, Spinner, Card  } from 'react-bootstrap';

export default function Students() {
  const [searchResult, setSearchResult] = useState([])
  const [user, setUser] = useContext(AuthContext)
  const [students, setStudents] = useState([])
  const [student, setStudent] = useState({})
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [subjects, setSubjets] = useState([])
  const [topics, setTopics] = useState([])
  const [levels, setLevels] = useState([])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getStudents()
    return () => {
      //
    };
  }, [0]);

  function searchTutor(event) {
    const {name, value} = event.target
    let results = students.filter(student => student.last_name.includes(value) 
      || student.last_name.toLowerCase().includes(value) || 
      student.first_name.includes(value) || student.last_name.toLowerCase().includes(value)
    )
    setSearchResult(results)
  }

  function selected(item) {
    let u = students.filter(student => {
      if(student.id !== item.id && student.isActive === true) {
        student.isActive = false
      }
      else if(student.id === item.id)
      return student
    })
    u[0].isActive = true
    setStudent(item)
  }

  function getStudents() {
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/tutor/students/${user.id}`)
    .then(response => {
      console.log("students", response)
      if(response.data.status) {
        setStudents(response.data.data)
        setSearchResult(response.data.data)
      }
    })
  } 

  function inputChange(event) {

  }

  function submitData() {
    setLoading(true)
  }

  return (
    <DashboardLayout>
      <DashboardHeader title="My Students"/>
      <div className="dashboard">
        <div className="row p-4">
          <div className="col-md-8 col-lg-8">
            <div className="search">
              <input 
                type="text" 
                name="search" 
                placeholder="Find Students" 
                className="form-control"
                onKeyUp={searchTutor}
              /> <span>{searchResult.length}(Results)</span>
            </div>
            <div className="list-group">
              {/* <p>filter by:</p>
              <div className="filter-types">
                <ul className="filters">
                  <li>
                    <a href="#" className="activee">Most Popular</a>
                  </li>
                  <li>
                    <a href="#">Subject</a>
                  </li>
                  <li>
                    <a href="#">Marked</a>
                  </li>
                </ul>
              </div>
                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                  size="lg"
                >
                  <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
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
                        />
                    </Col>
                  </Modal.Body>
                </Modal>             */}
                <Card className="mt-4">
                  <Card.Header className="bg-white">
                    My Students 
                  </Card.Header>
                  <Card.Body className="table-responsive">
                    <Table className="table table-striped">
                      <thead>
                        <tr>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Subjects</th> 
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          students && students.length ? student.map((student, id) =>
                            <tr key={id}>
                              <td>{ student.first_name+' '+student.last_name }</td>
                              <td>{ student.first_name }</td>
                              <td>{ student.subscribers.length }</td>
                              <td>
                                <button type="button" className="btn-light btn-flat btn-sm">
                                  <i className="fas fa-trash text-danger" title="Delete"></i>
                                </button>
                              </td>
                              <td>
                                <button type="button" className="btn-light btn-flat btn-sm">
                                  <i className="fas fa-eye text-primary" title="View profile"></i>
                                </button>
                              </td>
                            </tr>             
                          )
                          : null
                        } 
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>              
              {/* <div className="list-grid">
                {
                  students.length ? searchResult.map((student, id) => 
                    <InfoCard
                      key={id}
                      name={student.first_name+' '+student.last_name}
                      subject={student.courses[0].title}
                      avatar="https://i.pravatar.cc/300?img=63"
                      date={student.created_at_formatted}
                      id={student.id}
                      is_active={student.isActive}
                      onClick={() => selected(student)}
                    />
                  )
                  : null
                }
              </div> */}
               {/* <div className="divider divider-left"></div> */}
            </div>
          </div>
          {/* <div className="col-md-6 col-lg-6">
            {
              Object.entries(student).length ? 
                <div className="card details">
                  <div className="card-header">
                    <div className="text-right">
                      <a className="btn btn-primary">Book VIP Class</a>
                    </div>
                  </div>
                  <div className="details-wrapper">
                    <div className="user-details">
                      <div className="avatar">
                        <Image 
                          src="https://i.pravatar.cc/300?img=63"
                          className="rounded-circle" 
                          width="60" 
                          height="60" 
                          alt="avatar"
                        /> <br/>
                        <p>Available <span className="online-status"></span></p>
                      </div>
                      <div>
                        <h1>{student.first_name+' '+student.last_name}</h1>
                        <ul>
                          <li className="subject">
                            {student.courses.map((course, id) => (
                              course.title+','
                            ))} 
                            <span className="icon-wrapper"><i className="ion-ios-book-outline"></i></span>
                          </li>
                          <li className="languages">
                            {student.email}
                          </li>
                          <li className="languages text-secondary">
                            High school level
                          </li>
                        </ul>
                        <div className="buttonss">
                          <a href="#" className="btn btn-sm btn-outline">Send message</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              : null
            }
          </div> */}
        </div>

      </div>
    </DashboardLayout>
  )
}