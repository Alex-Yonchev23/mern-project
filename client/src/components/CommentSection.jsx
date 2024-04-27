import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { Textarea,Button }from 'flowbite-react';
import { errorMessage, successMessage, infoMessage } from './ToastMessage';
import Comment from './Comment';

export default function CommentSection({postId}) {
    const {currentUser} = useSelector(state => state.user);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

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
            setComments([ data, ...comments]);
        } catch (error) {
            errorMessage(error.message);
        }
    };
    
    useEffect(() => {
        const getComments = async() => {

            try {
                const res = await fetch(`/server/comment/getPostComments/${postId}`);
                if(res.ok) {
                    const data = await res.json();
                    setComments(data);

                }
            } catch (error) {
                console.log(error.message);
            }
            
        }
        getComments();
    }, [postId])

    return (
        <div className='max-w-2xl mx-auto  rounded-xl '>
            {currentUser ? (
                <>
                    <div className='max-w-2xl mx-auto border-yellow-50 border-1 border-solid p-4 rounded-tl-3xl rounded-br-3xl'>
                        <div className="beige flex items-center gap-1 mb-3 text-gray-500 text-sm">
                            <p className='mr-2'>Signed in as:</p>
                            <img src={currentUser.user.avatar} alt="" className='h-6 w-6 object-cover rounded-full mx-1' />
                            <Link to={'/dashboard?tab=profile'} className='raleway hover:opacity-80 hover:underline transition-all'>
                                @{currentUser.user.firstName} {currentUser.user.lastName}
                            </Link>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <Textarea
                                placeholder='Add a comment...'
                                rows='4'
                                maxLength='200'
                                className='raleway focus:ring-yellow-400 transition-all duration-200 bg-yellow-50'
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}
                            />
                            <div className='flex justify-between items-center'>
                                <p className='beige text-xs mt-2'>{200 - comment.length} characters remaining</p>
                                <button className="main-btn mt-3 text-sm text-yellow-50 border-1 border-solid border-yellow-400 rounded-lg hover:rounded-3xl px-4 py-2 uppercase tracking-wider select-none">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>

                    {comments.length === 0 ? (
                        <p className='text-sm my-5 beige'>No comments yet!</p>
                    ) : (
                        <>
                            <div className='text-sm mt-5 mb-2 flex items-center gap-2'>
                                <p className='beige'>Comments</p>
                                <div className='border border-yellow-400 border-solid py-1 px-2 rounded-sm'>
                                    <p className='beige'>{comments.length}</p>
                                </div>
                            </div>
                            {comments.map((comment) => (
                                <div className='border-b border-gray-400 border-solid border-x-0 border-t-0'>
                                    <div>
                                    <Comment
                                        key={comment._id}
                                        comment={comment}
                                    />
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </>
            ) : (
                <div className='text-sm beige my-5 flex gap-1 raleway'>
                    Log in to comment.
                    <Link className='text-yellow-400 hover:underline' to={'/sign-up'}>
                        Log In
                    </Link>
                </div>
            )}
        </div>
    );
    
    
}
