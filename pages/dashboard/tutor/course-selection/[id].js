import { useState, useEffect, useContext } from "react";
import styles from '../../guardian/courses.module.scss';
import axios from "axios";
import { useRouter } from "next/router";
import ShopContext from "../../../../store/context/shopContext";
import { AuthContext } from "../../../../store/context/authContext";
import Course from "../../../../component/dashboard/course/course";
import DashboardHeader from "../../../../component/dashboard/header";
import DashboardLayout from "../../../../component/dashboard/layout";
import Swal from "sweetalert2";
import Sections from "../../../../component/section";

export default function Subjects() {

  const courseContext = useContext(ShopContext)
  const router = useRouter()
  const [searchResult, setSearchResult] = useState([])
  const [user, setUser] = useContext(AuthContext)
  const [course, setCourse] = useState({})
  const [category, setCategory] = useState({})
  const [searchQuery, setSearch] = useState({title: '', price: '', subject_class: ''})
  const [courses, setCourses] = useState([])
  const [list, setList] = useState([])
  // const [courses, setCourses] = useContext(ShopContext)

  useEffect(() => {
    if(router.isReady) {
      let  courseId = router.query.id 
      getSubjects(courseId)
    }
  }, [router.isReady]);


  function addToList(item) {
    router.push('/dashboard/subject-details/'+item.id)
    let check = list.filter(l => l.id === item.id)
    if(check.length) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: `${item.title} has alreadey been added`
      })
    }
    else {
      setList([...list, item])
    }
  }

  function removeFromList(item){
    setList(list.filter(l => l.id !== item.id))
  }

  function filterSubjects(event) {
    const {name, value} = event.target
    let results = course.classes.filter(course => course.class.includes(value))
    setSearchResult(results)
  }

  function handleInputChange(event) {
    const {name, value} = event.target
    setSearch({...searchQuery, [name]: value})
    filterSubjects()
    console.log(searchQuery)
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

  function selected() {
    router.push('/dashboard/subject-details/'+course.id)
  }

  function submitData() {
    Swal.fire({
      text: 'The selected subjects will be assigned to your account',
      icon: 'info',
      showConfirmButton: true,
      confirmButtonText: 'Proceed',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return axios.post(`https://theclassroom.ci-auction.ng/api/v1/tutor/pick-courses`, {
          user_id: user.id,
          courses: list.map((lst, id) => { return lst.id })
        })
        .then(response => {
          if(response.data.status) {
            Swal.fire({
              title: 'Success',
              icon: 'success',
              text: response.data.message,
              cancelButtonText: 'OK'
            })
          }
        })
        .catch(err => {
          if(err.response) {
            let message
            if(err.response.status == 422 || err.response.status == 401 || err.response.status == 404) {
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
      }
    })
  }

  function getCourses(id) {
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/courses/${id}`)
    .then(response => {
      if(response.data.status) {
        // console.log(response.data.data.data)
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
              title={course.title}
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
                      courses.length ?                
                        courses.map((course, index) => (
                          <Sections 
                            id={course.id} 
                            title={course.class}
                            onClick={selected}
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
                    {/* <div className="col-md-4 col-lg-4 pl-5">
                      <div className={"card shadow "+styles.card}>
                        <h5 className={"card-header "+styles.cardheader}>
                          <i className="fa fa-list"></i> Your list
                        </h5>
                        <div className="card-body py-4">
                        {
                          list.length ? 
                            <table className="table">
                              <tbody>
                                {
                                  list.map((lst, id) => (
                                    <tr key={id}>
                                      <td>
                                        {id+1+'. '}
                                        {lst.title+' - '+lst.subject_class} 
                                        <i
                                          className="fa fa-trash text-danger ml-2"
                                          onClick={ () => removeFromList(lst)}
                                        >
                                        </i>                                    
                                      </td>
                                    </tr>
                                  ))
                                }
                              </tbody>
                            </table>
                          : <div className="text-center ">No Item in list</div>
                        }
                        </div>
                        {
                          list.length ?
                          <div className={"card-footer "+styles.cardfooter}>
                            <button
                              type="button"
                              className={"btn btn-default "+styles.addteacherbtn}
                              onClick={submitData}
                            >
                              Submit
                            </button>
                          </div>
                          : null
                        }
                      </div>
                    </div> */}

              </div>

            </div>
          </DashboardLayout>
        )
      }
    </ShopContext.Consumer>
  )
}