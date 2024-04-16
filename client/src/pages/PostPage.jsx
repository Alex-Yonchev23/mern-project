import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from "../components/Loading";
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';

export default function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true); 
                const res = await fetch(`/server/post/get-posts?slug=${postSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    // Handle error
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

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <main className='p-4 max-w-6xl max-md:m-2 md:mx-auto min-h-screen rounded-xl big-shadow border-2 border-yellow-400 border-solid bg-black/80 backdrop-blur-[1.5px] mt-3 mb-5'>
            <h1 className='beige text-3xl md:text-4xl text-center my-3 '>{post && post.title}</h1>

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
                <span className='sans-serif'>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
            </div>

            <div className='post-content text-lg leading-relaxed beige raleway' dangerouslySetInnerHTML={{ __html: post && post.content }}></div>
        </main>
    );
}
