import React, { useEffect } from 'react'
import { Link, useLocation,useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate()
let location = useLocation();
useEffect(()=>{
  console.log(location.pathname)
},[location])
const logoutClicked = ()=>{
  localStorage.removeItem("token");
  navigate("/login")
}

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-warning bg-warning">
    <div className="container-fluid">
      <Link className="navbar-brand" active =
  "fontWeight: bold" to="/">iNoteBook</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link  ${location.pathname === "/"?"active":""}`} aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link  ${location.pathname === "/about"?"active":""}`} to="/about">About</Link>
          </li>
        
       
        </ul>
        {!localStorage.getItem('token')?<form className="d-flex" role="search">
        <Link className="btn btn-dark mx-1" to="/login" role="button">login</Link>
        <Link className="btn btn-dark mx-1" to="/signup" role="button">signUp</Link>
        </form>:<button className='btn btn-info' onClick={logoutClicked}>logout</button>}
      </div>
    </div>
  </nav>
  </>
  )
}

export default Navbar
