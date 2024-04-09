import React from 'react'
import {Outlet} from 'react-router-dom' 
function ViewerNavbar() {
  return (
    <> 
    <div>Iterviewer Navbar</div>
    <Outlet/>
    </>
    
  )
}

export default ViewerNavbar