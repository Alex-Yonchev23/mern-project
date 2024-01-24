import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './nav.css';
import logo from '../../images/i-logo.png';
import { Link }  from 'react-router-dom'

export default function Nav() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-transparent' style={{ maxHeight: '110px' }}>
      <div className='container'>
        <button className='navbar-toggler shadow-none border-0 ms-auto' type='button' onClick={toggleSidebar}>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className={`sidebar offcanvas offcanvas-start ${showSidebar ? 'show' : ''}`}  id='offcanvasNavbar'>
          <div className="offcanvas-header text-white border-bottom">
            <h1 className="offcanvas-title fs-4" id="offcanvasNavbarLabel">Ironic</h1>
            <button className="btn-close shadow-none btn-close-white" type="button"  onClick={toggleSidebar} aria-label="Close"></button>
          </div>
        
        <div className='offcanvas-body d-flex flex-column flex-lg-row p-4 grow-0'>
            <ul className='navbar-nav justify-content-center align-items-center font-bold flex-grow pe-3'>
              <Link to='/'>
                <li className='nav-item mx-1'>
                    Home
                </li>
              </Link>
                
              <Link to='/about-us'>
                <li className='nav-item mx-1'>
                  About us
                </li>
              </Link>

              <Link to='/gallery'>
                <li className='nav-item mx-1'>
                  Gallery
                </li>
              </Link>

              <Link to='/'>
                <li className="nav-item px-4">
                  <div className="div-logo">
                    
                      <img src={logo} alt="logo" className="logo max-w-full h-auto transition-all duration-300 ease-in-out" style={{ maxHeight: '100px' }} />
                    
                  </div>
                </li>
              </Link>

              <Link to='/services'>
                <li className='nav-item mx-1'>
                  Services
                </li>
              </Link>

              <Link to='/blog'>
                <li className='nav-item mx-1'>
                  Blog
                </li>
              </Link>
              
              <Link to='/contact-us'>
                <li className='nav-item mx-1'>
                  Contact us
                </li>
              </Link>
            </ul>

            <div className='d-flex flex-column justify-contant-center align-items-center gap-3 flex-lg-row'>
              <a href="/sign-in" className='text-white'>Log In</a>
              <a href="/sign-up" className='text-black decoration-none px-3 py-1 rounded-4 bg-[#f3e8cc]'>Sign Up</a>
            </div>
            
            </div>
        </div>
      </div>
    </nav>
  );
}
