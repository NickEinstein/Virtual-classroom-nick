import Layout from "../../component/layout";
import Image from "next/dist/client/image";
import Link from 'next/link';
import logo from '../../public/images/logo/logo.png';
import student from '../../public/images/banners/student.png';
import tutor from '../../public/images/banners/tutor.png'
import guarantor from '../../public/images/banners/guardian.png'
import PlainNavbar from "../../component/plainNavbar";

export default function Signup() {
  return (
    <>
    <Layout>
      <PlainNavbar/>
      <section className="signup">
        <header>
          <h2>Who would you like to Sign Up as? </h2> 
          <span>
            <Link href="/">
              <a>Go Back Home</a>
            </Link>
          </span>
        </header>
        <div className="row align-items-center justify-content-center">
          <div className="col-md-4 col-lg-3 mb-3 mt-3 col-xs-12 text-center">
            <div className="card">
              <div className="card-body">
                <h2>Student</h2>
                <div className="card-img">
                  <Image src={student} className="img-fluid" alt="student" />
                </div>
                <div className="link">
                  <Link href="/signup/students">
                    <a className="btn btn-default">Sign Up</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="elipse-wrapper">
              <div className="elipse elipse-primary"></div>
              <div className="elipse elipse-magenta"></div>
              <div className="elipse elipse-purple"></div>
            </div>
          </div>
          <div className="col-md-4 col-lg-3 mb-3 mt-3 col-xs-12 text-center">
            <div className="card">
              <div className="card-body">
                <h2>Teacher</h2>
                <div className="card-img tutor-card">
                  <Image src={tutor} className="img-fluid" alt="tutor"/>
                </div>
                <div className="link">
                  <Link href="/signup/tutors">
                    <a className="btn btn-default">Sign Up</a>
                  </Link>
                </div>
              </div>
              </div>
            <div className="elipse-wrapper">
              <div className="elipse elipse-primary"></div>
              <div className="elipse elipse-magenta"></div>
              <div className="elipse elipse-purple"></div>
            </div>
          </div>
          <div className="col-md-4 col-lg-3 mb-3 mt-3 col-xs-12 text-center">
            <div className="card">
              <div className="card-body">
                <h2>Guardian</h2>
                <div className="card-img">
                  <Image src={guarantor} className="img-fluid" alt="guarantor" />
                </div>
                <div className="link">
                 <Link href="/signup/guardian">
                    <a className="btn btn-default">Sign Up</a>
                  </Link>
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
    </>
  )
}