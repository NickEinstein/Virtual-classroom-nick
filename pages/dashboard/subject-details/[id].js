import Image from 'next/dist/client/image';
import avatar  from '../../../public/images/avatar.png';
import style from '../../dashboard/tutor/messages.module.scss';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/dist/client/link';
import Swal from 'sweetalert2';
import DashboardLayout from '../../../component/dashboard/layout';
import DashboardHeader from '../../../component/dashboard/header';
import shopContext from '../../../store/context/shopContext';
import { AuthContext } from '../../../store/context/authContext';

export default function SubjectDetails() {
  const [subject, setSubject] = useState({})
  const [teacher, setTeacher] = useState({})
  const router = useRouter()
  const [user, setUser] = useContext(AuthContext);
  const courseContext = useContext(shopContext)
  const [periods, setPeriods] = useState([])

  useEffect(() => {
    // console.log("user", user)
    if(router.isReady) {
      console.log(router.query.id)
      getSubject(router.query.id)

    }
  }, [router.isReady]);

  function getSubject(id) {
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/courses/${id}`)
    .then(response => {
      console.log("subject", response.data)
      if(response.data.status) {
        setSubject(response.data.data)
      } 
    })
    .catch(err => console.log(err.response.data))
  }

  function assignChild() {
    Swal.fire({
      title: 'Assign subject teacher',
      input: `select`,
      inputLabel: 'Select Child',
      inputOptions: {
        '79394664': 'Onuh Andy',
        '12334355': 'Erina'
      }
    })
    return 
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/tutor/`)
    .then(response => {
      console.log("teacher", response.data)
      if(response.data.status) {
        setTeacher(response.data.data)
      } 
    })
    .catch(err => console.log(err.response.data))
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
          courses: [router.query.id],
          subject_periods: periods
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

  function handleInputChange(e) {
    let { name, value } = e.target
    setPeriods([...periods, value])
    console.log("periods", periods)
  }

  return (
    <DashboardLayout>
      <DashboardHeader 
        title="Subject Preview"
        cartCount={ courseContext.cart.reduce((count, curItem) => {
          return count + curItem.quantity
        }, 0)}
      />
      <div className='dashboard'>
        <div className='row p-4'>
          <div className='col-md-12 col-lg-12 col-xs-12'>
            <div className={"card "+style.card}>
              <div className={"card-header "+style.cardheader}>
                <h6><i className="fa fa-book mr-1"></i> Subject Preview </h6> 
              </div>
              {
                subject && Object.entries(subject).length ?
                <div className={"card-body row  justify-content-between"+style.cardbody}>
                  <div className='wrapper ml-3'>
                    <h4>{subject.title}</h4>
                    <p>Fee: <span>{subject.fee_formatted}</span></p>
                    <p>Duration: <span>{subject.duration}</span></p>
                    <p>Rating: 
                      <span className='ml-2 rating'>
                        <i className={'fa fa-star '+style.starcolor}></i>
                        <i className={'fa fa-star '+style.starcolor}></i>
                        <i className={'fa fa-star '+style.starcolor}></i>
                        <i className={'fa fa-star '+style.starcolor}></i>
                        <i className='fa fa-star-half'></i>
                      </span>
                    </p>
                    {
                      user.user_type.toLowerCase() === 'guardian' || user.user_type.toLowerCase() === 'student' ?
                        <div className={style.availability+" availability w-50"}>
                          <h4>Periods</h4>
                          {
                            subject.periods && subject.periods.length ?
                            <ul>
                              { subject.periods.map((period, index) =>(
                                <li>
                                  <h6>{period.day}</h6> 
                                  <input name={ period.day.toLowerCase() } type="radio" value={period.id} className="check-item active" onChange={handleInputChange}/>
                                  <span className="time">{period.from_formatted} - {period.to_formatted}</span>
                                </li>
                              )) }
                            </ul>                          
                            : null
                          }
                        </div>
                      : null
                    }
                    <div>
                      <h4>Description</h4>
                      <div dangerouslySetInnerHTML={{__html: subject.description}}></div>
                    </div>
                    <div>
                    </div>
                  </div>
                  {
                  }
                  {  
                    user.user_type === 'GUARDIAN' || user.user_type === 'STUDENT' ?
                  
                      courseContext.cart.filter(c => c.id === subject.id).length ? 
                        <button
                          className={'btn btn-default '+style.addteacherbtn}
                          onClick={courseContext.removeCourseFromCart.bind(this, subject.id)}
                        >
                          Remove from cart
                        </button>                          
                      :
                        <button
                          className={'btn btn-default '+style.addteacherbtn}
                          onClick={courseContext.addCourseToCart.bind(this, subject)}
                        >
                          <i className='fa fa-shopping-cart mr-1'></i>
                          Add to cart
                        </button>
                    : null
                  }                  
                </div>
                :
                <div className="text-center py-5">
                  No preview available
                </div>
              }
            </div>            
          </div>
          {
            user.user_type === 'TUTOR' || user.user_type === 'TEACHER' ?
             <div className='col-lg-12 mt-3 mb-3'>
               <h5>Add to my subject list</h5>
               <div className={style.formRow}></div>
               <div className={style.availability+" availability w-50"}>
               {
                subject.periods && subject.periods.length ?
                <ul>
                  { subject.periods.map((period, index) =>(
                    <li>
                      <h6>{period.day}</h6> 
                      <input 
                        name={ period.day.toLowerCase() } 
                        type="radio" value={period.id} 
                        className="check-item active" 
                        onChange={handleInputChange}
                      />
                      <span className="time">{period.from_formatted} - {period.to_formatted}</span>
                    </li>
                  )) }
                </ul>                          
                : null
              }
                <button 
                  className={'btn btn-default '+style.addteacherbtn}
                  onClick={submitData}
                >
                  Take Subject
                </button>
              </div>  
             </div>
            : null
          }
          <div className='col-md-12 col-lg-12 col-12 mt-3 mb-3'>
             <div className={"card "+style.card}>
                <div className={"card-header "+style.cardheader}>
                  <h6><i className="fa fa-users mr-1"></i> Subject Teachers </h6> 
                </div>
                <div className='card-body'>
                  {
                    subject.tutors ?
                      <table className='table'>
                        <thead>
                          <tr>
                            <th>SN</th>
                            <th>Name</th>
                            <th>Qualification</th>
                            <th className='text-center'>Ratings</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <th>SN</th>
                            <th>Name</th>
                            <th>Qualification</th>
                            <th className='text-center'>Rattings</th>
                          </tr>
                        </tfoot>
                        <tbody>
                          {
                            subject.tutors && subject.tutors.length ? subject.tutors.map((tutor, id) => (
                              <tr>
                                <td>{ id + 1 }.</td>
                                <td>                                 
                                  <Link 
                                    href={{
                                      pathname: '/dashboard/tutor/profile',
                                      query: {id: `${tutor.id}`},
                                    }} as={`/dashboard/tutor/${tutor.id}`}
                                  >
                                      <a className="ml-2">
                                        {tutor.first_name+' '+tutor.last_name}
                                      </a>
                                  </Link>
                                </td>
                                <td>{tutor.qualification}</td>
                                <td className='text-center'>
                                  <span className='ml-2 rating'>
                                    <i className={'fa fa-star '+style.starcolor}></i>
                                    <i className={'fa fa-star '+style.starcolor}></i>
                                    <i className={'fa fa-star '+style.starcolor}></i>
                                    <i className={'fa fa-star '+style.starcolor}></i>
                                    <i className='fa fa-star-half'></i>
                                  </span>                                  
                                </td>
                              </tr>
                            ))
                            :
                            <tr>
                              <td colSpan={5} className='text-center'>No Subject teacher(s)</td>
                            </tr>
                          }
                        </tbody>
                      </table>      
                    :
                    <div className='text-center'>
                      <p>No Subject teacher(s)</p>
                    </div>                            
                  }
              </div>
            </div>            
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}