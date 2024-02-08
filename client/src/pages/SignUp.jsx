import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../styles/login-signup.css';

const SignUp = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const NavBarHeight = 120;

  return (
    <div className="flex flex-col h-screen justify-center items-center" style={{ height: `calc(100vh - ${NavBarHeight}px)` }}>
      <div className="user_options-container relative xl:w-2/3 md:w-3/4 max-md:hidden rounded-md border-1 border-yellow-500 border-solid bg-[#000000d1]">
        <div className="bg-panel flex justify-between w-full rounded-md p-4 ">
          <div className="w-1/2 text-white font-light xl:p-8 md:p-3">
            <h2 className="user_unregistered-title text-2xl font-bold mb-4">Don't have an account?</h2>
            <p className="user_unregistered-text text-sm text-[beige]">Dolorum porro natus enim similique reiciendis sunt, culpa consectetur, dolores quae adipisci velit. Minima at dolorum quae dolore modi obcaecati saepe vel!</p>
            <button className="user_unregistered-signup user_registered-login mt-7 border-1 border-solid border-yellow-500 rounded-md px-4 py-2 uppercase leading-[1.5em] tracking-[.2rem] font-black select-none" 
                    onClick={toggleForm}>Sign up</button>
          </div>

          <div className="w-1/2 text-white font-light xl:p-8 md:p-3">
            <h2 className="user_registered-title text-2xl font-bold mb-4">Already have an account?</h2>
            <p className="user_registered-text text-sm text-[beige]">Maiores nisi laudantium velit harum! <br /> Tenetur earum nobis inventore illo sequi atque vel nulla in? <br /> Maiores nisi laudantium velit harum!</p>
            <button className="user_registered-login mt-7 border-1 border-solid border-yellow-500 rounded-md px-4 py-2 uppercase leading-[1.5em] tracking-[.2rem] font-black select-none" onClick={toggleForm}>Log in</button>
          </div>
        </div>

        <div className={`user_options-forms ${showLogin ? 'bounceRight' : 'bounceLeft'} absolute w-[calc(50%_-_30px)] min-h-[400px] bg-[beige] overflow-hidden shadow-[0px_0px_20px_5px_rgba(0,0,0,0.75)] transition-transform duration-4 ease-[ease-in-out] flex justify-center items-center rounded-[3px] left-[30px] top-2/4 transform: translate3d(100%, -50%, 0)`}>
          <div className="user_forms-login">
            <h2 className="text-3xl font-bold mb-5 text-yellow-500 text-center leading-[1em] uppercase tracking-[0.1rem]">Login</h2>
            <form className="forms_form" onSubmit={handleSubmit}>
              <div className="relative mb-6">
                <input
                  type="text"
                  className="forms_field-input w-full border-b-2 border-neutral-500 p-1.5"
                  required
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
                  required
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
                  <input type="checkbox" id="remember_me" name="remember_me" className="ml-2" />
                </label>
                <a href="#" className="forms_buttons-forgot text-sm text-nowrap">
                  Forgot password?
                </a>
              </div>
              <div className="flex justify-center items-cen2esmmt-8 ">
                <input
                  type="submit"
                  value="Log In"
                  className="forms_buttons-action bg-yellow-500 hover:bg-yellow-600 transition duration-300 ease-in-out px-4 py-2"
                  name="Login"
                />
              </div>
            </form>
          </div>

          <div className="user_forms-signup opacity-100 transition-opacity duration-400">
            <h2 className="text-3xl font-bold mb-4 text-yellow-500 text-center leading-[1em] uppercase tracking-[0.1rem]">Sign Up</h2>
            <form className="forms_form" onSubmit={handleSubmit}>
              <div className="relative mb-6">
                <input
                  type="text"
                  className="forms_field-input w-full border-b-2 border-neutral-500 p-1.5"
                  required
                  maxLength="30"
                  name="fname"
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label className="labels select-none">First Name</label>
              </div>
              <div className="relative mb-6">
                <input
                  type="text"
                  className="forms_field-input w-full border-b-2 border-neutral-500 p-1.5"
                  required
                  maxLength="30"
                  name="lname"
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label className="labels select-none ">Last Name</label>
              </div>
              <div className="relative mb-6">
                <input
                  type="text"
                  className="forms_field-input w-full border-b-2 border-neutral-500 p-1.5"
                  required
                  maxLength="30"
                  name="email"
                  id="email-sign-up"
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label className="labels select-none">Email</label>
              </div>
              <div className="relative mb-0">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  className="forms_field-input w-full border-b-2 border-neutral-500 p-1.5"
                  required
                  maxLength="30"
                  name="password"
                  id="sign-up-password"
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label className="labels select-none">Password</label>
                <FontAwesomeIcon
                  icon={passwordVisible ? faEyeSlash : faEye}
                  className={`fas fa-eye show-password${passwordVisible ? ' eye-animated ' : ''}`}
                  onClick={togglePasswordVisibility}
                  id="toggleSignUpPassword"
                />
              </div>
              <div className="flex justify-center items-center mt-4">
                <input
                  type="submit"
                  value="Sign up"
                  className="forms_buttons-action bg-yellow-500 hover:bg-yellow-600 transition duration-300 ease-in-out px-4 py-2"
                  name="Signup"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
