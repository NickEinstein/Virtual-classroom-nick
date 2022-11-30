import style from "./topnav.module.scss";
import Link from "next/link";
import logo from "../public/images/logo/logo.png";
import Image from "next/dist/client/image";
import { useContext } from "react";
import { AuthContext } from "../store/context/authContext";
import { Button } from "react-bootstrap";
import { useState } from "react";

export default function TopNav() {
  const [user, setUser] = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  function logOut() {
    // localStorage?.clear();
    window.localStorage.clear();
    window.location?.replace('/')
  }
let john;
let link;
  if (typeof window !== "undefined") {
    if (localStorage?.getItem("il") == "yes") {
      // setIsLoggedIn(true);
      john = true
    }
    else
    john =false

    if (localStorage?.getItem("role") == "guardian") 
      link = '/dashboard/guardian'
    else
      link = '/dashboard/tutor'
  }
    
  

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white" fixed="top">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">
            <Image src={logo} className="img-fluid" alt="logo" />
          </a>
        </Link>
        {!john ?(
          <div className="d-flex">
            <Link href={"/auth/login"}>
              <a className={style.buttons + " btn btn-outline-primary mr-2"}>
                <i className="fas fa-sign-in-alt"></i> Login
              </a>
            </Link>
            <Link href="/register">
              <a className={style.buttons + " btn btn-outline-primary"}>
                <i className="fas fa-user-plus"></i> Register
              </a>
            </Link>
          </div>
        ) : (
          <div className="d-flex">
            <Button
              variant="light"
              className={style.buttons + " btn btn-outline-primary mr-2"}
              onClick={logOut}
            >
              <i className="fas fa-sign-out-alt"></i> Logout
            </Button>
            <Link href={link}>
              <a className={style.buttons + " btn btn-outline-primary"}>
                <i class="fas fa-tachometer"></i> Dashboard
              </a>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
