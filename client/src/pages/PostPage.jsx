import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from "../components/Loading";
import { Link } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { FaSearch } from 'react-icons/fa';

export default function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState(null);
    const [recentPosts, setRecentPosts] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true); 
                const res = await fetch(`/server/blog/get-posts?slug=${postSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    return;
                } else if (data.posts && data.posts.length > 0) { 
                    setPost(data.posts[0]);
                } 
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false); 
            }
        };
        fetchPost();
    }, [postSlug]);

    useEffect(() => {
        try {
            const fetchRecentPosts = async () => {
                const res = await fetch('/server/blog/get-posts?limit=3');
                const data = await res.json();
                if (res.ok) {
                   setRecentPosts(data.posts);
                } 
            };
            fetchRecentPosts();
        } catch (error) {
            
        }
    }, [])

    if (loading) {
        return <LoadingSpinner />;
    }
    
    return (
        <main className='p-4 max-w-6xl xl:mx-auto max-xl:mx-3 min-h-screen rounded-xl big-shadow border-2 border-yellow-400 border-solid bg-black/80 backdrop-blur-[1.5px] mt-3 mb-5'>
            <div className='w-full px-4'>
                <h1 className='beige text-3xl md:text-5xl text-center my-3 font-bold overflow-hidden break-all'>
                    <span className="inline-block max-w-full">{post && post.title}</span>
                </h1>
            </div>
            <div className='flex justify-center mt-3'>
                <Link to={`/search?category=${post && post.category}`}>
                    <button className=' my-2 text-sm text-yellow-50 rounded-lg px-4 py-2 uppercase tracking-widest select-none'>
                        {post && post.category}
                    </button>
                </Link>
            </div>

            <PhotoProvider>
            <PhotoView src={post && post.image}>
                <div className='bg-neutral-950 rounded-lg relative group'>
                    <img
                        src={post && post.image}
                        alt={post && post.title}
                        className='w-fit mx-auto max-h-96 my-3 object-cover rounded-lg group-hover:opacity-70 transition-all duration-300 '
                    />
                    <div className='absolute inset-0 justify-center items-center hidden cursor-pointer group-hover:flex transition-all'>
                        <div className='bg-neutral-950 p-3  rounded-lg hover:bg-neutral-800 transition-all duration-200'>
                            <span className='text-gray-500'><FaSearch/></span>
                        </div>
                    </div>
                </div>
            </PhotoView>
            </PhotoProvider>


            <div className='flex justify-between font-semibold text-sm text-gray-500 mb-5'>
                <span className='sans-serif'>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                <span className='sans-serif'>
                {post &&
                    ((post.content.length / 500).toFixed(0) > 1
                    ? `${(post.content.length / 500).toFixed(0)} минути за четене`
                    : `${(post.content.length / 500).toFixed(0)} минута за четене`)}
                </span>

            </div>

            <div className='post-content text-lg leading-relaxed beige raleway' dangerouslySetInnerHTML={{ __html: post && post.content }}></div>
            
            <div className="golden-span w-full h-[.2px] bg-yellow-400 my-5 rounded-full"></div>

            {post && <CommentSection postId={post._id} />}

            {recentPosts && recentPosts.length > 0 && (
                <div className='flex flex-col justify-center items-center mb-5'>
                    <h1 className='text-xl mt-5 text-yellow-50'>Последни статии</h1>
                    <div className='flex flex-wrap gap-3 mt-5 justify-center'>
                        {recentPosts.map((post) => (
                            <PostCard key={post._id} post={post} />
                        ))}
                    </div>
                </div>
            )}

            {(!recentPosts || recentPosts.length === 0) && (
                <div className='text-center text-yellow-50 mt-5'>
                    Няма налични последни статии.
                </div>
            )}
        </main>
    );
}
