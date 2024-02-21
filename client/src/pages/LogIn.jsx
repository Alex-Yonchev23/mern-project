import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../styles/login-signup.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { logInStart,logInSuccess,logInError } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth/OAuth';

const LogIn = ({ passwordVisible, togglePasswordVisibility }) => {
  
  const { loading , error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(logInStart());
      const res = await fetch('/server/auth/log-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (data.success) {
        setFormData({});
        document.getElementById('email-log-in').value = '';
        document.getElementById('log-in-password').value = '';
        
        dispatch(logInSuccess(data));

        successMessage(data.message);
        navigate('/');
      } else {
        dispatch(logInError(data));
        errorMessage(data.message);
      }           
      

    } catch (error) {
      dispatch(logInError(error));
      errorMessage('Failed to fetch the data.');
    }
  };

  const errorMessage = (message) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const successMessage = (message) => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

    return (
          <div className="user_forms-login">
            <h2 className="text-3xl font-bold mb-5 text-yellow-500 text-center uppercase tracking-widest">Log In</h2>
            <form className="forms_form "  onSubmit={handleSubmit} noValidate>
              <div className="relative mb-6">
                <input
                  type="text"
                  className="forms_field-input w-full border-b-2 border-neutral-500 p-1.5"
                  maxLength="50"
                  name="email"
                  id="email-log-in"
                  onChange={handleChanges}
                  required
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label className="labels capitalize select-none">Email</label>
              </div>
              <div className="relative mb-6">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  className="forms_field-input w-full border-b-2 border-neutral-500 p-1.5"
                  maxLength="128"
                  name="password"
                  id="log-in-password"
                  onChange={handleChanges}
                  required
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
                  <input
                    type="checkbox"
                    id="remember_me"
                    name="remember_me"
                    className="rounded ml-2 hover:ring-2 ring-yellow-500 ring-offset-2 ring-offset-[beige] transition-all duration-100"
                    checked={formData.remember_me || false}
                    onChange={handleChanges}
                  />
                  </label>
                <a href="#" className="forms_buttons-forgot text-sm text-nowrap">
                  Forgot password?
                </a>
              </div>
              <div className="flex justify-center">
                <button type="submit" value="Submit" className='select-none rounded-sm text-base font-light text-white uppercase bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 ease-in-out px-4 py-2 tracking-wide' disabled={loading}>Log In</button>
              </div>
              <OAuth></OAuth>
            </form>
            {loading && (
            <div className="spinner-overlay absolute inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
              <div className="spinner border-t-4 border-white border-solid h-6 w-6 rounded-full animate-spin"></div>
            </div>
          )}
          </div>  
          );
        };
        export default LogIn;
