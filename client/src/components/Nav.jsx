import '../styles/nav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, logOut } from '../redux/user/userSlice';
import { Dropdown,Tooltip  } from 'flowbite-react';
import { HiLogout, HiViewGrid } from 'react-icons/hi';
import { toggleTheme } from '../redux/theme/themeSlice';
import { FaMoon, FaSun } from 'react-icons/fa';
import lightLogo from '../images/light-logo-final.svg'; 
import darkLogo from '../images/dark-logo-final.svg';

export default function Nav() {
  const [showSidebar, setShowSidebar] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const userAvatar = currentUser?.user?.avatar;
  const dispatch = useDispatch();
  const [scrollOffsetY, setScrollOffsetY] = useState(0);
  const theme = useSelector((state) => state.theme);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleLogOut = async () => {
    try {
      await fetch('/server/auth/log-out');
      dispatch(logOut());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffsetY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg select-none sticky top-0 z-20 main-nav transition-all duration-500 ${scrollOffsetY > 0 ? 'scrolled' : ''}`}>
      <div className="flex items-center">
        <img src={theme.theme === 'light' ? darkLogo : lightLogo} alt="logo" className="logo max-w-full h-auto max-h-24" />
        <h1 className="text-3xl text-yellow-400 font-bold raleway">Ironic</h1>
      </div>

      <button className='navbar-toggler custom-toggler shadow-none border-0 ms-auto beige' type='button' onClick={toggleSidebar}>
        <span className='navbar-toggler-icon text-yellow-50'></span>
      </button>

      <div className={`z-20 sidebar offcanvas offcanvas-start ${showSidebar ? 'show' : ''} transition-all ease-in-out duration-500`} id='offcanvasNavbar'>
        <div className="offcanvas-header border-bottom flex justify-between">
          <h1 className="offcanvas-title text-2xl beige" id="offcanvasNavbarLabel">Ironic</h1>
          <img src={theme.theme === 'light' ? darkLogo : lightLogo} alt="logo" className="logo max-w-full h-auto max-h-24" />
          <button className="btn-close text-sm !bg-yellow-50 transition-all duration-200" onClick={toggleSidebar}></button>
        </div>
          
        <div className='offcanvas-body d-flex flex-column flex-lg-row '>
          <ul className='navbar-nav justify-content-end align-items-center font-bold flex-grow lg:space-x-4 mr-4'>
            <Link to='/'><li className='nav-item'>Начало</li></Link>
            <Link to='/about-us'><li className='nav-item'>За нас</li></Link>
            <Link to='/gallery'><li className='nav-item'>Галерия</li></Link>
            <Link to='/services'><li className='nav-item'>Услуги</li></Link>
            <Link to='/blog'><li className='nav-item'>Блог</li></Link>
            <Link to='/contact-us'><li className='nav-item'>Контакти</li></Link>
          </ul>

          <div className='d-flex align-items-center mr-6'>
            <Tooltip content={theme.theme === 'light' ? "Тъмна тема" : "Светла тема"} placement="bottom">
              <button
                className='w-8 h-8 ring-1 dark:hover:ring-yellow-50 hover:ring-neutral-950 ring-transparent  flex items-center justify-center rounded-md transition-all duration-300'
                onClick={() => {
                  dispatch(toggleTheme());
                }}
                >
                  {theme.theme === 'light' ? <FaMoon className='text-gray-500' /> : <FaSun className='text-gray-500' /> }
              </button>
            </Tooltip>
            
            <div className='d-grid place-items-center ml-4'>
              <div className='d-flex flex-column gap-2 flex-lg-row font-bold text-sm'>
                <div className='smaller'>
                  {currentUser ? (
                    <Dropdown
                      arrowIcon={false}
                      inline
                      className='bg-yellow-50'
                      label={
                        <img src={userAvatar} alt="User Avatar" draggable={false} className='h-10 w-10 rounded-full object-cover hover:ring-1 hover:ring-neutral-950 dark:hover:ring-yellow-100 hover:ring-offset-2 ring-offset-gray-200 dark:hover:ring-offset-neutral-900 transition-all duration-400' />
                      }
                    >
                      <Dropdown.Header>
                        <span className="block text-sm raleway">{currentUser.user.firstName} {currentUser.user.lastName}</span>
                        <span className="block truncate text-sm font-semibold">{currentUser.user.email}</span>
                      </Dropdown.Header>
                      <Link to={currentUser.user.isAdmin ? '/dashboard?tab=dash' : '/dashboard'}>
                        <Dropdown.Item icon={HiViewGrid}>Дашборд</Dropdown.Item>
                      </Link>
                      <Dropdown.Divider />
                      <Dropdown.Item icon={HiLogout} onClick={handleLogOut}>Изход</Dropdown.Item>
                    </Dropdown>
                  ) : (
                    <Link to='/dashboard?tab=dash'>
                      <div className='flex flex-col items-center'>
                        <lord-icon
                          src="https://cdn.lordicon.com/dxjqoygy.json"
                          trigger="hover"
                          target="log-reg"
                          colors="primary:#f3e8cc,secondary:#f3e8cc"
                          stroke="60"
                          style={{ width: '40px', height: '40px' }}
                        ></lord-icon>
                        <p className='text-black px-2 rounded-full bg-yellow-50 py-1'>Влез/Регистрирай се</p>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
