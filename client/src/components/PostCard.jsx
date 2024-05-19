import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";

export default function PostCard({ post }) {
  return (
    <div className='bg-neutral-950 group relative w-full border-1 border-gray-500 border-solid  hover:border-yellow-400 h-[300px] overflow-hidden rounded-lg sm:w-[350px] transition-all'>
      <Link to={`/blog/${post.slug}`}>
        <img
          src={post.image}
          alt='Покрив на публикация'
          className='h-[200px] w-full object-cover group-hover:h-[150px] transition-all duration-300 z-20'
        />
      </Link>
      <div className='p-2 flex flex-col gap-1'>
        <Link to={`/blog/${post.slug}`}>
            <p className='text-base line-clamp-2 text-yellow-50 hover:opacity-70 transition-all duration-300'>{post.title}</p>
        </Link>
        <span className='italic text-sm text-gray-500 raleway '>{post.category}</span>
        <Link
          to={`/blog/${post.slug}`}
          className='z-10 group/btn group-hover:bottom-0 absolute bottom-[-150px] left-0 right-0 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white transition-all duration-300 text-center py-2 rounded-lg !rounded-tl-none m-1 text-sm'
        >
          <div className='flex flex-row justify-center items-center'>
             <span className='leading-4 mr-1 font-medium raleway'>Прочети статията</span>
             <FaArrowRight className='transition-all duration-300 transform translate-x-0 group-hover/btn:translate-x-1' />
          </div>
        </Link>
      </div>
    </div>
  );
}
