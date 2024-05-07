import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className='group relative w-full border border-yellow-500 hover:border-2 h-[300px] overflow-hidden rounded-lg sm:w-[350px] transition-all'>
      <Link to={`/blog/${post.slug}`}>
        <img
          src={post.image}
          alt='post cover'
          className='h-[200px] w-full object-cover group-hover:h-[150px] transition-all duration-300 z-20'
        />
      </Link>
      <div className='p-2 flex flex-col gap-1'>
        <p className='text-base font-semibold line-clamp-2 text-yellow-50'>{post.title}</p>
        <span className='italic text-sm text-gray-500'>{post.category}</span>
        <Link
          to={`/blog/${post.slug}`}
          className='z-10 group-hover:bottom-0 absolute bottom-[-150px]  left-0 right-0 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-1 text-sm'
        >
          Read article
        </Link>
      </div>
    </div>
  );
}
