import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../styles/login-signup.css';

const LogIn = ({ passwordVisible, togglePasswordVisibility }) => {
  
  const [loading,setLoading] = useState(false);

    return (
    
          <div className="user_forms-login">
            <h2 className="text-3xl font-bold mb-5 text-yellow-500 text-center uppercase tracking-widest">Log In</h2>
            <form className="forms_form" >
              <div className="relative mb-6">
                <input
                  type="text"
                  className="forms_field-input w-full border-b-2 border-neutral-500 p-1.5"
                  autoFocus
                  maxLength="30"
                  name="email"
                  id="log-in-email"
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label className="labels capitalize select-none">Email</label>
              </div>
              <div className="relative mb-6">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  className="forms_field-input w-full border-b-2 border-neutral-500 p-1.5"
                  maxLength="30"
                  name="password"
                  id="log-in-password"
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label className="labels select-none">Password</label>
                <FontAwesomeIcon
                  icon={passwordVisible ? faEyeSlash : faEye}
                  className={`fas fa-eye show-password ${passwordVisible ? ' eye-animated ' : ''}`}
                  onClick={togglePasswordVisibility}
                  id="toggleSignUpPassword"
                />
              </div>
              <div className="forms_buttons flex xl:flex-row xl:justify-between items-center gap-2 flex-col pb-4">
                <label htmlFor="remember_me" className="remember text-sm text-nowrap">
                  Remember me
                  <input type="checkbox" id="remember_me" name="remember_me" className="rounded ml-2 hover:ring-2 ring-yellow-500 ring-offset-2 ring-offset-[beige] transition-all duration-100" />
                </label>
                <a href="#" className="forms_buttons-forgot text-sm text-nowrap">
                  Forgot password?
                </a>
              </div>
              <div className="flex justify-center">
                <button type="submit" value="Submit" className='rounded-sm text-base font-light text-white uppercase bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 ease-in-out px-4 py-2 tracking-wide' disabled={loading}>
                  {loading ? 'Loading...' : 'Log In'}
                </button>
              </div>
            </form>
          </div>  
          );
        };
        export default LogIn;
