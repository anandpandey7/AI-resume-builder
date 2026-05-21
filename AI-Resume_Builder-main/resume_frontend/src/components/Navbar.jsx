import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Navbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-50 shadow-sm px-4 lg:px-8 border-b border-base-200">
    <div className="navbar-start">
    <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
        </div>
        <ul
          tabIndex="-1"
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li><Link to={"/about"}>
              About</Link>
          </li>

          <li>
            <Link 
              to={"/interview-prep"}>
              Interview Prep
            </Link>
          </li>

          <li>
            <Link
              to={"/contact"}>
              Contact Us
            </Link>
          </li>
          <li>
            <Link to={"/jd-resume"}>
              JD Match
            </Link>
          </li>
        </ul>
      </div>
      <Link to={'/'} className="btn btn-ghost text-2xl font-bold tracking-tight text-primary">AI Resume Maker</Link>
    </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 gap-2 font-medium">
      <li><Link to={"/about"} className="hover:text-primary transition-colors rounded-lg">
        About</Link>
      </li>

      <li>
        <Link 
          to={"/interview-prep"} className="hover:text-primary transition-colors rounded-lg">
          Interview Prep
        </Link>
      </li>

      <li>
        <Link
          to={"/contact"} className="hover:text-primary transition-colors rounded-lg">
          Contact Us
        </Link>
      </li>
      <li>
        <Link to={"/jd-resume"} className="hover:text-primary transition-colors rounded-lg">
          JD Match
        </Link>
      </li>
      
    </ul>
  </div>
  <div className="navbar-end">
    {isAuthenticated && user ? (
      <Link to="/profile" className="avatar placeholder cursor-pointer hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-base-100 rounded-full transition-all">
        <div className="bg-primary text-primary-content rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg">
          <span>{user.firstName?.charAt(0).toUpperCase() || "U"}</span>
        </div>
      </Link>
    ) : (
      <Link to="/signin" className="btn btn-primary px-6 rounded-full font-semibold shadow-lg hover:shadow-primary/50 transition-all">Login</Link>
    )}
  </div>
</div>
  );
}

export default Navbar;