import React, { useState, useEffect } from 'react';
import { FaInstagram, FaFacebook, FaViber, FaPinterest, FaRegCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(5); // Change the number of visible posts to 5
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/server/blog/get-posts');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        if (!Array.isArray(data.posts)) {
          throw new Error('Fetched data does not contain an array of posts');
        }
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error.message);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className="text-yellow-50 min-h-screen p-4">
      <div className="container mx-auto">
        <div className="text-center mb-8 bg-neutral-950 p-4 rounded-lg white-shadow">
          <h2 className="text-4xl font-bold text-yellow-400">Ironic's Blog</h2>
          <h5 className="text-xl text-gray-400">Exploring Life's Paradoxes and Ironies</h5>
        </div>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-8/12 px-4">
            {loading ? (
              <p className="text-center text-yellow-400">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-400">{error}</p>
            ) : (
              posts.slice(0, visiblePosts).map((post, index) => (
                <div key={index} className="bg-neutral-950 p-6 mb-6 rounded shadow-md">
                  <Link to={`/blog/${post.slug}`} >
                    <img
                      src={post.image}
                      alt="Blog Post Image"
                      className="w-full h-72 object-cover rounded-lg mb-4"
                    />
                  </Link>
                  <div className="flex items-center mb-4 text-sm text-gray-500 dark:text-gray-400">
                    <FaRegCalendarAlt className="w-4 h-4 mr-2" />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                  <h5 className="text-gray-400 mb-2">Author: {post.author}</h5>
                  <p className="text-gray-300 mb-4 line-clamp-2" dangerouslySetInnerHTML={{ __html: post && post.content }}></p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary-500 hover:text-primary-600 transition-colors"
                  >
                    Read More
                    <FaArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              ))
            )}
          </div>

          <div className="w-full lg:w-4/12 px-4">
            <div className="bg-neutral-950 p-6 mb-6 rounded shadow-md">
              <p className="text-gray-300 mb-4 text-shadow">Use the search bar below to find content:</p>
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 rounded bg-gray-700 text-yellow-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div className="bg-neutral-950 p-6 mb-6 rounded shadow-md">
              <h2 className="text-2xl font-bold mb-4">About Us</h2>
              <div className="bg-gray-700 h-24 mb-4 flex items-center justify-center text-yellow-50">Image</div>
              <p className="text-gray-300">Some text about me in culpa qui officia deserunt mollit anim...</p>
            </div>

            <div className="bg-neutral-950 p-6 mb-6 rounded shadow-md">
              <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
              <div className="flex flex-wrap justify-between space-y-3">
                {posts.slice(0, 3).map((post, index) => (
                  <PostCard key={index} post={post} />
                ))}
              </div>
            </div>

              <div className="bg-neutral-950 p-6 rounded shadow-md">
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex space-x-4 mb-4">
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    <FaInstagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    <FaFacebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    <FaViber className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-200">
                    <FaPinterest className="w-6 h-6" />
                  </a>
                </div>
                <p className="text-gray-300">Stay connected for updates and news about the creation of our masterpieces.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
