import Image from 'next/dist/client/image';
import logo from '../public/images/logo/logo.png';
import banner from  '../public/images/banners/teacher.png';
import Link from 'next/link'
import { useState } from 'react';

export default function Header() {
  const [navToggle, setNavToggle] = useState(false);

 function toggleMenu() {
    setNavToggle(!navToggle)
  }

  return (
    <section className="header">
      <div className="hero">
        <div className="container">
          <header>
            <nav className="navbar navbar-expand-sm navbar-light">
              <Link href="/" >
                <a className="navbar-brand" >
                  <Image src={logo} className="img-fluid" alt="logo" />
                </a>
              </Link>
              <button onClick={toggleMenu} className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                  aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                  <li className="nav-item active">
                    <Link href="#about">
                      <a className="nav-link">About Us</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="#how">
                      <a className="nav-link">How it works</a>
                    </Link>                    
                  </li>
                  <li className="nav-item">
                    <Link href="#pricing">
                      <a className="nav-link">Pricing</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="#faq">
                      <a className="nav-link">FAQs</a>
                    </Link>
                  </li>
                </ul>
                <ul className="ml-auto navbar-nav">
                  <li className="nav-item">
                    <Link href="/auth/login">
                      <a className="nav-link">Login</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/signup">
                      <a className="nav-links btn btn-default">Start Trial</a>
                    </Link>
                  </li>
                </ul>                
              </div>
              { navToggle ? 
                <div className="mobile-menu navbar-collapse">
                  <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                      <Link href="#about">
                        <a className="nav-link">About Us</a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="#how">
                        <a className="nav-link">How it works</a>
                      </Link>                    
                    </li>
                    <li className="nav-item">
                      <Link href="#pricing">
                        <a className="nav-link">Pricing</a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="#faq">
                        <a className="nav-link">FAQs</a>
                      </Link>
                    </li>
                  </ul>
                  <ul className="ml-auto navbar-nav">
                    <li className="nav-item">
                      <Link href="/signup">
                        <a className="nav-link">Login</a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/signup">
                        <a className="nav-links btn btn-default">Start Trial</a>
                      </Link>
                    </li>
                  </ul>
                </div>
                :
                null
              }
            </nav>
          </header>
          <div className="row mt-4 mb-4 align-items-center justify-content-between">
            <div className="col-xs-12 col-md-5 col-lg-5">
              <h1>Learning <br /> at your comfort</h1>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia perferendis odit sapiente esse nam assumenda fugiat dolores, iusto repellat ab!</p>
              <a href="#" className="btn btn-white">Get started</a>
            </div>
            <div className="col-xs-12 col-md-6 col-lg-6">
              <Image src={banner} alt="teacher" className="img-fluid"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}