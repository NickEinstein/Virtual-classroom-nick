import React from "react";

export default React.createContext({
  courses: [],
  categories: [],
  cart: [],
  addCourseToCart: course => {},
  removeCourseFromCart: courseId => {}
});
