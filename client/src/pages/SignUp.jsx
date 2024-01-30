import React, { useState } from 'react';
import '../styles/signup.css';

const SignUp = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="user_options-container w-2/3 border border-neutral-500">
        <div className="user_options-text">
          <div className="user_options-unregistered w-1/2 p-8">
            <h2 className="user_unregistered-title text-2xl font-bold mb-4">Don't have an account?</h2>
            <p className="user_unregistered-text text-sm">Dolorum porro natus enim similique reiciendis sunt, culpa consectetur, dolores quae adipisci velit. Minima at dolorum quae dolore modi obcaecati saepe vel!</p>
            <button className="user_unregistered-signup click-btn border border-neutral-500 px-4 py-2 mt-4" onClick={toggleForm}>Sign up</button>
          </div>

          <div className="user_options-registered w-1/2 p-8 ml-auto">
            <h2 className="user_registered-title text-2xl font-bold mb-4">Already have an account?</h2>
            <p className="user_registered-text text-sm">Maiores nisi laudantium velit harum! Tenetur earum nobis inventore illo sequi atque vel nulla in?</p>
            <button className="user_registered-login click-btn border border-neutral-500 px-4 py-2 mt-4" onClick={toggleForm}>Log in</button>
          </div>
        </div>

        <div className={`user_options-forms ${showLogin ? 'bounceRight' : 'bounceLeft'}`}>
          <div className="user_forms-login opacity-100 transition-opacity duration-200">
            <h2 className="forms_title text-3xl font-bold mb-6 text-yellow-500">Login</h2>
            <form className="forms_form" onSubmit={handleSubmit}>
              <div className="forms_field mb-6">
                <input
                  type="text"
                  className="forms_field-input w-full border-b-2 border-neutral-500 p-2"
                  required
                  autoFocus
                  maxLength="30"
                  name="email"
                  id="log-in-email"
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label className="labels">Email</label>
              </div>
              <div className="forms_field mb-6">
                <input
                  type="password"
                  className="forms_field-input w-full border-b-2 border-neutral-500 p-2"
                  required
                  maxLength="30"
                  name="password"
                  id="log-in-password"
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label className="labels">Password</label>
                <i className="fas fa-eye show-password" id="toggleLoginPassword"></i>
              </div>
              <div className="forms_buttons flex justify-between items-center">
                <label htmlFor="remember_me" className="remember text-sm">
                  Remember me
                  <input type="checkbox" id="remember_me" name="remember_me" className="ml-2" />
                </label>
                <a href="#" className="forms_buttons-forgot text-sm">
                  Forgot password?
                </a>
              </div>
              <div className="forms_buttons-action-div mt-8">
                <input
                  type="submit"
                  value="Log In"
                  className="forms_buttons-action click-btn border border-neutral-500 px-4 py-2"
                  name="Login"
                />
              </div>
            </form>
          </div>

          <div className="user_forms-signup opacity-100 transition-opacity duration-400">
            <h2 className="forms_title text-3xl font-bold mb-6 text-yellow-500">Sign Up</h2>
            <form className="forms_form" onSubmit={handleSubmit}>
              <div className="forms_field mb-6">
                <input
                  type="text"
                  className="forms_field-input w-full border-b-2 border-neutral-500 p-2"
                  required
                  maxLength="30"
                  name="fname"
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label className="labels">First Name</label>
              </div>
              <div className="forms_field mb-6">
                <input
                  type="text"
                  className="forms_field-input w-full border-b-2 border-neutral-500 p-2"
                  required
                  maxLength="30"
                  name="lname"
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label className="labels">Last Name</label>
              </div>
              <div className="forms_field mb-6">
                <input
                  type="text"
                  className="forms_field-input w-full border-b-2 border-neutral-500 p-2"
                  required
                  maxLength="30"
                  name="email"
                  id="email-sign-up"
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label className="labels">Email</label>
              </div>
              <div className="forms_field mb-6">
                <input
                  type="password"
                  className="forms_field-input w-full border-b-2 border-neutral-500 p-2"
                  required
                  maxLength="30"
                  name="password"
                  id="sign-up-password"
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label className="labels">Password</label>
                <i className="fas fa-eye show-password" id="toggleSignUpPassword"></i>
              </div>
              <div className="forms_buttons-action-div mt-8">
                <input
                  type="submit"
                  value="Sign up"
                  className="forms_buttons-action click-btn border border-neutral-500 px-4 py-2"
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
