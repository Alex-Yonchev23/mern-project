import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/user/userSlice';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/Loading.jsx';

export default function DashPosts() {
    const currentUser = useSelector(selectCurrentUser);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMore, setShowMore] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/server/post/getposts?userId=${currentUser._id}`);
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
            const res = await fetch(`/server/post/getposts?userId= ${currentUser._id}&startIndex=${startIndex}`);
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

    return (
        <div className='w-full '>
            {loading ? (
                <LoadingSpinner/>
            ) : (
                userPosts.length > 0 ? (
                    <>        
                    <div className='w-full xl:w-10/12 xl:mx-auto overflow-x-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-yellow-400  p-8  rounded-lg big-shadow border-2 border-yellow-400 border-solid bg-black/80 backdrop-blur-[1.5px] mt-3 mb-10'>

                    <div className=''>
                        <Table hoverable className='bg-transparent'>
                            <Table.Head className='text-black text-md font-semibold tracking-wider text-nowrap'>
                                <Table.HeadCell className='bg-yellow-50'>Date Updated</Table.HeadCell>
                                <Table.HeadCell className='bg-yellow-50'>Post Image</Table.HeadCell>
                                <Table.HeadCell className='bg-yellow-50'>Post Title</Table.HeadCell>
                                <Table.HeadCell className='bg-yellow-50'>Category</Table.HeadCell>
                                <Table.HeadCell className='bg-yellow-50'>Delete</Table.HeadCell>
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
                                            <Link to={`/post/${post.slug}`} className='raleway'>
                                                {post.title}
                                            </Link>
                                        </Table.Cell>
                                        <Table.Cell className='raleway'>
                                            {post.category}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <span className='text-red-500 raleway font-medium hover:underline underline-offset-2 cursor-pointer select-none'>Delete</span>
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
                        </div>
                    </>
                ) : (
                    <p className='beige'>No posts yet.</p>
                )
            )}
        
        </div>
    )
}
