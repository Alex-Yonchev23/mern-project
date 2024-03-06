import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState , useEffect } from 'react';
import './nav.css';
import logo from '../../images/i-logo.png';
import "../../images/avatar.png";
import { Link }  from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/userSlice';

export default function Nav() {
  const [showSidebar, setShowSidebar] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const userAvatar = currentUser?.user?.avatar;

  /*const userAvatar = currentUser && currentUser.user && currentUser.user.avatar;*/
  console.log(userAvatar);

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


  return (

    <nav className='navbar navbar-expand-lg navbar-dark bg-transparent fixed-top z-10 select-none' style={{ maxHeight: '110px' }}>
        <button className='navbar-toggler shadow-none border-0 ms-auto' type='button' onClick={toggleSidebar}>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className={`sidebar offcanvas offcanvas-start ${showSidebar ? 'show' : ''}`}  id='offcanvasNavbar'>
          <div className="offcanvas-header text-white border-bottom">
            <h1 className="offcanvas-title fs-4" id="offcanvasNavbarLabel">Ironic</h1>
            <button className="btn-close shadow-none btn-close-white" type="button"  onClick={toggleSidebar} aria-label="Close"></button>
          </div>
        
        <div className='offcanvas-body d-flex flex-column flex-lg-row'>
            <ul className='navbar-nav justify-content-center align-items-center font-bold flex-grow'>
              <Link to='/'>
                <li className='nav-item '>
                    Home
                </li>
              </Link>
                
              <Link to='/about-us'>
                <li className='nav-item'>
                  About us
                </li>
              </Link>

              <Link to='/gallery'>
                <li className='nav-item '>
                  Gallery
                </li>
              </Link>

              <Link to='/'>
                <li className="nav-item logo px-4">
                  <div className="div-logo">
                      <img src={logo} alt="logo" className="logo max-w-full h-auto" style={{ maxHeight: '100px' }} />
                  </div>
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
                <Link to='/profile'>
                  {currentUser ? (
                    <>
                      <img src={userAvatar} alt="User Avatar" className='h-10 w-10 rounded-full object-cover  hover:ring-1 hover:ring-yellow-100 hover:ring-offset-2 hover:ring-offset-neutral-900 hover:golden-shadowgolden-shadow transition-all duration-400'  />
                    </>
                  ) : (
                    <>
                      <lord-icon
                        src="https://cdn.lordicon.com/dxjqoygy.json"
                        trigger="hover"
                        target=".log-reg"
                        colors="primary:#f3e8cc,secondary:#f3e8cc"
                        stroke="60"
                        style={{ width: '50px', height: '50px' }}
                      ></lord-icon>
                      <p className='text-black decoration-none px-2 rounded-4 bg-[#f3e8cc] py-1'>Sign Up</p>
                    </>
                  )}
                </Link>
              </div>
            </div>

            
            
            
            
          </div>
        </div>
    </nav>

      

  );
}