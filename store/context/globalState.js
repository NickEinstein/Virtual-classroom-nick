import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";
import ShopContext from "./shopContext";
import { shopReducer, ADD_TO_CART, REMOVE_COURSE } from "./reducers";

export const GlobalState = props => {

  const [courses, setCourses] = useState([])
  const [categories, setCategories] = useState([])
  const [cartState, dispatch] = useReducer(shopReducer, { cart: [] });
  // const [courses, setCourses] = useState(shopReducer, { courses: [] });

  useEffect(() => {
    // getCourses()
    // getCategories()
  }, [0])

  function getCourses() {
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/courses`)
    .then(response => {
      if(response.data.status) {
        // console.log(response.data.data.data) 
        setCourses(response.data.data.data)
      }
    }) 
  }  

  function getCategories() {
    axios.get(`https://theclassroom.ci-auction.ng/api/v1/category`)
    .then(response => {
      if(response.data.status) {
        // console.log(response.data.data.data)
        setCategories(response.data.data.data)
      }
    }) 
  }  

  const addCourseToCart = course => {
    setTimeout(() => {
      dispatch({ type: ADD_TO_CART, course: course });
    }, 500);
  };

  const removeCourseFromCart = courseId => {
    setTimeout(() => {
      dispatch({ type: REMOVE_COURSE, courseId: courseId });
    }, 500);
  };

  return (
    <ShopContext.Provider
      value={{
        courses: courses,
        categories: categories,
        cart: cartState.cart,
        addCourseToCart: addCourseToCart,
        removeCourseFromCart: removeCourseFromCart
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

