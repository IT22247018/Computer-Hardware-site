import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaComputer } from "react-icons/fa6";
import { SiOpensourcehardware } from "react-icons/si";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/usecategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
  };

  useEffect(() => {
    const countUnreadNotifications = () => {
      // Check if the notifications array exists in auth and count unread notifications
      const unreadCount = auth?.user?.notifications?.filter(
        notification =>
          notification.status === "unread" &&
          (notification.message.includes("Approved") ||
            notification.message.includes("Rejected"))
      )?.length || 0;

      console.log("Unread notification count:", unreadCount);
      setUnreadNotificationCount(unreadCount);
    };

    countUnreadNotifications();
  }, [auth]);

  console.log("Auth state:", auth);
  console.log("Unread notification count:", unreadNotificationCount);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Link to="/" className="navbar-brand logo">
              <FaComputer />
              <SiOpensourcehardware />
              Green-Line Technology
            </Link>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />

              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link"
                  activeClassName="active-link"
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/register"
                      className="nav-link"
                      activeClassName="active-link"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className="nav-link"
                      activeClassName="active-link"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu dropdown-menu-dark">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1
                              ? "admin"
                              : auth?.user?.role === 2
                              ? "employee"
                              : auth?.user?.role === 3
                              ? "employeeuser"
                              : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              <li className="nav-item">
                <Badge count={unreadNotificationCount} showZero>
                  <NavLink
                    to="/dashboard/user/notification"
                    className="nav-link"
                    activeClassName="active-link"
                  >
                    Notifications
                  </NavLink>
                </Badge>
              </li>
              <li className="nav-item">
                <Badge count={cart?.length} showZero>
                  <NavLink
                    to="/cart"
                    className="nav-link"
                    activeClassName="active-link"
                  >
                    Cart
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
