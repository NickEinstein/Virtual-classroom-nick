
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_COURSE = "REMOVE_COURSE";

const addCourseToCart = (course, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    item => item.id === course.id
  );

  if (updatedItemIndex < 0) {
    updatedCart.push({ ...course, quantity: 1 });
  } else {
    const updatedItem = {
      ...updatedCart[updatedItemIndex]
    };
    updatedItem.quantity++;
    updatedCart[updatedItemIndex] = updatedItem;
  }
  return { ...state, cart: updatedCart };
};

const removeCourseFromCart = (courseId, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(item => item.id === courseId);

  const updatedItem = {
    ...updatedCart[updatedItemIndex]
  };
  updatedItem.quantity--;
  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }
  return { ...state, cart: updatedCart };
};

const updateCourses = (courses, state) => {
  const updateCourse = [...state.courses]
  return { ...state, courses: updateCourse}
}

export const shopReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return addCourseToCart(action.course, state);
    case REMOVE_COURSE:
      return removeCourseFromCart(action.courseId, state);
    default:
      return state;
  }
};
