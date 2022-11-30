import Image from "next/dist/client/image";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useContext } from "react";
import avatar from "../../public/images/avatar.png";
import { AuthContext } from "../../store/context/authContext";
// import ShopContext from "../../store/context/shopContext";

export default function DashboardHeader(props) {

  const [user, setUser] = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const router = useRouter()

  function logout() {
    localStorage.clear()
    setUser(null)
    router.push('/')
  }

  const toggle = ()=>{
    console.log(showDropdown)
    setShowDropdown(!showDropdown)
  }

  return (
    <header>
      <nav
        className="navbar navbar-expand-sm desktop-nav"
        style={{ backgroundColor: "#4166f5", marginLeft: "30px", color: "white" }}
      >
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <Link href={``}>
              <a className="nav-link ">{props.title || ""}</a>
            </Link>
          </li>
        </ul>
        <ul className="ml-auto navbar-nav">
          <li className="nav-item  ">
            <a
              className="nav-link d-flex align-items-center"
              href="#"
              onClick={logout}
            >
              <svg
                className="bold cursor mr-10"
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-power"
                viewBox="0 0 16 16"
              >
                <path d="M7.5 1v7h1V1h-1z" />
                <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
              </svg>
              <p>Logout</p>
            </a>
          </li>
          <li className="nav-item">
            {/* <Link href="/cart">
              <a className="nav-link notification px-3">
                <i className="ion-ios-cart-outline"></i>
                <span className="badge badge-pink">{props.cartCount}</span>
              </a>
            </Link> */}
          </li>
          <li className="nav-item">
            {/* <Link href="#">
              <a className="nav-link notification px-3">
                <i className="ion-android-notifications-none"></i>
              </a>
            </Link> */}
          </li>
          <li className="nav-item dropdown">
            <div
              onClick={toggle}
              className="nav-link dropdown-toggle"
              // href="#"
              // id="navbarDropdownMenuLink"
              // role="button"
              // data-toggle="dropdown"
              // aria-haspopup="true"
              // aria-expanded="false"
            >
              {/* <Image src={avatar} width="40" height="40" className="rounded-circle mt-3"/> */}
              Hi {user.last_name}
            </div>
          </li>
        </ul>
      </nav>
      {/* {showDropdown && (
        <div
          style={{ zIndex: 20, border:'2px solid', padding:'10px'}}
          // className="dropdown-menu"
          // aria-labelledby="navbarDropdownMenuLink"
        >
          <Link href="/dashboard/profile">
            <a className="dropdown-item">Edit Profile</a>
          </Link>
          <a className="dropdown-item" href="#">
            Log Out
          </a>
        </div>
      )} */}
    </header>
    // <ShopContext.Consumer>
    //   {
    //     context => (
    //     )
    //   }
    // </ShopContext.Consumer>
  );
}