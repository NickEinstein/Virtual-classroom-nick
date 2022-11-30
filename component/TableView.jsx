import DashboardHeader from "../../../component/dashboard/header";
import DashboardLayout from "../../../component/dashboard/layout";
import ListGrid from "../../../component/dashboard/list/listGrid";
import ListItem from "../../../component/dashboard/list/listItem";
import { useState, useEffect, useContext } from "react";
import { post, get } from "../../../services/fetch";
import axios from "axios";
import { Collapse, Button, Table, Form, Input } from "antd";
import { AuthContext } from "../../../store/context/authContext";
import moment from "moment";
import {
  Card,
  //   Table,
  Modal,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { useRouter } from "next/router";
// import PreferenceForm from "../../../component/preference-form";

export default function TableView({dataSource, column}) {
  const { Panel } = Collapse;
  const { TextArea } = Input;

  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

  const dataSource = dataSource

  const columns = columns

  const headingColor = {
    backgroundColor: "#4166f5",
  };
  const textColor = {
    color: "white",
  };

 
  return (
    <>
        <div className="row mb-3 mt-3">
         
         
        <div style={{ width: "90%", margin: "0 auto" }}>
          <div className="mb-4" style={{ width: "100%" }}>
            <h2 className="h3">Students</h2>
            <Table bordered dataSource={dataSource} columns={columns} />
          </div>
         
        </div>
        </div>
    </>
  );
}
