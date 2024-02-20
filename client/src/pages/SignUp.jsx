import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import LogIn from './LogIn';
import '../styles/login-signup.css';
import { toast } from 'react-toastify';


const SignUp = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});


  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch('/server/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setFormData({});
        document.getElementById('sign-up-fname').value = '';
        document.getElementById('sign-up-lname').value = '';
        document.getElementById('email-sign-up').value = '';
        document.getElementById('sign-up-password').value = '';
        successMessage(data.message);
        setShowLogin(true);
      } else {
        errorMessage(data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const NavBarHeight = 120;

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
    <div className="flex flex-col h-screen justify-center items-center" style={{ height: `calc(100vh - ${NavBarHeight}px)` }}>
      <div className="user_options-container relative xl:w-2/3 md:w-5/6 max-md:hidden rounded-md border-1 border-yellow-500 border-solid bg-[#000000d1]">
        <div className="bg-panel flex justify-between w-full rounded-md p-4 ">
          <div className="w-1/2 text-white font-light xl:p-8 md:p-3">
            <h2 className="user_unregistered-title text-2xl font-bold mb-4">Don't have an account?</h2>
            <p className="user_unregistered-text text-sm text-[beige]">Dolorum porro natus enim similique reiciendis sunt, culpa consectetur, dolores quae adipisci velit. Minima at dolorum quae dolore modi obcaecati saepe vel!</p>
            <button className="user_unregistered-signup user_registered-login mt-7 border-1 border-solid border-yellow-500 rounded-md px-4 py-2 uppercase leading-[1.5em] tracking-[.2rem] font-black select-none"
              onClick={toggleForm}>Sign up</button>
          </div>

          <div className="w-1/2 text-white font-light xl:p-8 md:p-5">
            <h2 className="user_registered-title text-2xl font-bold mb-4">Already have an account?</h2>
            <p className="user_registered-text text-sm text-[beige]">Maiores nisi laudantium velit harum! <br /> Tenetur earum nobis inventore illo sequi atque vel nulla in? <br /> Maiores nisi laudantium velit harum!</p>
            <button className="user_registered-login mt-7 border-1 border-solid border-yellow-500 rounded-md px-4 py-2 uppercase leading-[1.5em] tracking-[.2rem] font-black select-none" onClick={toggleForm}>Log In</button>
          </div>
        </div>

        <div className={`user_options-forms ${showLogin ? 'bounceRight' : 'bounceLeft'} absolute w-[calc(50%_-_30px)] min-h-[400px] bg-[beige] overflow-hidden shadow-[0px_0px_20px_5px_rgba(0,0,0,0.75)] transition-transform duration-4 ease-[ease-in-out] flex justify-center items-center rounded-[3px] left-[30px] top-2/4 transform: translate3d(100%, -50%, 0)`}>
          {showLogin ? (
            <LogIn passwordVisible={passwordVisible} togglePasswordVisibility={togglePasswordVisibility} loading={loading} />
          ) : (
              <div className="user_forms-signup opacity-100 transition-opacity duration-400">
                <h2 className="text-3xl font-bold mb-4 text-yellow-500 text-center uppercase tracking-widest">Sign Up</h2>
                <form className="forms_form" onSubmit={handleSubmit}>
                  <div className="relative mb-7">
                    <input
                      type="text"
                      className="forms_field-input error-bar w-full border-b-2 border-neutral-500 p-1.5"
                      maxLength="30"
                      name="firstName"
                      id="sign-up-fname"
                      onChange={handleChanges}
                      required
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className="labels select-none">First Name</label>
                  </div>
                  <div className="relative mb-7">
                    <input
                      type="text"
                      className="forms_field-input w-full border-b-2 border-neutral-500 p-1.5"
                      maxLength="30"
                      name="lastName"
                      id="sign-up-lname"
                      onChange={handleChanges}
                      required
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className="labels select-none ">Last Name</label>
                  </div>
                  <div className="relative mb-7">
                    <input
                      type="text"
                      className="forms_field-input w-full border-b-2 border-neutral-500 p-1.5"
                      maxLength="30"
                      name="email"
                      id="email-sign-up"
                      onChange={handleChanges}
                      required
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className="labels select-none">Email</label>
                  </div>
                  <div className="relative mb-3">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      className="forms_field-input w-full border-b-2 border-neutral-500 p-1.5"
                      maxLength="30"
                      name="password"
                      id="sign-up-password"
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
                  <div className="flex justify-center items-center">
                    <button type="submit" value="Submit" className='rounded-sm select-none text-base font-light text-white uppercase bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 ease-in-out px-4 py-2 relative' disabled={loading}>
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            )}
          {loading && (
            <div className="spinner-overlay absolute inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
              <div className="spinner border-t-4 border-white border-solid h-6 w-6 rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
