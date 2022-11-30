import React, { useReducer, useEffect, createContext} from "react";

let reducer = (user, newUser) => {
  if (newUser === null) {
    localStorage.removeItem("user");
    return initialState;
  }
  return { ...user, ...newUser };
};

const initialState = {
  last_name: '', 
  user_type: '', 
  id: ''
};

let localState = {}

if (typeof window !== 'undefined') {
   localState = JSON.parse(localStorage.getItem("user"));
}
export const AuthContext = createContext();

export function AuthProvider({children}) {

  const [user, setUser] = useReducer(reducer, localState || initialState);
  
  useEffect(() => {

  }, [user]);


  return (
    <AuthContext.Provider value={[ user, setUser ]}>
      {children}
    </AuthContext.Provider>
  );
}


