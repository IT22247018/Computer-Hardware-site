// UserDashboard.js
import React from "react";
import { NavLink } from "react-router-dom";
import '../../styles/assets/css/material-dashboard.min.css';

const UserMenu = ({ children }) => {
  return (
    <div>
      <aside className="navbar-vertical navbar-expand-xs my-3 bg-gradient-dark" id="sidenav-main" style={{ position: 'fixed', left: 0, top: 0, bottom: 0 }}>
        <div className="sidenav-header">
          <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
        </div>
        <hr className="horizontal light mt-0 mb-2" />
        <div className="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link text-white active bg-gradient-primary" to="../pages/dashboard.html">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">dashboard</i>
                </div>
                <span className="nav-link-text ">Dashboard</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white " to="/dashboard/user/orders">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">table_view</i>
                </div>
                <span className="nav-link-text ms-1">Orders</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white " to="../pages/billing.html">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">receipt_long</i>
                </div>
                <span className="nav-link-text ms-1">Billing</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white " to="/dashboard/user/appointment">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">view_in_ar</i>
                </div>
                <span className="nav-link-text ms-1">Book Appointment</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white " to="/dashboard/user/currentappointments">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">format_textdirection_r_to_l</i>
                </div>
                <span className="nav-link-text ms-1">Appointments</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white " to="/dashboard/user/notification">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">notifications</i>
                </div>
                <span className="nav-link-text ms-1">Notifications</span>
              </NavLink>
            </li>
            <li className="nav-item mt-3">
              <h6 className="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Account pages</h6>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white " to="/dashboard/user/profile">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">person</i>
                </div>
                <span className="nav-link-text ms-1">Profile</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        {/* Content goes here */}
      </main>
    </div>
  );
};

export default UserMenu;
