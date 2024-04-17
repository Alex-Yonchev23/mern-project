import React from 'react'
import { useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { Textarea,Button }from 'flowbite-react';
import { errorMessage, successMessage, infoMessage } from './ToastMessage';


export default function CommentSection({postId}) {
    const {currentUser} = useSelector(state => state.user);
    const [comment, setComment] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > 200) {
            return;
        }
    
        try {
            const res = await fetch('/server/comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: comment,
                    postId: postId,
                    userId: currentUser.user._id
                }),
            });
    
            const data = await res.json();
            if (!res.ok) {
                if (data.message === "You cannot submit empty comment") {
                    infoMessage(data.message);
                } else {
                    errorMessage(data.message);
                }
                return;
            }
    
            setComment('');
            successMessage('Comment created successfully');
    
        } catch (error) {
            errorMessage(error.message);
        }
    };
    


  return (
    <div className='max-w-2xl mx-auto border-yellow-50 border-1 border-solid rounded-xl  p-4'>
        { currentUser ? 
            (
                <div className="beige flex items-center gap-1  mb-3 text-gray-500 text-sm ">
                    <p className='mr-2'>Signed in as:</p>
                    <img src={currentUser.user.avatar} alt="" className='h-6 w-6 object-cover rounded-full mx-1' />
                    <Link to={'/dashboard?tab=profile'} className='raleway hover:opacity-80 hover:underline transition-all'>
                        @{currentUser.user.firstName} {currentUser.user.lastName}
                    </Link>
                </div>
            ): (
                <div className='text-sm beige my-5 flex gap-1 raleway'>
                    Log in to comment.
                    <Link className='text-yellow-400 hover:underline' to={'/sign-up'}>
                        Log In
                    </Link>
                </div>
        )}

            
        {
            currentUser && (
                <form onSubmit={handleSubmit}>
                    <Textarea
                        placeholder='Add a comment...'
                        rows='3'
                        maxLength='200' 
                        className='raleway focus:ring-transparent bg-yellow-50'   
                        onChange={(e)=> setComment(e.target.value)}
                        value={comment}
                    />
                    <div className=''>
                        <p className='beige text-xs mt-2'>{200 - comment.length } characters remaining</p>
                        <button className="main-btn mt-3 text-sm text-yellow-400 border-1 border-solid border-yellow-50 rounded-xl px-4 py-2 uppercase tracking-wider select-none">
                            Submit
                        </button>
                    </div>
                </form>
            )
        }
    </div>
  )
}
