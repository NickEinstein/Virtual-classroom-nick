import logo from '../public/images/logo/logo.png';
import Image from 'next/dist/client/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-lg-4 col-xs-12">
            <div className="footer-wisdget">
              <div className="brand">
                <a href="#">
                  <Image src={logo} width="244" height="30" alt="logo" />
                </a>
              </div>
              <div className="social-links">
                <ul>
                  
                  <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                  <li><a href="#"><i className="fab fa-facebook"></i></a></li>
                  <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                  <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                </ul>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos cupiditate id ad, ea ipsum excepturi quos nam incidunt hic obcaecati.</p>
              <div className="copy-right">&copy; TheClassroom 2021</div>
            </div>
          </div>
          <div className="col-md-4 col-lg-4 col-xs-12">
            <div className="footer-widget">
              <h3>Quick Nav</h3>
              <ul>
                <li>
                  <Link href="#about">
                    <a >About Us</a>
                  </Link>
                </li>
                <li>
                  <Link href="#how">
                    <a >How it works</a>
                  </Link>                  
                </li>
                <li>
                  <Link href="#pricing">
                    <a >Pricing</a>
                  </Link>                  
                </li>
                <li>
                  <Link href="#faq">
                    <a >FAQs</a>
                  </Link>                  
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-4 col-lg-4 col-xs-12">
            <div className="footer-widget">
              <h3>Contact Us</h3>
              <form action="#">
                <div className="form-group">
                  <input type="text" name="email" placeholder="Email" className="form-control" />
                </div>
                <div className="form-group">
                  <textarea name="message" id="message" className="form-control" placeholder="Message"></textarea>
                </div>
                <button className="btn btn-default text-white">
                  Send  <i className="fa fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>    
  );
}