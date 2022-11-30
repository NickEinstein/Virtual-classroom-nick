import DashboardContent from '../dashboard/DashboardContent';
import Sidebar from '../dashboard/sidebar';
import { AuthContext } from '../../store/context/authContext';

import { useState, useContext } from 'react';

export default function DashboardLayout({children}) {
  const [navToggle, setNavToggle] = useState(true) 
  const [fullWidth, setFullWidth] = useState(" ")
  // const [user, setUser] = useContext(AuthContext)

  function toggleMenu() {
   

    

    setNavToggle(!navToggle)
    if(fullWidth === " ") 
      setFullWidth("full-width ")
    else
    setFullWidth(" ")
  }

  return (
    <div>
      <Sidebar style={navToggle ? " " : "sidebar-collapse"} user_type="student" />
      <DashboardContent style={fullWidth} >
        <div style={{marginBottom:'20px'}} className="menu-toggle mb-4 mr-4" onClick={toggleMenu}>
          <i className="fa fa-bars"></i>
        </div>
        {children}
      </DashboardContent>
    </div>
  )
}