import DashboardHeader from "../../../component/dashboard/header";
import DashboardLayout from "../../../component/dashboard/layout";
import { useState, useEffect, useContext } from "react";
import styles from '../../dashboard/guardian/courses.module.scss';
import Course from "../../../component/dashboard/course/course";
import Swal from "sweetalert2";
import axios from "axios";
import ShopContext from "../../../store/context/shopContext";
import { AuthContext } from "../../../store/context/authContext";
import Categories from "../../../component/dashboard/course/categories";
import Category from "../../../component/dashboard/course/category";
import { useRouter } from "next/router";

export default function Subjects() {

  const courseContext = useContext(ShopContext)
  
  const [searchResult, setSearchResult] = useState([])
  const [user, setUser] = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false)
  const [course, setCourse] = useState({})
  const [category, setCategory] = useState({})
  const router = useRouter()
  // const [courses, setCourses] = useContext(ShopContext)

  useEffect(() => {
    if(!courseContext.categories.length) {
      getCategories()
    }
    setSearchResult(courseContext.categories)
    return () => {
      //
    };
  }, [0]);

  function categoryFilter(event) {
    const {name, value} = event.target
    let results = courseContext.categories.filter(category => category.name.includes(value) 
      || category.name.toLowerCase().includes(value) 
    )
    setSearchResult(results)
  }

  function selected(id) {
    let selected_course = courseContext.categories.filter(c => c.id === id)
    setCategory(selected_course[0])
    console.log('===', router.pathname)
    router.push(`${router.pathname}/${id}`)
  }

  function getCourses() {
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/courses`)
    .then(response => {
      if(response.data.status) {
        console.log(response.data.data.data)
        setCourses(response.data.data.data)
      }
    })
  }  

  function getCategories() {
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/category`)
    .then(response => {
      if(response.data.status) {
        setSearchResult(response.data.data.data)
      }
    }) 
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
              <div className="row p-4">
                <div className={"col-md-12 col-lg-6 col-xs-12 search "+styles.search}>
                  <input 
                    type="text" 
                    name="search" 
                    placeholder="Search" 
                    className="form-control"
                    onKeyUp={categoryFilter}
                  /> 
                </div>
                <div className="col-md-12 col-lg-12 custom-column">
                  <Categories>
                    {
                      searchResult.length ?                
                        searchResult.map((category, index) => (
                          <Category 
                            id={category.id}
                            title={category.name}
                            cover="https://i.pravatar.cc/300?img=58"
                            key={index}
                            onClick={() => selected(category.id)}
                          />
                        ))
                      :
                      <div className="text-center col-lg-12 col-md-12">
                        <p>No subjects available</p>
                      </div>
                    }
                  </Categories>
                </div>

              </div>

            </div>
          </DashboardLayout>
        )
      }
    </ShopContext.Consumer>
  )
}