import DashboardHeader from "../../../component/dashboard/header";
import DashboardLayout from "../../../component/dashboard/layout";
import { useState, useEffect, useContext } from "react";
import styles from './courses.module.scss';
import Course from "../../../component/dashboard/course/course";
import Swal from "sweetalert2";
import axios from "axios";
import ShopContext from "../../../store/context/shopContext";
import { AuthContext } from "../../../store/context/authContext";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";

export default function Subjects() {

  const courseContext = useContext(ShopContext)
  
  const [searchResult, setSearchResult] = useState([])
  const [user, setUser] = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false)
  const [course, setCourse] = useState({})
  // const [courses, setCourses] = useContext(ShopContext)
  const router = useRouter();

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
    // getCourses()
    // console.log('fddf',user.children)
    setSearchResult(tutors)
    setTimeout(() => {
      setIsOpen(true)
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

  function selected(id) {
    let selected_course = courseContext.courses.filter(c => c.id === id)
    setCourse(selected_course[0])
    router.push('/dashboard/subject-details/'+id)
  }

  function getCourses() {
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/courses`)
    .then(response => {
      if(response.data.status) {
        console.log(response.data.data.data)
        setCourses(response.data.data.data)
      }
    })
    // .catch(err => {
    //   if(err.response) {
    //     Swal.fire({
    //       title: 'Error',
    //       text: err.response.data.message,
    //       icon: 'error',
    //       confirmButtonText: 'Close'
    //     });  
    //   }     
    // })   
  }  

  return (
    <ShopContext.Consumer>
      {
        context => (
          <DashboardLayout>
            <DashboardHeader 
              title="Subjects"
              cartCount={ context.cart.reduce((count, curItem) => {
                return count + curItem.quantity
              }, 0)}
            />
            <div className="dashboard">
              <div className="row py-2 px-4">
                {/* <div className="col-md-12 col-lg-12 col-xs-12">
                  <p className="text-info">
                    Select a child then pick courses to you want to subscribe for the child and proceed to payment.
                  </p>
                </div> */}
              </div>
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
                  <div className="row">
                    {
                      context.courses.length ?                
                        context.courses.map((course, index) => (
                          <Course 
                            id={course.id}
                            code={course.code}
                            title={course.title}
                            price={course.fee_formatted}
                            cover="https://i.pravatar.cc/300?img=63"
                            addToCart={context.addCourseToCart.bind(this, course)}
                            key={index}
                            onClick={() => selected(course.id)}
                          />
                        ))
                      :
                      <div className="text-center col-lg-12 col-md-12">
                        <p>No subjects available</p>
                      </div>
                    }
                  </div>
                  <div className="divider divider-left"></div>
                </div>
                {
                  Object.entries(course).length ? 
                    <div className="col-md-4 col-lg-4 pl-5">
                      <h5>Subject Details</h5>
                      <div className="mb-5 mt-5">
                        <table className="table">
                          <tbody>
                            <tr>
                              <td><h6>Title:</h6></td>
                              <td>{course.title}</td>
                            </tr>
                            <tr>
                              <td><h6>Subject Fee:</h6></td>
                              <td>{course.fee_formatted}</td>
                            </tr>
                            {/* <tr>
                              <td><h6>Tutor:</h6></td>
                              <td>{course.tutor}</td>
                            </tr> */}
                            <tr>
                              <td><h6>Duration:</h6></td>
                              <td>{course.duration}</td>
                            </tr>
                            <tr>
                              <td><h6>Description:</h6></td>
                              <td>{course.description}</td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <h6>Subject Teachers: </h6>
                                {
                                  course.tutors && course.tutors.length ?
                                   course.tutors.map((tutor, id) => (
                                    <Link href={"/dashboard/tutor/"+tutor.id} key={id}>
                                      <a>
                                        {tutor.first_name+' '+tutor.last_name+' - '+tutor.qualification}
                                      </a>
                                    </Link>
                                   ))
                                  : 
                                  <p>No tutor(s) for this subject yet.</p>
                                }
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        {  courseContext.cart.filter(c => c.id === course.id).length ? 
                            <button
                              className="btn  btn-default btn-sm"
                              onClick={courseContext.removeCourseFromCart.bind(this, course.id)}
                            >
                              Remove from basket
                            </button>                          
                          :
                            <button
                              className="btn  btn-default btn-sm"
                              onClick={courseContext.addCourseToCart.bind(this, course)}
                            >
                              Add to basket
                            </button>
                        }
                      </div>
                    </div>
                  : null
                }

              </div>

            </div>
          </DashboardLayout>
        )
      }
    </ShopContext.Consumer>
  )
}