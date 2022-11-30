import axios from 'axios';
import Link from 'next/dist/client/link';
import { useRouter } from 'next/dist/client/router';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../store/context/authContext';
import ShopContext from '../../store/context/shopContext';
import style from './cart.module.scss';

export default function ShoppingCart() {

  const context = useContext(ShopContext)
  const [user, setUser] = useContext(AuthContext)
  const [payee, setPayee] = useState('')
  const router = useRouter()

  const cartTotal = context.cart.reduce((price, item) => { return price + (item.fee * item.quantity)}, 0.00)
  const courseIds = context.cart.map((c, id) => { return c.id})
  useEffect(() => {
    console.log("CartTotal", user)
  },[])

  function selectChild(event) {
    let {name, value} = event.target
    setPayee(value)
    // console.log(value)
  }

  function checkIfChildIsSelected() {
    // console.log("payee", payee == '')
    if(user.user_type === 'GUARDIAN' && payee === '' || payee == undefined) {
      Swal.fire({
        title: "Error",
        icon: 'error',
        text: 'Select a child.'
      })
    }
    else {
      // payWithPaystack()
    }
  }

  function verifyPayment(reference) {
    axios.post(`https://theclassroom.ci-auction.ng/api/v1/payment/verify`, {
      courses: courseIds,
      user_id: user.id,
      reference: reference,
    })
    .then(response => {
      // console.log(response)
      if(response.data.status) {
        Swal.fire({
          title: 'Payment',
          icon: 'success',
          text: 'Payment successful'
        })
        router.push('/dashboard/'+user.user_type.toLowerCase())        
      }
    })
    .catch(err => console.log(err))
  }

  function payWithPaystack(){
    var handler = PaystackPop.setup({
      key: 'pk_test_741bc055b3cfde6f6c5244d89a38b99532d13ea2',
      email: user.email,
      amount: cartTotal * 100,
      currency: "NGN",
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), 
      metadata: {
        userID: user.id,
        child: payee,
        courses: courseIds
      },
      callback: function(response){
        // alert('success. transaction ref is ' + response.reference);
        console.log("Response from paystack", response)
        verifyPayment(response.reference)
      },
      onClose: function(){
          // alert('window closed');
      }
    });
    handler.openIframe();
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="col-md-12 col-lg-12 col-xs-12">
          <h5>Cart</h5>
        </div>
        {
          context.cart.length <= 0 ?
          <div className="col-md-12 col-lg-12 col-xs-12 text-center">
            No item in cart
          </div>   
          :
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Subject</th>
                  <th className="text-center">Quantity</th>
                  <th>Fee</th>
                  <th>Sub total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  context.cart.map((course, index) => (
                    <tr key={index}>
                      <td>{index+1+'.'}</td>
                      <td>{course.title}</td>
                      <td className="text-center">{course.quantity}</td>
                      <td>{course.fee_formatted}</td>
                      <td className="text-center">{course.fee * course.quantity}</td>
                      <td className="text-center">
                        <button 
                          type="button"
                          className={"text-danger "+style.deletebtn}
                          onClick={context.removeCourseFromCart.bind(this, course.id)}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  ))  
                  
                }
                  {
                    user && user.user_type === 'GUARDIAN' ?
                      <tr>
                        <td colSpan="2"  className="text-right">
                          <strong>Select a child:</strong>
                        </td>
                        <td>
                          <select 
                            name="student_id" 
                            className={"form-control "+style.select}
                            onChange={selectChild}
                          >
                            <option value="">Select one</option>
                            {
                              user.children && user.children.length ?
                                user.children.map((c, index) => (
                                  <option 
                                    key={index} 
                                    value={c.id}
                                  >
                                    {c.first_name+' '+c.last_name}
                                  </option>
                                ))
                                :
                                <option value="">No child added</option>
                            }
                          </select>                    
                        </td>
                        <td colSpan="2" className="text-right">
                          <strong>Total:</strong>
                        </td>
                        <td>
                          {context.cart.reduce((price, curItem) => {
                            let total = price + (curItem.fee * curItem.quantity)
                            return total
                          }, 0.00)}
                        </td>
                      </tr>
                    :
                      <tr>
                        <td colSpan="5" className="text-right">
                          <strong>Total:</strong>
                        </td>
                        <td>
                          {context.cart.reduce((price, curItem) => {
                            let total = price + (curItem.fee * curItem.quantity)
                            return total
                          }, 0.00)}
                        </td>
                      </tr>                    
                  }
              </tbody>
            </table>
            <div className="text-rights">
              <Link href="/courses" className={"mr-4 "+style.link} >
                <a>
                  Back to Subjects 
                </a>
              </Link>
              <button 
                type="button" 
                className={"btn btn-default btn-sm "+style.cartbtn}
                onClick={checkIfChildIsSelected}
              >
                Pay now
              </button>
            </div>        
          </div>      
        }
      </div>
    </div>
  );
}