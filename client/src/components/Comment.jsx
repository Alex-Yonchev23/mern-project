import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Textarea } from 'flowbite-react';
import { errorMessage } from './ToastMessage';

const Comment = ({ comment, onLike, onEdit, onDelete }) => {
    const [ user, setUser ] = useState({});
    const { currentUser } = useSelector((state) => state.user);
    const [ isEditing, setIsEditing] = useState(false);
    const [ editedContent, setEditedContent ] = useState(comment.content);


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

    const handleEdit = () => {
        setIsEditing(true);
        setEditedContent(comment.content);
    }

    const handleSave = async () => {
        try {
            const res = await fetch(`/server/comment/editComment/${comment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({  
                    content: editedContent,
                }),
            });
            const data = await res.json();
            if (res.ok) {                
                setIsEditing(false);
                onEdit(comment,editedContent);
            }else{
                errorMessage(data.message);
            }
        } catch (error) {
            errorMessage(error.message);
        }
    }
  
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
                    {
                        isEditing ? 
                            (
                                <>
                                
                                    <Textarea
                                        className='bg-transparent text-yellow-50 raleway focus:ring-0 max-h-32 min-h-9'
                                        value={editedContent}
                                        maxLength={200}
                                        onChange={(e) => setEditedContent(e.target.value)}
                                    /> 
                                    <div className='flex justify-end gap-2 text-xs mr-4'>
                                        <button type='button' onClick={handleSave} className='beige hover:text-yellow-400 border rounded-bl-lg rounded-br-lg px-3 py-2 transition-all duration-200'>Save</button>
                                        <button type='button' onClick={() => setIsEditing(false)}  className='beige hover:text-red-400 border rounded-bl-lg rounded-br-lg transition-all duration-200 px-3 py-2'>Cancel</button>
                                    </div>

                                </>
                            ):(
                                <>
                                     <p className='text-gray-400 raleway pb-2'>{comment.content}</p>
                                        <div className='flex items-center pt-2 text-xs border-t border-solid border-x-0 border-b-0 border-gray-600 max-w-fit gap-2'>
                                            <button type='button' onClick={() => onLike(comment._id)} className={`text-gray-400 hover:text-yellow-300 transition-all duration-200 ${currentUser && comment.likes.includes(currentUser.user._id) && 'text-yellow-500'}`}>
                                                <FaThumbsUp/>
                                            </button>
                                            <p className='text-gray-400 raleway'>
                                                {
                                                    comment.numberOfLikes > 0 &&
                                                    comment.numberOfLikes + " " + (comment.numberOfLikes > 1 ? "likes" : "like")
                                                }
                                            </p>
                                            {
                                                currentUser && (currentUser.user._id == comment.userId || currentUser.user.isAdmin) && (
                                                    <>
                                                        <button 
                                                            type='button' 
                                                            onClick={handleEdit}
                                                            className='raleway text-gray-400 hover:text-yellow-400 transition-all duration-200 select-none'
                                                        >
                                                            Edit
                                                        </button>

                                                        <button 
                                                        type='button' 
                                                        onClick={() => onDelete(comment._id)}
                                                        className='raleway text-gray-400 hover:text-red-500 transition-all duration-200 select-none'
                                                        >
                                                            Delete
                                                        </button>
                                                    </>
                                                    

                                                    
                                                )
                                            }
                                        </div>
                                </>
                            )
                    }
                   
                </div>
            </div>
        </div>
    );
}

export default Comment;
