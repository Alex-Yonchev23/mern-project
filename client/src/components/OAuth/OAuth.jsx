import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup  } from 'firebase/auth';
import { app } from '../../firebase';
import { useDispatch } from 'react-redux';
import { logInSuccess } from '../../redux/user/userSlice';

export default function OAuth() {            
    const dispatch = useDispatch();
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
        } catch (error) {
            console.log("could not login with Google");
        }
    };

  return (
        <button type='button' onClick={handleGoogleClick} className='bg-black text-white rounded-md p-2'>Continue with google</button>
    )
}
