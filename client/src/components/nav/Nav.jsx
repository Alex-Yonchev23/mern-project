import './nav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import logo from '../../images/i-logo.png';
import "../../images/avatar.png";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/userSlice';
import { Dropdown,Navbar } from 'flowbite-react';
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from 'react-icons/hi';
import { logOut} from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function Nav() {
  const [showSidebar, setShowSidebar] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const userAvatar = currentUser?.user?.avatar;
  const dispatch = useDispatch();

  const switchToShowLogin = () => {
    setShowLogin(true);
    toggleSidebar(); 
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  useEffect(() => {
    document.body.style.paddingTop = `${document.querySelector('.navbar').offsetHeight}px`;

    const handleResize = () => {
      document.body.style.paddingTop = `${document.querySelector('.navbar').offsetHeight}px`;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleLogOut = async () => {
    try {
      await fetch('/server/auth/log-out');
      dispatch(logOut());
    } catch (error) {
        console.log(error);
    }
}

  return (
    <Navbar className='navbar navbar-expand-lg bg-transparent fixed-top z-1 select-none' style={{ maxHeight: '110px' }}>
      <button className='navbar-toggler shadow-none border-0 ms-auto' type='button' onClick={toggleSidebar}>
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className={`sidebar offcanvas offcanvas-start ${showSidebar ? 'show' : ''}`} id='offcanvasNavbar'>
        <div className="offcanvas-header text-white border-bottom">
          <h1 className="offcanvas-title fs-4" id="offcanvasNavbarLabel">Ironic</h1>
          <button className="btn-close shadow-none btn-close-black bg-yellow-400" type="button" onClick={toggleSidebar} aria-label="Close"></button>
        </div>
        
        <div className='offcanvas-body d-flex flex-column flex-lg-row'>
            <ul className='navbar-nav justify-content-center align-items-center font-bold flex-grow space-x-4'>
              <Link to='/'>
                <li className='nav-item'>
                    Home
                </li>
              </Link>
                
              <Link to='/about-us'>
                <li className='nav-item'>
                  About us
                </li>
              </Link>

              <Link to='/gallery'>
                <li className='nav-item'>
                  Gallery
                </li>
              </Link>

              <Link to='/'>
                <li className="logo px-4 ">
                      <img src={logo} alt="logo" className="logo max-w-full h-auto" style={{ maxHeight: '100px' }} />
                </li>
              </Link>

              <Link to='/services'>
                <li className='nav-item '>
                  Services
                </li>
              </Link>

              <Link to='/blog'>
                <li className='nav-item '>
                  Blog
                </li>
              </Link>
              
              <Link to='/contact-us'>
                <li className='nav-item '>
                  Contact us
                </li>
              </Link>
            </ul>
            
            <div className='d-grid place-items-center '>
              <div className='d-flex flex-column gap-2 flex-lg-row font-bold text-sm absolute right-7'>
              {currentUser ? (
                          <>
                              <Dropdown
                                arrowIcon={false}
                                inline
                                label={
                                  <img src={userAvatar} alt="User Avatar" className='h-10 w-10 rounded-full object-cover hover:ring-1 hover:ring-yellow-100 hover:ring-offset-2 hover:ring-offset-neutral-900 hover:golden-shadowgolden-shadow transition-all duration-400'  />
                                }
                              >
                                <Dropdown.Header>
                                  <span className="block text-sm raleway">{currentUser.user.firstName} {currentUser.user.lastName}</span>
                                  <span className="block truncate text-sm font-semibold ">{currentUser.user.email}</span>
                                </Dropdown.Header>
                                <Link to='/profile'>
                                  <Dropdown.Item icon={HiViewGrid}>Dashboard</Dropdown.Item>
                                </Link>
                                  <Dropdown.Divider />
                                  <Dropdown.Item icon={HiLogout} onClick={handleLogOut}>Log out</Dropdown.Item>
                              </Dropdown>
                          </>
                        ) : (
                          <>
                            <Link to='/profile'>
                              <lord-icon
                                src="https://cdn.lordicon.com/dxjqoygy.json"
                                trigger="hover"
                                target="log-reg"
                                colors="primary:#f3e8cc,secondary:#f3e8cc"
                                stroke="60"
                                style={{ width: '50px', height: '50px' }}
                              ></lord-icon>
                              <p className='text-black decoration-none px-2 rounded-4 bg-[#f3e8cc] py-1'>Sign Up</p>
                            </Link>
                          </>
                        )}
              </div>
            </div>
          </div>
        </div>
</Navbar>
      

  );
}



/*
  
  
  'use client';

import './nav.css';
import logo from '../../images/i-logo.png';
import { Link }  from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/userSlice';
import { Dropdown, Navbar } from 'flowbite-react';
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from 'react-icons/hi';

export default function Nav() {
  const currentUser = useSelector(selectCurrentUser);
  const userAvatar = currentUser?.user?.avatar;

  return (
  <Navbar className='bg-transparent'>
    <Navbar.Brand href="https://flowbite-react.com">
    </Navbar.Brand>
    

      <div className="flex md:order-2">
          {currentUser ? (
                          <>
                              <Dropdown
                                arrowIcon={false}
                                inline
                                label={
                                  <img src={userAvatar} alt="User Avatar" className='h-10 w-10 rounded-full object-cover  hover:ring-1 hover:ring-yellow-100 hover:ring-offset-2 hover:ring-offset-neutral-900 hover:golden-shadowgolden-shadow transition-all duration-400'  />
                                }
                              >
                                <Dropdown.Header>
                                  <span className="block text-sm raleway">{currentUser.user.firstName} {currentUser.user.lastName}</span>
                                  <span className="block truncate text-sm font-semibold ">{currentUser.user.email}</span>
                                </Dropdown.Header>
                                <Link to='/profile'>
                                <Dropdown.Item icon={HiViewGrid}>Dashboard</Dropdown.Item>
                                </Link>
                                  <Dropdown.Divider />
                                  <Dropdown.Item icon={HiLogout}>Sign out</Dropdown.Item>
                              </Dropdown>
                              <Navbar.Toggle />
                          </>
                        ) : (
                          <>
                            <Link to='/profile'>
                              <lord-icon
                                src="https://cdn.lordicon.com/dxjqoygy.json"
                                trigger="hover"
                                target="log-reg"
                                colors="primary:#f3e8cc,secondary:#f3e8cc"
                                stroke="60"
                                style={{ width: '50px', height: '50px' }}
                              ></lord-icon>
                              <p className='text-black decoration-none px-2 rounded-4 bg-[#f3e8cc] py-1'>Sign Up</p>
                            </Link>
                          </>
                        )}
        
      </div>
      
    <Navbar.Collapse>
    <Link to='/'><li className='nav-item'>Home</li></Link>
      <Navbar.Link href="/" className='nav-item'>About</Navbar.Link>
      <Navbar.Link href="#" className='nav-item'>Services</Navbar.Link>
      <Link to='/'><li className="logo"><img src={logo} alt="logo" className="logo max-w-full h-auto max-md:hidden" style={{ maxHeight: '100px' }} /></li></Link>
      <Navbar.Link href="#" className='nav-item'>Pricing</Navbar.Link>
      <Navbar.Link href="#" className='nav-item'>Contact</Navbar.Link>
      <Navbar.Link href="#" className='nav-item'>Contact</Navbar.Link>
      
    </Navbar.Collapse>
  </Navbar>
);
}
}*/