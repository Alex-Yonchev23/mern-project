import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/user/userSlice';
import { Table, Modal, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/Loading.jsx';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { errorMessage, successMessage } from './ToastMessage';

export default function DashComments() {
    const currentUser = useSelector(selectCurrentUser);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMore, setShowMore] = useState(true);
    const [showModal , setShowModal] = useState(false);
    const [commentIdToDelete, setCommentIdToDelete] = useState('');
    const [totalComments, setTotalComments] = useState(0);
    const [remainingComments, setRemainingComments] = useState(0);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`/server/comment/getComments`);
                const data = await res.json();

                if (res.ok) {
                    setComments(data.comments);
                    setTotalComments(data.totalComments); 
                    if (data.remainingComments > 0) {
                        setShowMore(true); 
                    }
                }
            } catch (error) {
                errorMessage(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser.user.isAdmin) {
            fetchComments();
        }
    }, [currentUser._id]);

    const handleShowMore = async () => {
        const startIndex = comments.length;

        try {
            const res = await fetch(`/server/comment/getComments?startIndex=${startIndex}&limit=9`);
            const data = await res.json();

            if (res.ok) {
                setComments((prev) => [...prev, ...data.comments]);                    
                setRemainingComments(data.remainingComments);

                if (data.remainingComments <= 0) {
                    setShowMore(false); 
                }
            }
        } catch (error) {
            errorMessage(error.message);
        }
    };

    const handleDeleteComment = async () => {
        try {
            const res = await fetch(`/server/comment/deleteComment/${commentIdToDelete}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (res.ok) {
                setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
                setShowModal(false);
                successMessage(data.message);
            } else {
                errorMessage(data.message);
            }
        } catch (error) {
            errorMessage(error.message);
        }
    };
    
    return (
        <main className='overflow-hidden m-2 xl:mx-auto w-full overflow-x-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-yellow-400 px-8 pb-8 rounded-xl big-shadow border-2 border-yellow-400 border-solid bg-black/80 backdrop-blur-[1.5px] mt-3 mb-5'>
            <div className='overflow-auto h-full'>
                <h1 className=' text-yellow-50 text-center mb-4 text-2xl bg-yellow-400 w-fit px-20 py-1 font-semibold rounded-b-lg'>Коментари</h1>
                {loading ? (
                    <LoadingSpinner/>
                ) : (
                    comments.length > 0 ? (
                        <>        

                            <Table hoverable className='bg-transparent'>
                                <Table.Head className='text-black text-md font-semibold tracking-wider text-nowrap'>
                                    <Table.HeadCell className='bg-yellow-50'>Дата на обновяване</Table.HeadCell>
                                    <Table.HeadCell className='bg-yellow-50'>Съдържание на коментар</Table.HeadCell>
                                    <Table.HeadCell className='bg-yellow-50'>Харесвания</Table.HeadCell>
                                    <Table.HeadCell className='bg-yellow-50'>Id на публикация</Table.HeadCell>
                                    <Table.HeadCell className='bg-yellow-50'>Id на потребителя</Table.HeadCell>
                                    <Table.HeadCell className='bg-yellow-50'>
                                        <span>Изтрий</span>
                                    </Table.HeadCell>
                                </Table.Head>
                                <Table.Body className='divide-y'>
                                    {
                                    comments.map((comment) => (
                                        <Table.Row key={comment._id} className='hover:bg-black/50 text-base rounded-none beige transition duration-300 ease-in-out transform hover:scale-105'>
                                            <Table.Cell className='raleway'>{new Date(comment.updatedAt).toLocaleDateString()}</Table.Cell>
                                            <Table.Cell className='raleway line-clamp-2 '>
                                                        {comment.content}
                                            </Table.Cell>
                                            <Table.Cell className='raleway '>
                                                {comment.numberOfLikes}
                                            </Table.Cell>
                                            <Table.Cell className='raleway'>
                                                {comment.postId}
                                            </Table.Cell>
                                            <Table.Cell className='raleway'>
                                                {comment.userId}
                                            </Table.Cell>

                                            <Table.Cell>
                                                <span 
                                                    className='text-red-500 raleway font-medium hover:underline underline-offset-2 cursor-pointer select-none'
                                                    onClick={() => {
                                                        setShowModal(true);
                                                        setCommentIdToDelete(comment._id);
                                                    }}
                                                >
                                                    Изтрий
                                                </span>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                            {
                                showMore && (
                                    <button onClick={handleShowMore} className='w-full raleway text-yellow-400 self-center text-sm py-7'>
                                        Покажи още
                                    </button>
                                )
                            }
                            
                                <Modal
                                        show={showModal}
                                        onClose={() => setShowModal(false)}
                                        popup
                                        size='md'
                                        className='bg-black/70 backdrop-blur-sm'
                                    >
                                        <Modal.Header className='bg-yellow-50 rounded-lg'/>
                                        <Modal.Body className='bg-yellow-50 rounded-lg'>
                                        <div className='text-center '>
                                            <HiOutlineExclamationCircle className='h-14 w-14 text-black/90 mb-4 mx-auto' />
                                            <h3 className='raleway mb-5 text-lg text-black/90'>
                                                Сигурни ли сте, че искате да изтриете този коментар?
                                            </h3>
                                            <div className='flex justify-center gap-4 '>
                                            <Button color='failure' onClick={handleDeleteComment}>
                                                Да, сигурен съм
                                            </Button>
                                            <Button color='warning' onClick={() => setShowModal(false)}>
                                                Не, отмени
                                            </Button>
                                            </div>
                                        </div>
                                        </Modal.Body>
                                    </Modal>
                            
                        </>
                    ) : (
                        <p className='beige'>Нямате коментари все още!</p>
                    )
                )}
            
            </div>
        </main>
    )
}