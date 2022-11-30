import student from '../../../public/images/banners/student.png';
import Layout from '../../../component/layout';
import Image from 'next/dist/client/image';
import PlainNavbar from '../../../component/plainNavbar';
import axios from 'axios';
import { useState, useEffect, useContext, useMemo } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { AuthContext } from '../../../store/context/authContext';

export default function Verification() {
  
  const router = useRouter();  
  const [details, setDetails] = useState({})
  const [btnState, setBtnState] = useState(false)
  const [loading, setLoading] =  useState(false)
  const [user, setUser] = useContext(AuthContext)

  const uid  = router.query
  
 const  formInputChange = (event) => {
    let {name, value} = event.target
    setDetails({...details, [name]:value})
    console.log(details)
  }

  useEffect(() => {
    let  user_id = window.location.pathname.split("/").slice(3).join("")
    setDetails({...details, user_id: user_id})
  }, [0])

  const changeButtonState = () => {
    if(details.otp && details.otp.length == 6) 
      setBtnState(true)    
    else
      setBtnState(false)    
  }

  function verifyAccount() {
    setLoading(true)
    axios.post('https://theclassroom.ci-auction.ng/api/v1/auth/verify-otp', details)
    // axios.post('https://theclassroom.ci-auction.ng/api/v1/auth/verify-otp', details)
    .then(response => {
      console.log('response', response)
      if(response.data.status) {
        setUser(response.data.data)
        Swal.fire({
          title: 'Successsful',
          text: 'Successful',
          icon: 'success',
          confirmButtonText: 'OK'
        });        
        router.push('/auth/login')
      }
      else {
        Swal.fire({
          title: 'Error',
          text: response.data.message,
          icon: 'error',
          confirmButtonText: 'Close'
        });        
      }
    })
    .catch(err =>  {
      if(err.response) {
        Swal.fire({
          title: 'Error',
          text: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'Close'
        });  
      }
      else if(err.request) {
        Swal.fire({
          title: 'Error',
          text: 'Could not send request',
          icon: 'error',
          confirmButtonText: 'Close'
        });  
      }
    })
    .finally(() => setLoading(false))
  }
  return (
    <Layout>
      <PlainNavbar/>
      <section className="signup signup-single">
        <div className="row align-items-center justify-content-center mt-5 mb-5">
          <div  className="col-md-4 col-lg-4 col-xs-12">
            <form action="#" metho="post">
              <p className="text-primary">Please enter OTP received in your email</p>
              <h5>Account Verification</h5>
              <div className="row mb-2">
                <div className="col-md-12 mb-3">
                  <input 
                    type="text" 
                    name="otp" 
                    id="otp" 
                    placeholder="Enter OTP" 
                    className="form-control" 
                    required
                    onChange={formInputChange}
                    onKeyUp={changeButtonState}
                  />
                </div>
              </div>

              <div className="form-group mt-4">
                <button 
                  type="button" 
                  onClick={verifyAccount} 
                  className="btn form-control"
                  disabled={!btnState}
                >
                  {loading ? 'Processing....' : 'Verify'}
                </button>
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