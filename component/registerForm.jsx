import { useState } from 'react';
import { Form, Card, Row, Col, Button, Spinner } from 'react-bootstrap';
import style from './registerForm.module.scss';

export default function RegisterForm(props) {
  

  return (
    <Col size="lg" xs="12" className={style.wrapper}>
      <Card className={style.card}>
        <Card.Body>
          <Form>
            <Row>
              <Col xs="12">
                <select name="user_type"  className="form-control" onChange={props.onChange}>
                  <option value="">Select account type</option>
                  <option value="teacher">Tutor </option>
                  <option value="guardian">Parent </option>
                  {/* <option value="STUDENT">Student </option> */}
                </select>
              </Col>
              <Col xs="6" className="mt-2">
                <Form.Control type="text" placeholder="First Name" name="first_name" onChange={props.onChange} />
              </Col>
              <Col xs="6" className="mt-2">
                <Form.Control type="text" placeholder="Last Name" name="last_name"  onChange={props.onChange}/>
              </Col>
              <Col xs="6" className="mt-2">
                <Form.Control type="email" placeholder="Email adderss" name="email"  onChange={props.onChange}/>
              </Col>
              <Col xs="6" className="mt-2">
                <Form.Control type="tel" placeholder="Phone number" name="phone_number"  onChange={props.onChange}/>
              </Col>
              <Col xs="6" className="mt-2">
                <Form.Control type="password" placeholder="Password" name="password"  onChange={props.onChange}/>
              </Col>
              <Col xs="6" className="mt-2">
                <Form.Control type="password" placeholder="Confirm Password" name="password_confirmation"  onChange={props.onChange}/>
              </Col>
            </Row>
            <Col xs="12" className="mt-3 mb-2">
              <Button type="button" variant="primary text-white" onClick={props.onClick}>
                Continue  
                { props.loading ? 
                  <Spinner animation="border" variant='light' size='sm' className='ml-2' role="status"/>
                  : null 
                }
              </Button>
            </Col>
          </Form>
        </Card.Body>
      </Card>
    </Col>    
  );
}