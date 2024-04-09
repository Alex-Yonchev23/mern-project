import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/user/userSlice';
import { Table,Modal,Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/Loading.jsx';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { errorMessage, successMessage, infoMessage } from './ToastMessage';

export default function DashPosts() {
    const currentUser = useSelector(selectCurrentUser);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMore, setShowMore] = useState(true);
    const [showModal , setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/server/post/getposts?userId=${currentUser.user._id}`);
                const data = await res.json();

                if (res.ok) {
                    setUserPosts(data.posts);
                    if (data.posts.length < 9) {
                        setShowMore(false)
                    }
                }
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        }

        if (currentUser.user.isAdmin) {
            fetchPosts();
        }
    }, [currentUser.user._id]);

    const handleShowMore = async () => {
        const startIndex = userPosts.length;
        try {
            const res = await fetch(`/server/post/getposts?userId= ${currentUser.user._id}&startIndex=${startIndex}`);
            const data = await res.json();

            if (res.ok) {
                setUserPosts((prev) => [...prev, ...data.posts]);
                if (data.posts.length < 9) {
                    setShowMore(false)
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleDeletePost = async () => {
        setShowModal(false);
        try {
            const res= await fetch(`/server/post/deletepost/${postIdToDelete}/${currentUser.user._id}`,
            {
                method: 'DELETE',
            }
            );

             const data = await res.json();
             if (!res.ok) {
                 errorMessage(data.message);
             } else {
                setUserPosts((prev) => 
                    prev.filter((post) => post._id !== postIdToDelete)
                );
                 successMessage(data.message);
             }
        } catch (error) {
            errorMessage(error.message);
        }
    }

    return (
        <div className='w-full '>
            {loading ? (
                <LoadingSpinner/>
            ) : (
                userPosts.length > 0 ? (
                    <>        
                    <div className='table-auto w-full xl:w-10/12 xl:mx-auto overflow-x-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-yellow-400  p-8  rounded-lg big-shadow border-2 border-yellow-400 border-solid bg-black/80 backdrop-blur-[1.5px] mt-3 mb-10'>

                    <div className=''>
                        <Table hoverable className='bg-transparent'>
                            <Table.Head className='text-black text-md font-semibold tracking-wider text-nowrap'>
                                <Table.HeadCell className='bg-yellow-50'>Date Updated</Table.HeadCell>
                                <Table.HeadCell className='bg-yellow-50'>Post Image</Table.HeadCell>
                                <Table.HeadCell className='bg-yellow-50'>Post Title</Table.HeadCell>
                                <Table.HeadCell className='bg-yellow-50'>Category</Table.HeadCell>
                                <Table.HeadCell className='bg-yellow-50'>
                                    <span>Delete</span>
                                </Table.HeadCell>
                                <Table.HeadCell className='bg-yellow-50'>
                                    <span>Edit</span>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className='divide-y'>
                                {userPosts.map((post) => (
                                    <Table.Row key={post._id} className='hover:bg-black/50 text-base beige rounded-xl transition duration-300 ease-in-out transform hover:scale-105'>
                                        <Table.Cell className='raleway'>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                                        <Table.Cell>
                                            <Link to={`/post/${post.slug}`}>
                                                <div className='rounded-md overflow-hidden min-w-max'>
                                                    <img 
                                                        draggable={false}
                                                        src={post.image}
                                                        alt={post.title}
                                                        className='w-full rounded-md max-h-20 object-cover transition duration-200 ease-in-out transform hover:scale-110 hover:brightness-75 select-none' 
                                                    />
                                                </div>
                                            </Link>
                                        </Table.Cell>
                                        <Table.Cell className='hover:opacity-60'>
                                            <Link to={`/post/${post.slug}`} className='raleway text-balance'>
                                                {post.title}
                                            </Link>
                                        </Table.Cell>
                                        <Table.Cell className='raleway'>
                                            {post.category}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <span 
                                                className='text-red-500 raleway font-medium hover:underline underline-offset-2 cursor-pointer select-none'
                                                onClick={() => {
                                                    setShowModal(true);
                                                    setPostIdToDelete(post._id);
                                                }}
                                            >
                                                Delete
                                            </span>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Link to={`/update-post/${post._id}`}>
                                                <span className='text-yellow-400 raleway font-medium hover:underline underline-offset-2 cursor-pointer select-none'>Edit</span>
                                            </Link>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                        
                        </div>
                        {
                            showMore && (
                                <button onClick={handleShowMore} className='w-full raleway text-yellow-400 self-center text-sm py-7'>
                                    Show more
                                </button>
                            )
                        }

                            <Modal
                                    show={showModal}
                                    onClose={() => setShowModal(false)}
                                    popup
                                    size='md'
                                >
                                    <Modal.Header />
                                    <Modal.Body>
                                    <div className='text-center'>
                                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                                        Are you sure you want to delete this post?
                                        </h3>
                                        <div className='flex justify-center gap-4'>
                                        <Button color='failure' onClick={handleDeletePost}>
                                            Yes, I'm sure
                                        </Button>
                                        <Button color='gray' onClick={() => setShowModal(false)}>
                                            No, cancel
                                        </Button>
                                        </div>
                                    </div>
                                    </Modal.Body>
                                </Modal>
                        </div>
                    </>
                ) : (
                    <p className='beige'>No posts yet.</p>
                )
            )}
        
        </div>
    )
}
