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

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/server/post/getposts?userId=${currentUser._id}`);
                const data = await res.json();

                if (res.ok) {
                    setUserPosts(data.posts);
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

    return (
            <div className='min-w-min table-auto p-8 mx-auto lg:w-2/3 rounded-lg big-shadow border-2 border-yellow-400 border-solid bg-black/80 backdrop-blur-[1.5px] mt-3 mb-10'>
                {loading ? (
                        <LoadingSpinner/>
                ) : (
                    userPosts.length > 0 ? (
                        <>
                            <Table hoverable className='bg-transparent'>
                                <Table.Head className='text-black text-md font-semibold tracking-wide'>
                                    <Table.HeadCell className='bg-yellow-50'>Date Updated</Table.HeadCell>
                                    <Table.HeadCell className='bg-yellow-50'>Post Image</Table.HeadCell>
                                    <Table.HeadCell className='bg-yellow-50'>Post Title</Table.HeadCell>
                                    <Table.HeadCell className='bg-yellow-50'>Category</Table.HeadCell>
                                    <Table.HeadCell className='bg-yellow-50'>Delete</Table.HeadCell>
                                    <Table.HeadCell className='bg-yellow-50'>
                                        <span>Edit</span>
                                    </Table.HeadCell>
                                </Table.Head>
                                <Table.Body className='divide-y overflow-y-scroll'>
                                    {userPosts.map((post) => (
                                        <Table.Row key={post._id} className='hover:bg-black/50 text-base beige rounded-xl'>
                                            <Table.Cell className='raleway'>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                                            <Table.Cell>
                                                <Link to={`/post/${post.slug}`}>
                                                    <img 
                                                        src={post.image}
                                                        alt={post.title}
                                                        className='w-full h-20 rounded-md object-cover' 
                                                    />
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
                        </>
                    ) : (
                        <p className='beige'>No posts yet.</p>
                    )
                )}
            </div>
    )
}
