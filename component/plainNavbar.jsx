import Image from "next/dist/client/image"
import logo from "../public/images/logo/logo.png"
import Link from "next/dist/client/link"

export default function PlainNavbar() {
  return (
    <header className=" mt-4 mb-4t">
      <div >
        <Link href="/">
          <a className="navbar-brand">
            <Image src={logo} alt="logo" />
          </a>
        </Link>
      </div>
    </header>
  )
}