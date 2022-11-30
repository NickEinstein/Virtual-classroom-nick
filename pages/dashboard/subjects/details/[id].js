import React from "react";
import DashboardHeader from "../../../../component/dashboard/header";
import DashboardLayout from "../../../../component/dashboard/layout";
import axios from "axios";
import { AuthContext } from "../../../../store/context/authContext";
import ShopContext from "../../../../store/context/shopContext";
import Image from "next/dist/client/image";
import { useContext, useState, useEffect } from 'react'
import Link from "next/dist/client/link";
import style from '../../guardian/courses.module.scss';
import { useRouter  } from 'next/router';

export default function SubjectDetails() {
  const [user, setUser] =  useContext(AuthContext);
  const [subject, setSubject] =  useState({});
  const subjectContext = useContext(ShopContext)
  const router = useRouter()
  const subjectId = router.query.id
  const course = subjectContext.courses.filter(su => su.id === subjectId)[0]

  useEffect(() => {
    // let sub = subjectContext.courses.filter(subj => subj.id === subjectId)
    console.log("COURSE", course)
    setSubject(course)        
  }, [0]);
  return (
    <React.Fragment>
      <DashboardLayout>
        <DashboardHeader 
          title="Subject Details"
          cartCount={ subjectContext.cart.reduce((count, curItem) => {
            return count + curItem.quantity
          }, 0)}          
        />
        <div className="dashboard">
          <div className="row py-4 px-4">
            <div className="col-md-8 col-lg-8 col-12">
              <div className="card shadow">
                <Image 
                  src="https://i.pravatar.cc/300?img=63"  
                  layout="responsive" 
                  width={800}
                  height={600} 
                />
              </div>
            {
              Object.entries(subject).length ? 
                <div className="mb-5 mt-5">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td><h6>Title:</h6></td>
                        <td>{subject.title}</td>
                      </tr>
                      <tr>
                        <td><h6>Subject Fee:</h6></td>
                        <td>{subject.fee_formatted}</td>
                      </tr>
                      <tr>
                        <td><h6>Duration:</h6></td>
                        <td>{subject.duration}</td>
                      </tr>
                      <tr>
                        <td><h6>Description:</h6></td>
                        <td>{subject.description}</td>
                      </tr>
                    </tbody>
                  </table>
                  {  subjectContext.cart.filter(c => c.id === subject.id).length ? 
                      <button
                        className="btn  btn-default btn-sm"
                        onClick={subjectContext.removeCourseFromCart.bind(this, subject.id)}
                      >
                        Remove from basket
                      </button>                          
                    :
                      <button
                        className="btn  btn-default btn-sm"
                        onClick={subjectContext.addCourseToCart.bind(this, subject)}
                      >
                        Add to basket
                      </button>
                  }
                </div>
              : null
            }           
            </div>
            <div className="col-md-4 col-lg-4 col-12">
             <div className={"card "+style.card}>
               <div className={"card-header "+style.cardheader}>
                 <h6><i className="fa fa-users mr-1"></i> Subject Teachers </h6> 
               </div>
               {
                 subject.tutors && subject.tutors.length ?
                  <div className={"card-body "+style.cardbody}>
                    <table>
                      <tbody>
                        {
                          subject.tutors.map((teacher, id) => (
                            <tr>
                              <td>
                                { id + 1 }. 
                                <Link 
                                  href={{
                                    pathname: '/dashboard/tutor/profile',
                                    query: {id: `${teacher.id}`},
                                  }} as={`/dashboard/tutor/${teacher.id}`}
                                >
                                    <a className="ml-2">
                                      {teacher.first_name+' '+teacher.last_name} - {teacher.qualification} 
                                    </a>
                                </Link>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                : 
                <div className="text-center py-5">
                  No subject teacher(s) found
                </div>
               }
             </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </React.Fragment>
  );
}