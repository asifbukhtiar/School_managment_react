import React from 'react';

const HeaderComponent = (props) => {
    return (
        <div className="topbar">
        <nav className="navbar-custom">
           <ul className="list-unstyled topbar-right-menu float-right mb-0">
              <li className="dropdown notification-list bell-icon">
                 <div className="nav-link dropdown-toggle arrow-none" onClick={props.logout} role="button"
                    aria-haspopup="false" aria-expanded="false">
                 <i className="icon-logout noti-icon"></i>
                 {/* <span className="badge badge-danger badge-pill mdi-logout"></span> */}
                 </div>
              </li>
           </ul>
          
           <ul className="list-inline menu-left mb-0">
              <li className="float-left">
                 <button className="button-menu-mobile open-left disable-btn">
                 <i className="dripicons-menu"></i>
                 </button>
              </li>
              <li>
                 <div className="page-title-box">
                    <div className="d-flex align-items-center store-title">
                        {/* <div className="store-image"><span>SN</span></div> */}
                        <h4 className="page-title">{props.breadCrump} </h4>
                    </div>
                 </div>
              </li>
           </ul>
        </nav>
     </div>
    )
}
export default HeaderComponent