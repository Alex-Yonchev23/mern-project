import React, { useEffect, useState } from 'react';
import moment from 'moment';

const Comment = ({ comment }) => {
    const [user, setUser] = useState({});
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
                        className='w-10 h-10 rounded-full bg-gray-200 object-cover select-none'
                        src={user.avatar}
                        draggable={false}
                        alt={`${user.firstName} ${user.lastName}`}
                    />
                </div>
                <div className='flex-1'>
                    <div className='flex items-center mb-1'>
                        <span className='beige mr-1 text-xs truncate'>
                            {user ? `@${`${user.firstName} ${user.lastName}`}` : 'anonymous user'}
                        </span>
                        <span className='text-gray-400 text-xs raleway'>
                            {moment(comment.createdAt).fromNow()}
                        </span>
                    </div>
                    <p className='text-gray-400 raleway pb-2'>{comment.content}</p>
                </div>
            </div>
        </div>
    );
}

export default Comment;
