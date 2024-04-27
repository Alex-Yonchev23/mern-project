import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Comment = ({ comment,onLike }) => {
    const [user, setUser] = useState({});
    const { currentUser } = useSelector((state) => state.user);
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/server/user/${comment.userId}`);
                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                }    

            } catch (error) {
                console.log(error.message);
            }
        };
        getUser();
    }, [comment]);
  
    return (
        <div>
            <div className='flex p-4 border-b text-sm '>
                <div className='flex-shrink-0 mr-3'>
                    <img
                        className='w-10 h-10 rounded-full object-cover select-none'
                        src={user.avatar}
                        draggable={false}
                        alt={`${user.firstName} ${user.lastName}`}
                    />
                </div>
                <div className='flex-1'>
                    <div className='flex items-center mb-1'>
                        <span className='beige mr-1 text-xs truncate font-semibold'>
                            {user ? `@${`${user.firstName} ${user.lastName}`}` : 'anonymous user'}
                        </span>
                        <span className='text-gray-400 text-xs raleway'>
                            {moment(comment.createdAt).fromNow()}
                        </span>
                    </div>
                    <p className='text-gray-400 raleway pb-2'>{comment.content}</p>
                    <div className='flex items-center pt-2 text-xs border-t max-w-fit gap-2'>
                        <button type='button' onClick={() => onLike(comment._id)} className={`text-gray-400 hover:text-yellow-300 transition-all duration-200 ${currentUser && comment.likes.includes(currentUser.user._id) && 'text-yellow-500'}`}>
                            <FaThumbsUp/>
                        </button>
                        <p className='text-gray-400 raleway'>
                            {
                                comment.numberOfLikes > 0 &&
                                comment.numberOfLikes + " " + (comment.numberOfLikes > 1 ? "likes" : "like")
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;
