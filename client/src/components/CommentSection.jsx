import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Textarea, Button, Modal } from 'flowbite-react';
import { errorMessage, successMessage, infoMessage } from './ToastMessage';
import Comment from './Comment';
import { useNavigate } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';


export default function CommentSection({ postId }) {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const isLoggedIn = !!currentUser;
    const navigate = useNavigate();

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
                    userId: currentUser?.user?._id,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                if (data.message === 'You cannot submit empty comment') {
                    infoMessage(data.message);
                } else {
                    errorMessage(data.message);
                }
                return;
            }

            setComment('');
            successMessage('Коментарът беше публикуван успешно');
            setComments([data, ...comments]);
        } catch (error) {
            errorMessage(error.message);
        }
    };

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`/server/comment/getPostComments/${postId}`);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getComments();
    }, [postId]);

    const handleLike = async (commentId) => {
        try {
            if (!currentUser) {
                navigate('/sign-up');
                return;
            }
            const res = await fetch(`/server/comment/likeComment/${commentId}`, {
                method: 'PUT',
            });

            const data = await res.json();

            if (res.ok) {
                setComments(
                    comments.map((comment) =>
                        comment._id === commentId
                            ? {
                                ...comment,
                                likes: data.likes,
                                numberOfLikes: data.likes.length,
                            }
                            : comment
                    )
                );
            } else {
                errorMessage(data.message)
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = async (comment, editedContent) => {
        try {
            const res = await fetch(`/server/comment/editComment/${comment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: editedContent }),
            });

            const data = await res.json();

            if (res.ok) {
                setComments(
                    comments.map((c) =>
                        c._id === comment._id
                            ? { ...c, content: editedContent }
                            : c
                    )
                );
                successMessage(data.message);
            } else {
                errorMessage(data.message);
            }
        } catch (error) {
            errorMessage(error.message);
        }
    };

    const handleDelete = async (commentId) => {
        try {
            if (!currentUser) {
                navigate('/sign-up');
                return;
            }

            const res = await fetch(`/server/comment/deleteComment/${commentId}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (res.ok) {
                setComments(comments.filter((c) => c._id !== commentId));
                successMessage(data.message);
            } else {
                errorMessage(data.message);
            }
            setShowModal(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='max-w-2xl mx-auto rounded-xl'>
            <div className='max-w-2xl mx-auto border-yellow-50 border-1 border-solid p-4 rounded-tl-3xl rounded-br-3xl'>
                {!isLoggedIn && (
                    <div className='text-sm beige my-5 flex gap-1 raleway'>
                        Влезте, за да оставяте коментари и харесвания.
                        <Link className='text-yellow-400 hover:underline' to={'/sign-up'}>
                            Вход
                        </Link>
                    </div>
                )}
                {
                    isLoggedIn && (
                        <>
                            <div className='beige flex items-center gap-1 mb-3 text-gray-500 text-sm'>
                                <p className='mr-2'>Влязохте като:</p>
                                <img src={currentUser.user.avatar} alt='' className='h-6 w-6 object-cover rounded-full mx-1' />
                                <Link
                                    to={'/dashboard?tab=profile'}
                                    className='raleway hover:opacity-80 hover:underline transition-all'>
                                    @{currentUser.user.firstName} {currentUser.user.lastName}
                                </Link>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <Textarea
                                    placeholder='Добавете коментар...'
                                    rows='4'
                                    maxLength='200'
                                    className='raleway focus:ring-yellow-400 transition-all duration-200 bg-yellow-50 max-h-32 min-h-9'
                                    onChange={(e) => setComment(e.target.value)}
                                    value={comment}
                                />
                                <div className='flex justify-between items-center'>
                                    <p className='beige text-xs mt-2'>{200 - comment.length} оставащи символи</p>
                                    <button className='main-btn mt-3 text-sm text-yellow-50 border-1 border-solid border-yellow-400 rounded-lg hover:rounded-3xl px-4 py-2 uppercase tracking-wider select-none'>
                                        Изпращане
                                    </button>
                                </div>
                            </form>
                        </>
                )}
            </div>

            {comments.length === 0 ? (
                <p className='text-sm my-5 beige raleway'>Все още няма коментари!</p>
            ) : (
                <>
                    <div className='text-sm mt-5 mb-2 flex items-center gap-2'>
                        <p className='beige'>Коментари</p>
                        <div className='border border-yellow-400 border-solid py-1 px-2 rounded-sm'>
                            <p className='beige'>{comments.length}</p>
                        </div>
                    </div>
                    {comments.map((comment) => (
                        <div className='border-b border-gray-400 border-solid border-x-0 border-t-0' key={comment._id}>
                            <div>
                                <Comment
                                    key={comment._id}
                                    comment={comment}
                                    onLike={handleLike}
                                    onEdit={handleEdit}
                                    onDelete={(commentId) => {
                                        setShowModal(true);
                                        setCommentToDelete(commentId);
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </>
            )}

            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'
                className='bg-black/80 backdrop-blur-sm'
            >
                <Modal.Header className='bg-yellow-50 rounded-lg' />
                <Modal.Body className='bg-yellow-50 rounded-lg'>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-black/90 mb-4 mx-auto' />
                        <h3 className='raleway mb-5 text-lg text-black/90'>
                            Сигурни ли сте, че искате да изтриете този коментар?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={() => handleDelete(commentToDelete)}>
                                Да, сигурен съм
                            </Button>
                            <Button color='warning' onClick={() => setShowModal(false)}>
                                Не, откажи
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </div>
    );
}
