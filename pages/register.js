import React from 'react';
import { Col, Row, Form, Card,Modal, Jumbotron, Container, Button} from 'react-bootstrap';
import Header2 from '../component/header2';
import RegisterForm from '../component/registerForm';
import Footer from '../component/footer';
import { post } from "../services/fetch";

import {useRouter} from 'next/router';
import Swal from 'sweetalert2';
import { useState } from 'react';
import axios from 'axios';

export default function Register() {

  const router = useRouter();
  const [details, setDetails] = useState()
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false);
  const [OTP, setOTP] = useState(false);


  const handleClose = () => setShow(false);

  const  formInputChange = (event) => {
    let {name, value} = event.target
    setDetails({...details, [name]:value})
  }

  async function  signup() {
    setLoading(true)

     const res = await post({
       endpoint: "create-account",
       body: { ...details },
       auth: false,
     });

    if (res.status == 200 || res.status == 201) {
      Swal.fire({
        title: "Success",
        text: `${res.data.message}. An OTP has been sent to your email for account Verification`,
        showCloseButton: true,
      });
      setShow(true);
    setLoading(false);

    } else {
      Swal.fire({
        title: "Sorry",
        text: `${res.data.message}`,
        showCloseButton: true,
      });
      // setShow(true);
    setLoading(false);

    }
    // setShow(true)

      // axios.post('https://theclassroom.ci-auction.ng/api/v1/signup', details)
  //     axios
  //       .post(
  //         "https://classroom.c-ileasing.com/api.virtualclassroom.com/public/api/v1/create-account",
          
  //         details
  //       )

  //       .then((response) => {
  //         if (response.data.status) {
  //           console.log('response', response.data)
  //           let id = response.data.data.id;
  //           setDetails({});
  //             // if (res.status == 200 || res.status == 201) {
  //               Swal.fire({
  //                 title: "Success",
  //                 text: `${res.data.message}`,
  //                 showCloseButton: true,
  //               });
  //             } else {
  //               Swal.fire({
  //                 title: "Sorry",
  //                 text: `${res.data.message}`,
  //                 showCloseButton: true,
  //               });
  //             // }
  //           // Swal.fire({
  //           //   title: "Successsful",
  //           //   text: `Signup successful. An OTP has been sent to your email for account Verification`,
  //           //   icon: "success",
  //           //   confirmButtonText: "OK",
  //           // });

  //   setShow(true);

  //           // router.push({
  //           //   pathname: `/auth/verification/${id}`,
  //           // })
  //         }
  //       })
  //       .catch((err) => {
  //         if (err.response) {
  //           let message;
  //           if (
  //             err.response.status == 422 ||
  //             err.response.status == 200 ||
  //             err.response.status == 401 ||
  //             err.response.status == 404
  //           ) {
  //             if (err.response.data.errors) {
  //               let errors = err.response.data.errors;
  //               let errorList = Object.values(errors);
  //               errorList.map((msg) => {
  //                 message = msg;
  //               });
  //             }
  //             Swal.fire({
  //               title: "Error",
  //               text: err.response.data.message || message,
  //               icon: "error",
  //               confirmButtonText: "Close",
  //             });
  //           }
  //         }
  //       })
  //       .finally(() => setLoading(false));
  } 

  const verifyAccountz = ()=>{

  }

  const verifyAccount = async () => {

    let payload = {
      token: OTP,
    };
    // alert('hi')
    const res = await post({
      endpoint: "verify-account",
      body: { ...payload },
      auth: false,
    });

    if (res.status == 200 || res.status == 201) {
      Swal.fire({
        title: "Success",
        text: `${res.data.message}`,
        showCloseButton: true,
      });
    } else {
      Swal.fire({
        title: "Sorry",
        text: `${res.data.message}`,
        showCloseButton: true,
      });
    }

    console.log(res);
    // console.log(res.data.token)
  };

  return (
    <React.Fragment>
      <Header2 />
      <Jumbotron className={" text-center mx-auto w-auto"}>
        <h1></h1>
        <h3>Register at TheClassroom</h3>
        <h1></h1>
      </Jumbotron>
      <Container>
        <RegisterForm
          onChange={formInputChange}
          onClick={signup}
          loading={loading}
        />
      </Container>
      <a onClick={()=>setShow(true)}>verify otp</a>
      <Footer />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="sm"
      >
        <Modal.Header closeButton>
          <h6>Enter OTP</h6>
        </Modal.Header>
        <Modal.Body>
          {/* <Col xs={12}> */}
          <Col className="mt-2 w-100">
            <Form.Control
              type="text"
              placeholder="Enter OTP"
              name="otp"
              onChange={(e) => setOTP(e.target.value)}
            />
            {/* </Col> */}
          </Col>

          <div className="flex ">
            <Button onClick={verifyAccount} style={{ marginLeft: "60px" }} className="mt-2">
              Send
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}