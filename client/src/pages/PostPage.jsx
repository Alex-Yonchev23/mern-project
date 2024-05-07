import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from "../components/Loading";
import { Link } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';

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
        <main className='p-4 max-w-6xl mx-3 md:mx-auto min-h-screen rounded-xl big-shadow border-2 border-yellow-400 border-solid bg-black/80 backdrop-blur-[1.5px] mt-3 mb-5'>
            <h1 className='beige text-3xl md:text-4xl text-center my-3'>{post && post.title}</h1>

            <div className='flex justify-center mt-3'>
                <Link to={`/search?category=${post && post.category}`}>
                    <button className='rounded-full bg-yellow-50 px-3 py-1 my-3 font-semibold hover:scale-95 hover:text-yellow-400 transition-all duration-300 hover:shadow-xl tracking-wide hover:shadow-yellow-50/10'>
                        {post && post.category}
                    </button>
                </Link>
            </div>

            <img
                src={post && post.image}
                alt={post && post.title}
                className='w-fit mx-auto max-h-96 my-3 object-contain rounded-md'
            />            

            <div className='flex justify-between font-semibold text-sm text-gray-400 mb-5'>
                <span className='sans-serif'>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                <span className='sans-serif'>{post && (post.content.length / 500).toFixed(0)} mins read</span>
            </div>

            <div className='post-content text-lg leading-relaxed beige raleway' dangerouslySetInnerHTML={{ __html: post && post.content }}></div>
            
            <div className="golden-span w-full h-[.2px] bg-yellow-400 my-5 rounded-full"></div>

            {post && <CommentSection postId={post._id} />}

            <div className='flex flex-col justify-center items-center mb-5'>
                <h1 className='text-xl mt-5  text-yellow-50'>Recent articles</h1>
                <div className='flex flex-wrap gap-3 mt-5 justify-center'>
                    {
                        recentPosts && 
                            recentPosts.map((post) => <PostCard key={post._id} post={post}></PostCard>)
                    }
                </div>
            </div>
        </main>
    );
}
