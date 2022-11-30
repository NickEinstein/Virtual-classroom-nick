import Image from "next/dist/client/image";
import teachers from '../../public/images/banners/teachers.png';
import processing from '../../public/images/banners/processing.png';
import Link from 'next/link';

export default function Homepage() {
  return (
    <>
    {/* <SearchForm /> */}
    {/* // About us --> */}
    <section className="about" id="about">
      <div className="row align-items-center justify-content-center">
        <div className="col-lg-12 col-md-12 mt-5 mb-5">
          <h2>About Us</h2>
        </div>
        <div className="col-md-5 col-lg-5 text-center">
          <div className="elipse-wrapper">
            <div className="elipse elipse-primary"></div>
            <div className="elipse elipse-magenta"></div>
            <div className="elipse elipse-purple"></div>
          </div>
          <div className="card-box ">
            <div className="card-imgs ">
              <Image  className="custom-imgs" layout="responsive" width={500} height={500} src={teachers} alt="virtual classroom teachers" />
            </div>
          </div>
        </div>
        <div className="col-md-5 col-lg-5">
          <h2 className="title">Get to know us</h2>
          <p>
          At The Classroom, we believe there's an easier way to go about home lessons. A flexible way where lessons can be held regardless of the distance between tutors and students. We are passionate about our belief and our mission is to help students and tutors achieve it.
          We are focused on connecting students with quality tutors to help them reach the zenith of their academic pursuits and we are very much excited about this journey.
          </p>
          <a href="#" className="btn btn-default text-white">Learn more</a>
        </div>
      </div>
    </section>
    {/* /About us --> */}

    {/* How it works --> */}
    <section className="how" id="how">
      <div className="row align-items-centers justify-content-center">
        <div className="col-lg-12 col-md-12 mt-5 mb-5">
          <h2>How it works</h2>
        </div>
        <div className="col-md-5 col-lg-5">
          <h2 className="title">To Start Using Our Services</h2>
          <ul>
            <li>
              Register as a Parent/ Student
              To start using the classroom platform click here to register
            </li>
            <li>
              Find a tutor
              Using the search bar, you can choose a tutor across different subjects and classes.
            </li>
            <li>
              Request
              Place a request on your most preferred tutor and await confirmation.
            </li>
            <li>
              Work with your tutor
              After confirmation, your preferred tutor contacts you to flesh out additional details.
            </li>
            <li>
              Start learning
              After checking all the above processes you can now proceed to start your classes
            </li>
          </ul>
          <Link href="/register">
            <a href="#" className="btn btn-default text-white">Get started</a>
          </Link>
        </div>
        <div className="col-md-4 col-lg-4 text-center">
          <div className="elipse-wrapper">
            <div className="elipse elipse-purple"></div>
            <div className="elipse elipse-magenta"></div>
            <div className="elipse elipse-primary"></div>
          </div>
          <div className="card-box">
            <div className="card-imgs">
              <Image className="custom-imgs" layout="responsive" width={500} height={500} src={processing} alt="virtual classroom processes" />
            </div>
          </div>
        </div>        
      </div>
    </section>
    {/*/ How it works --> */}

    {/* /Pricing */} 
    {/* <section className="pricing" id="pricing">
      <div className="row align-items-center justify-content-center">
        <div className="col-lg-12 col-md-12">
          <h2>Pricing</h2>
        </div>
        <div className="col-md-4 col-lg-3 col-xs-12 text-center">
          <div className="pricing-data">
            <h2 className="title">Package 1</h2>
            <div className="pricing-info">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam cum exercitationem dolorem sequi neque sapiente consequuntur facilis, consequatur ex nesciunt.
              </p>
            </div>
            <a href="#" className="btn btn-default text-white">Start trial</a>
          </div>
          <div className="elipse-wrapper">
            <div className="elipse elipse-primary"></div>
            <div className="elipse elipse-magenta"></div>
            <div className="elipse elipse-purple"></div>
          </div>
        </div>
        <div className="col-md-4 col-lg-3 col-xs-12 text-center">
          <div className="pricing-data">
            <h2 className="title">Package 1</h2>
            <div className="pricing-info">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam cum exercitationem dolorem sequi neque sapiente consequuntur facilis, consequatur ex nesciunt.
              </p>
            </div>
            <a href="#" className="btn btn-default text-white">Start trial</a>
          </div>
          <div className="elipse-wrapper">
            <div className="elipse elipse-primary"></div>
            <div className="elipse elipse-magenta"></div>
            <div className="elipse elipse-purple"></div>
          </div>
        </div>
        <div className="col-md-4 col-lg-3 col-xs-12 text-center">
          <div className="pricing-data">
            <h2 className="title">Package 1</h2>
            <div className="pricing-info">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam cum exercitationem dolorem sequi neque sapiente consequuntur facilis, consequatur ex nesciunt.
              </p>
            </div>
            <a href="#" className="btn btn-default text-white">Start trial</a>
          </div>
          <div className="elipse-wrapper">
            <div className="elipse elipse-primary"></div>
            <div className="elipse elipse-magenta"></div>
            <div className="elipse elipse-purple"></div>
          </div>
        </div>
      </div>
    </section> */}
    {/* /Pricing --> */}

    {/* FAQs --> */}
    <section className="faq" id="faq">
      <div className="row  justify-content-center align-items-start">
        <div className="col-lg-12 col-md-12 mt-5 mb-5">
          <h2>FAQs</h2>
        </div>
        <div className="col-md-3 col-lg-4 col-xs-12">
        <h2 className="title">Where will the lessons hold?</h2>
        <p>Lessons will be held on The Classroom's platform.</p>
        <h2 className="title">How qualified are the tutors?</h2>
        <p>Our tutors have Certificates in Training, and Experience in Teaching, and have been authorized by a Grand Headmaster.</p>
        <h2 className="title">How do you verify tutors?</h2>
        <p>In addition to the authorization by the Grand Headmaster, we run background checks to help us verify them.</p>
        <h2 className="title">What subjects are covered?</h2>
        <p>Subjects across different classes are taken by tutors qualified to take them.</p>
        <h2 className="title">What are your rates?</h2>
        <p>The tutors determine the rates which are usually charged on a per-hour basis.</p>
        <h2 className="title">How do I pay?</h2>
        <p>Payments are made to CI Classroom before classes begin.</p>
        <h2 className="title">What conditions warrant me getting a refund?</h2>
        <p>When a tutor misses a lesson, you can request a refund.</p>
        <h2 className="title">Can I change tutors?</h2>
        <p>Yes, you can change tutors.</p>       
        <h2 className="title">What classes and age groups does The Classroom cater to?</h2>
        <p>The Classroom caters to students across different classes and age groups.</p>

        </div>
        <div className="col-md-5 col-lg-6  col-xs-12">
          <div className="answers">
            <h2 className="title">Do you have provisions for students with special needs?</h2>
            <p>An agreement can be reached between the parents and tutors to ensure that students like this do not miss out on learning.</p>

            <div className="link">
              <a href="#">Learn more</a>
            </div>
            <div className="elipse-wrapper">
              <div className="elipse elipse-purple"></div>
              <div className="elipse elipse-magenta"></div>
              <div className="elipse elipse-primary"></div>
            </div>
          </div>
        </div>        
      </div>
    </section>
    {/*/ FAQs -->    */}
    </>
  );
}