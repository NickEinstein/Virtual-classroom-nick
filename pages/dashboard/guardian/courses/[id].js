import { useState, useEffect, useContext } from "react";
import styles from '../courses.module.scss';
import Course from "../../../../component/dashboard/course/course";
import Swal from "sweetalert2";
import axios from "axios";
import ShopContext from "../../../../store/context/shopContext";
import { AuthContext } from "../../../../store/context/authContext";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import DashboardLayout from "../../../../component/dashboard/layout";
import DashboardHeader from "../../../../component/dashboard/header";
import Sections from "../../../../component/section";

export default function Subjects() {

  const courseContext = useContext(ShopContext)
  // const API = process.env.LOCAL_API_URL
  const [searchResult, setSearchResult] = useState([])
  const [user, setUser] = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false)
  const [course, setCourse] = useState({})
  const [courses, setCourses] = useState([])
  const [category, setCategory] = useState(null);
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
    if(router.isReady) {
      getSubjects(router.query.id)
      // getCategory(router.query.id)
    }
  }, [router.isReady]);

  function searchTutor(event) {
    const {name, value} = event.target
    let results = tutors.filter(tutor => tutor.name.includes(value) 
      || tutor.name.toLowerCase().includes(value) || 
      tutor.subject.includes(value) || tutor.subject.toLowerCase().includes(value)
    )
    setSearchResult(results)
  }

  function selected() {
    // let selected_course = courseContext.courses.filter(c => c.id === id)
    // setCourse(selected_course[0])
    router.push('/dashboard/subject-details/'+course.id)
  }

  function getSubjects(id) {
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/courses/${id}`)
    .then(response => {
      console.log(response)
      if(response.data.status) {
        setCourse(response.data.data)
        setCourses(response.data.data.classes)
      }
    })   
  }  

  function getCategory(id) {
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/category/${id}`)
    .then(response => {
      if(response.data.status) {
        setCategory(response.data.data)
      }
    })   
  }  

  return (
    <ShopContext.Consumer>
      {
        context => (
          <DashboardLayout>
            <DashboardHeader 
              title={course ? course.title : 'Subjects'}
              cartCount={ context.cart.reduce((count, curItem) => {
                return count + curItem.quantity
              }, 0)}
            />
            <div className="dashboard">
              <div className="row p-4">
                <div className="col-md-12 col-lg-12 custom-column">
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
                      courses.length ?                
                        courses.map((section, index) => (
                          <Sections 
                            title={section.class} 
                            onClick={selected}
                          />
                        ))
                      :
                      <div className="text-center col-lg-12 col-md-12">
                        <p>No subjects available</p>
                      </div>
                    }   
                  </div>
                  {/* <div className="divider divider-left"></div> */}
                </div>


              </div>

            </div>
          </DashboardLayout>
        )
      }
    </ShopContext.Consumer>
  )
}