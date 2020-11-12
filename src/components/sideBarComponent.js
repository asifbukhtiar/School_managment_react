import React from "react";
const SideBarComponent = (props) => {
   const changeView = (type) => {
      props.fun(type)
   }
    return (
        <div className="left side-menu">
            <div className="slimscroll-menu" id="remove-scroll">
              
               <div className="topbar-left">
                  <a href="index.html" className="logo">
                  
                  Logo Here
                  </a>
               </div>
               
               <div id="sidebar-menu">
                  <ul className="metismenu" id="side-menu">
                     <li onClick={() => changeView("studentList")}>
                        <a href="javascript:void(0)">
                        <i className="mdi mdi-account-multiple"></i> <span> Students </span>
                        </a>
                     </li>
                     <li onClick={() => changeView("teacherList")}>
                        <a href="javascript:void(0)">
                        <i className="mdi mdi-school"></i> 
                        <span> Teachers </span>
                        </a>
                     </li>
                     <li onClick={() => changeView("changePassword")}>
                        <a href="javascript:void(0)">
                        <i className="mdi mdi-lock-reset"></i> 
                        <span> Change Password </span>
                        </a>
                     </li>
                     
                  </ul>
               </div>
               
               <div className="clearfix"></div>
            </div>
         </div>
    )
}
export default SideBarComponent