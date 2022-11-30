import React from "react";
import DashboardHeader from "../component/dashboard/header";
import DashboardLayout from "../component/dashboard/layout";
import Sections from "../component/section";
import ShopContext from "../store/context/shopContext";

export default function ClassSection() {
  return (
    <React.Fragment>
      <DashboardLayout>
        <DashboardHeader title="Sections"/>
        <div className="row p-4">
          <Sections title="Primary 1"/>
          <Sections title="Primary 2"/>
          <Sections title="Primary 3"/>
        </div>
      </DashboardLayout>
    </React.Fragment>
  );
}