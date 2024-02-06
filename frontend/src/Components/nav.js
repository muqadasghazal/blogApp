import React  from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";



const Nav = () => {
    let location = useLocation();
    let navigate = useNavigate()
    const handleLogout=()=>{
      localStorage.removeItem('token');
      navigate('/login')
    }
 
   
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top ">
      <div className="container-fluid">
        <a className="navbar-brand mb-0 h1" href="/">
          Blog App
        </a>
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link className={`nav-link ${location.pathname === "/createpostss" ? "active" : ""}`} to="/createpostss">
                Create Posts
              </Link>
            </li>
            <li className="nav-item">
             
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
                Profile
              </Link>
            </li>
            <li className="nav-item">
            <Link className={`nav-link ${location.pathname === "/feed" ? "active" : ""}`} to="/feed">
                Feed
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
  <>
    <Link className="btn btn-primary mx-1" to="/login" role="button">
      Login
    </Link>
    <Link className="btn btn-primary mx-1" to="/signup" role="button">
      SignUp
    </Link>
  </>
) : (
  <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
)}
          
        </div>
      </div>
    </nav>
  );
};

export default Nav;
