import DashboardHeader from "../../../component/dashboard/header";
import DashboardLayout from "../../../component/dashboard/layout";
import { useState, useEffect, useContext } from "react";
import styles from '../../dashboard/guardian/courses.module.scss';
import Course from "../../../component/dashboard/course/course";
import axios from "axios";
import ShopContext from "../../../store/context/shopContext";
import { AuthContext } from "../../../store/context/authContext";
import { useRouter } from "next/router";
import Link from "next/dist/client/link";

export default function SubjectListing() {

  const courseContext = useContext(ShopContext)
  const router = useRouter()
  const [searchResult, setSearchResult] = useState([])
  const [user, setUser] = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false)
  const [course, setCourse] = useState({})
  const [category, setCategory] = useState({})
  const [searchQuery, setSearch] = useState({title: '', price: '', subject_class: ''})
  const [courses, setCourses] = useState([])

  useEffect(() => {
    let  categoryId = router.query.id 
    if(categoryId.length)
    console.log('categoryID', categoryId)
    getCategory(categoryId)
    getCourses(categoryId)
  }, [0]);

  function filterSubjects(event) {
    const {name, value} = event.target
    let results = courses.filter(course => 
         course.subject_class.includes(value) 
      || course.subject_class.toLowerCase().includes(value) 
      || course.title.includes(value) 
      || course.title.toLowerCase().includes(value)
      || course.fee_formatted.includes(value) 
      || course.fee.includes(value)
    ) 
    setSearchResult(results)
    console.log(results)
  }

  function handleInputChange(event) {
    const {name, value} = event.target
    setSearch({...searchQuery, [name]: value})
    filterSubjects()
    console.log(searchQuery)
  }

  function getCategory(id) {
    let cat = courseContext.categories.filter(c => c.id === id)
    setCategory(cat[0])
  }

  function selected(id) {
    let selected_course = courseContext.courses.filter(c => c.id === id)
    setCourse(selected_course[0])
    router.push(`/dashboard/subjects/details/${id}`)
    // console.log('===', router)
  }

  function getCourses(id) {
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/category/${id}/courses`)
    .then(response => {
      if(response.data.status) {
        console.log(response.data.data.data)
        setSearchResult(response.data.data)
        setCourses(response.data.data)
      }
    }) 
  }  

  return (
    <ShopContext.Consumer>
      {
        context => (
          <DashboardLayout>
            <DashboardHeader 
              title={category.name}
              cartCount={ context.cart.reduce((count, curItem) => {
                return count + curItem.quantity
              }, 0)}
            />
            <div className="dashboard">
              <div className="row py-2 px-4">
                <div className="col-lg-12 col-md-12"><h5>Filter:</h5></div>
                <div className={"col-lg-4 col-md-3 mb-2 col-xs-12 search "+styles.search}>
                  <input 
                    type="text" 
                    name="subject_class" 
                    placeholder="Class" 
                    className="form-control"
                    onKeyUp={filterSubjects}
                  /> 
                </div>
                <div className={"col-lg-4 col-md-3 mb-2 col-xs-12 search "+styles.search}>
                  <input 
                    type="text" 
                    name="title" 
                    placeholder="Filter By Topic" 
                    className="form-control"
                    onKeyUp={filterSubjects}
                  /> 
                </div>
                <div className={"col-lg-4 col-md-3 mb-2 col-xs-12 search "+styles.search}>
                  <input 
                    type="text" 
                    name="price" 
                    placeholder="Filter By Price" 
                    className="form-control"
                    onKeyUp={filterSubjects}
                  /> 
                </div>
              </div>
              <div className="row p-4">
                <div className="col-md-12 col-lg-12 custom-column">
                  <div className="row">
                    {
                      searchResult.length ?                
                        searchResult.map((course, index) => (
                          <Course 
                            id={course.id}
                            code={course.code}
                            title={course.title}
                            price={course.fee_formatted}
                            subject_class={course.subject_class}
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
                </div>
              </div>

            </div>
          </DashboardLayout>
        )
      }
    </ShopContext.Consumer>
  )
}