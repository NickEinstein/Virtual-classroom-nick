import Link from 'next/link';
import student from '../../public/images/banners/student.png';
import Layout from '../../component/layout';
import Image from 'next/dist/client/image';
import PlainNavbar from '../../component/plainNavbar';
// import  Router  from 'next/router';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter, Router } from 'next/router';
export default function StudentSignup() {

  const router = useRouter();

  const [details, setDetails] = useState()
  const [loading, setLoading] = useState(false)

 const  formInputChange = (event) => {
    let {name, value} = event.target
    setDetails({...details, [name]:value})
  }

  function signup() {
    setLoading(true)
    axios.post('https://theclassroom.ci-auction.ng/api/v1/student/signup', details)
    .then(response => {
      if(response.data.status) {
        // console.log('response', response.data)
        let id = response.data.data.id
        setDetails({})
        Swal.fire({
          title: 'Successsful',
          text: 'Signup successful',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        router.push({
          pathname: `/auth/verification/${id}`,
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
    <Layout>
      <PlainNavbar/>
      <section className="signup signup-single">
        <div className="row align-items-center justify-content-center mt-5 mb-5">
          <div  className="col-md-6 col-lg-6 col-xs-12">
            <form action="#" metho="post">
              <div className="row mb-2">
                <div className="col-md-6">
                  <label>First Name</label>
                  <input  
                    type="text" 
                    name="first_name" 
                    id="first_name" 
                    placeholder="First Name" 
                    className="form-control" 
                    required
                    onChange={formInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label>Last Name</label>
                  <input 
                    type="text" 
                    name="last_name" 
                    id="last_name" 
                    placeholder="Last Name" 
                    className="form-control" 
                    required
                    onChange={formInputChange}
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-6">
                  <label>Email address</label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="Email" 
                    className="form-control" 
                    required
                    onChange={formInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone_number" 
                    id="phone_number" 
                    placeholder="Phone Number" 
                    className="form-control" 
                    required
                    onChange={formInputChange}
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-6">
                  <label>Password</label>
                  <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="Password" 
                    className="form-control" 
                    required
                    onChange={formInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label>Confirm Password</label>
                  <input 
                    type="password" 
                    name="password_confirmation" 
                    id="password_confirmation" 
                    placeholder="Confirm Password" 
                    className="form-control" 
                    required
                    onChange={formInputChange}
                  />
                </div>
              </div>
              <div className="form-group mt-4">
                <button 
                  type="button" 
                  onClick={signup} 
                  className="btn form-control"
                >
                  {loading ? 'Sending...' : 'Sign Up'} 
                </button>
              </div>

              <div className="link">
                <Link href="/signup">
                  <a>Go Back</a>
                </Link>
              </div>
            </form>
          </div>
          <div className="col-md-6 col-lg-5 col-xs-12 text-center">
            <div className="card">
              <div className="card-body">
                <div className="card-img">
                  <Image src={student} className="img-fluid" alt="student" />
                </div>
              </div>
            </div>
            <div className="elipse-wrapper">
              <div className="elipse elipse-primary"></div>
              <div className="elipse elipse-magenta"></div>
              <div className="elipse elipse-purple"></div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}