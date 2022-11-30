import Image from 'next/dist/client/image';
import DashboardHeader from '../../../component/dashboard/header';
import DashboardLayout from '../../../component/dashboard/layout';
import avatar  from '../../../public/images/avatar.png';
import style from './messages.module.scss';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/dist/client/link';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../store/context/authContext';

export default function Profile() {
  const [subject, setSubject] = useState({})
  const [teacher, setTeacher] = useState({})
  const router = useRouter()
  const [user, setUser] = useContext(AuthContext);

  useEffect(() => {
    // console.log("user", user)
    if(router.isReady) {
      // console.log(router.query.id)
      getTeacher(router.query.id)

    }
  }, [router.isReady]);

  function getTeacher(id) {
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/tutor/${id}`)
    .then(response => {
      // console.log("teacher", response.data)
      if(response.data.status) {
        setTeacher(response.data.data)
      } 
    })
    .catch(err => console.log(err.response.data))
  }

  function assignChild() {
    const options = user.children.map(user => {
      return {
        [user.id]: user.first_name+' '+user.last_name
      }
    })
    let wards = options.reduce((result, item) => {
      let key = Object.keys(item)[0]
      result[key] = item[key];
      return result;
    }, {})

    Swal.fire({
      title: 'Assign subject teacher',
      input: `select`,
      inputLabel: 'Select Child',
      inputOptions: wards
    })
    return 
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/tutor/`)
    .then(response => {
      // console.log("teacher", response.data)
      if(response.data.status) {
        setTeacher(response.data.data)
      } 
    })
    .catch(err => console.log(err.response.data))
  }
  return (
    <DashboardLayout>
      <DashboardHeader title="Teacher's Preview"/>
      <div className='dashboard'>
        <div className='row p-4'>
          <div className='col-md-12 col-lg-12 col-xs-12'>
            <div className={"card "+style.card}>
              <div className={"card-header "+style.cardheader}>
                <h6><i className="fa fa-users mr-1"></i> Teacher's Preview </h6> 
              </div>
              {
                teacher && Object.entries(teacher).length ?
                <div className={"card-body row  justify-content-between"+style.cardbody}>
                  <div className='avatar'>
                    <Image 
                      src={avatar} 
                      width={130} 
                      height={130} 
                      className='avatar rounded-circle'
                    />
                  </div>
                  <div className='wrapper ml-3'>
                    <h4>{teacher.first_name+' '+teacher.last_name}</h4>
                    <p> {teacher.qualification}</p> 
                    <p>Rating: 
                      <span className='ml-2 rating'>
                        <i className={'fa fa-star '+style.starcolor}></i>
                        <i className={'fa fa-star '+style.starcolor}></i>
                        <i className={'fa fa-star '+style.starcolor}></i>
                        <i className={'fa fa-star '+style.starcolor}></i>
                        <i className='fa fa-star-half'></i>
                      </span>
                    </p>
                    <div>
                      <h4>Bio</h4>
                      <div dangerouslySetInnerHTML={{__html: teacher.bio}}>
                      </div>
                    </div>
                    <div>
                      <h4>Highest Qualification</h4>
                      <p>{ teacher.qualification }</p>
                    </div>
                  </div>
                  <button
                    type='button'
                    className={'btn btn-default '+style.addteacherbtn}
                    onClick={assignChild}
                  >
                    Assign to child
                    <i className='fa fa-plus ml-1'></i>
                  </button>
                </div>
                :
                <div className="text-center py-5">
                  No preview available 
                </div>
              }
            </div>            
          </div>
          <div className='col-md-12 col-lg-12 col-12 mt-3 mb-3'>
             <div className={"card "+style.card}>
                <div className={"card-header "+style.cardheader}>
                  <h6><i className="fa fa-school mr-1"></i> Institutions Attended </h6> 
                </div>
                <div className='card-body'>
                  {
                    teacher.qualifications && teacher.qualifications.length ?
                      <table className='table'>
                        <thead>
                          <tr>
                            <th>SN</th>
                            <th>Institution</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Descipline</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <th>SN</th>
                            <th>Institution</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Descipline</th>
                          </tr>
                        </tfoot>
                        <tbody>
                          {
                            teacher.qualifications ? teacher.qualifications.map((tutor, id) => (
                              <tr>
                                <td>{ id + 1 }.</td>
                                <td>  
                                  {tutor.institution}                                 
                                </td>
                                <td>{tutor.from_date}</td>
                                <td>{tutor.to_date}</td>
                                <td>{tutor.qualification}</td>
                              </tr>
                            ))
                            :
                            <tr>
                              <td colSpan={5} className='text-center'>No qualification(s) Added</td>
                            </tr>
                          }
                        </tbody>
                      </table>      
                    :
                    <div className='text-center'>
                      <p>No Subject(s)</p>
                    </div>                            
                  }
              </div>
            </div>            
          </div>
          <div className='col-md-12 col-lg-12 col-12 mt-3 mb-3'>
             <div className={"card "+style.card}>
                <div className={"card-header "+style.cardheader}>
                  <h6><i className="fa fa-book mr-1"></i> Subjects </h6> 
                </div>
                <div className='card-body'>
                  {
                    teacher.courses ?
                      <table className='table'>
                        <thead>
                          <tr>
                            <th>SN</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th className='text-center'>Students</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <th>SN</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th className='text-center'>Students</th>
                          </tr>
                        </tfoot>
                        <tbody>
                          {
                            teacher.courses ? teacher.courses.map((subject, id) => (
                              <tr>
                                <td>{ id + 1 }.</td>
                                <td>  
                                  {subject.title}                                 
                                  {/* <Link 
                                    href={{
                                      pathname: '/dashboard/tutor/profile',
                                      query: {id: `${subject.id}`},
                                    }} as={`/dashboard/tutor/${subject.id}`}
                                  >
                                      <a className="ml-2">
                                        {subject.title}
                                      </a>
                                  </Link> */}
                                </td>
                                <td>{subject.subject_class}</td>
                                <td className='text-center'>{subject.subscription_count || 0}</td>
                              </tr>
                            ))
                            :
                            <tr>
                              <td colSpan={5} className='text-center'>No Subject(s)</td>
                            </tr>
                          }
                        </tbody>
                      </table>      
                    :
                    <div className='text-center'>
                      <p>No Subject(s)</p>
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