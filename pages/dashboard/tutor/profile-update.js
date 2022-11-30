import React, { useContext, useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import Footer from "../../../component/footer";
import Header2 from "../../../component/header2";
import ProfileUpdate from "../../../component/profileUpdate";
import { AuthContext } from "../../../store/context/authContext";
import { post,get } from "../../../services/fetch";
import Swal from "sweetalert2";

export default function AccountUpate() {
  const [user, setUser] = useContext(AuthContext);
  const [profile, setProfile] = useState({
    institution: '',
    // from_date: '',
    // to_date: '',
    qualification: '',
    address: '',
    bio: '',
    // address: props?.profile?.details?.address || "",
  });
   

  const userProf = async () => {
   
    // alert('hi')
    const res = await get({
      endpoint: "user-profile",
      // body: { ...payload },
      // auth: false,
    });

    if(res.status==200){
      //  Swal.fire({
      //    title: "Successsful",
      //    text: "Signup successful",
      //    icon: "success",
      //    confirmButtonText: "OK",
      //  });
      console.log(res.data.data)
      setProfile(res.data.data)
    }
    // console.log(res.data.token)
  };

  useEffect(()=>{
userProf()
  },[])

  return (
    <React.Fragment>
      <Header2/>
      <Container>
        <Row className="justify-content-center">
          <Col xs={8}>
            <ProfileUpdate profile = {profile}/>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </React.Fragment>
  );
}