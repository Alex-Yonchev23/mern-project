import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup  } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { logInSuccess } from '../redux/user/userSlice';
import { errorMessage, successMessage } from './ToastMessage'; 
import { useNavigate } from 'react-router-dom';

export default function OAuth() {            
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth,provider);

            const [firstName, lastName] = result.user.displayName.split(' ');


            const res = await fetch('/server/auth/google',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });
            const data = await res.json();            

            dispatch(logInSuccess(data));
            successMessage(data.message);
            navigate('/');
        } catch (error) {            
            errorMessage("Възникна грешка. Моля, опитайте отново по-късно.");
        }
    };

  return (
        <button type='button' title="Продължете с Google" onClick={handleGoogleClick} className='main-btn normal-shadow text-black w-full max-lg:w-min p-2 select-none flex justify-center items-center bg-transparent text-nowrap transition-all duration-200 ease-in-out border-2 border-black border-solid max-lg:border-none rounded-full lg:rounded-md'>
            <div className='bg-black rounded-full p-1.5 lg:p-1 lg:me-2'>
            <svg className="w-4 h-4  min-w-4 max-lg:w-5 max-lg:h-5 rounded-full beige" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
            </svg>
            </div>
            <span className='max-lg:hidden uppercase'>Продължете с Google</span>
        </button>
    );
}
