import React from "react";
import Navigation from "./navigation";
import TopNav from "./topnav";

export default function Header2() {
  return (
    <React.Fragment>
      <div className="sticky-top">
        <TopNav/>
        <Navigation/>
      </div>
    </React.Fragment>
  );
}