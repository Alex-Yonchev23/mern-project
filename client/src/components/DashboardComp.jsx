import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function DashboardComp() {
  const { currentUser } = useSelector((state) => state.user);  
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  
  useEffect(()=> {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/server/user/get-users?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error);
      }

    }

    const fetchPosts = async () => {
      try {
        const res = await fetch(`/server/blog/get-posts?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error);
      }
    } 

    const fetchComments = async () => {
      try {
        const res = await fetch(`/server/comment/getComments?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments)
        }
      } catch (error) {
        console.log(error);
      }

    }

    fetchUsers();
    fetchPosts();
    fetchComments();
  }, []);

  return (
    <div className='p-3 md:mx-auto min-h-screen'>
      <div className='flex-wrap flex gap-4 justify-center'>

        <div className='flex flex-col p-3 gap-4 md:w-72 w-full rounded-md bg-neutral-950 border !border-yellow-400 big-shadow hover:translate-y-[-3px] transition-all duration-200	'>
          <div className='flex justify-between '>
            <div className=''>
              <h3 className='text-yellow-50 text-md '>Общ брой потребители</h3>
              <p className='text-2xl text-yellow-50'>{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className='bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex  gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className='text-gray-500 raleway'>Миналия месец</div>
          </div>
        </div>

        <div className='flex flex-col p-3 gap-4 md:w-72 w-full rounded-md bg-neutral-950 border !border-yellow-400 big-shadow hover:translate-y-[-3px] transition-all duration-200'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-yellow-50 text-md '>
                Общ брой коментари
              </h3>
              <p className='text-2xl text-yellow-50'>{totalComments}</p>
            </div>
            <HiAnnotation className='bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex  gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className='text-gray-500 raleway'>Миналия месец</div>
          </div>
        </div>

        <div className='flex flex-col p-3 gap-4 md:w-72 w-full rounded-md bg-neutral-950 border !border-yellow-400 big-shadow hover:translate-y-[-3px] transition-all duration-200'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-yellow-50 text-md '>Общ брой публикации</h3>
              <p className='text-2xl text-yellow-50'>{totalPosts}</p>
            </div>
            <HiDocumentText className='bg-lime-600  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex  gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className='text-gray-500 raleway'>Миналия месец</div>
          </div>
        </div>
      </div>

      <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
        <div className='flex flex-col w-full md:w-auto p-3 rounded-md bg-neutral-950 border !border-yellow-400 big-shadow'>
          <div className='flex justify-between gap-3 p-3 text-sm font-medium'>
            <h1 className='text-center p-2 text-yellow-50 lg:text-xl text-lg'>Скорошни потребители</h1>
              <Link to={'/dashboard?tab=users'} className='underline text-gray-500 self-center hover:text-yellow-500 transition-all duration-200'>Виж всички</Link>
          </div>
          <Table hoverable className="bg-neutral-950">
            <Table.Head>
              <Table.HeadCell>Снимка на потребителя</Table.HeadCell>
              <Table.HeadCell>Пълно име</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id} className='divide-y'>
                  <Table.Row className=' bg-neutral-950 transition-all duration-200 '>
                    <Table.Cell>
                      <img
                        src={user.avatar}
                        alt='user'
                        className='w-10 h-10 rounded-full bg-gray-500'
                      />
                    </Table.Cell>
                    <Table.Cell className='raleway'>{`${user.firstName} ${user.lastName}`}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className='flex flex-col w-full md:w-auto p-3 rounded-md bg-neutral-950 border !border-yellow-400 big-shadow'>
          <div className='flex justify-between p-3 text-sm font-medium'>
            <h1 className='text-center p-2 text-yellow-50 lg:text-xl text-lg '>Скорошни коментари</h1>
            <Link to={'/dashboard?tab=comments'} className='underline text-gray-500 self-center hover:text-yellow-500 transition-all duration-200'>Виж всички</Link>
          </div>
          <Table hoverable className="bg-neutral-950 ">
            <Table.Head>
              <Table.HeadCell>Съдържание на коментара</Table.HeadCell>
              <Table.HeadCell>Харесвания</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.map((comment) => (
                <Table.Body key={comment._id} className='divide-y'>
                  <Table.Row className=' bg-neutral-950 transition-all duration-200'>
                    <Table.Cell className='w-96'>
                        <p className='line-clamp-2 raleway'>{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell className='raleway'>{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className='flex flex-col w-full md:w-auto p-3 rounded-md bg-neutral-950 border !border-yellow-400 big-shadow'>
          <div className='flex justify-between p-3 text-sm font-medium'>
            <h1 className='text-center p-2 text-yellow-50 lg:text-xl text-lg'>Скорошни публикации</h1>
            <Link to={'/dashboard?tab=posts'} className='underline text-gray-500 self-center hover:text-yellow-500 transition-all duration-200'>Виж всички</Link>
          </div>
          <Table hoverable className="bg-neutral-950">
            <Table.Head>
              <Table.HeadCell>Снимка на публикацията</Table.HeadCell>
              <Table.HeadCell>Заглавие на публикацията</Table.HeadCell>
              <Table.HeadCell>Категория</Table.HeadCell>
            </Table.Head>
            {posts &&
              posts.map((post) => (
                <Table.Body key={post._id} className='divide-y'>
                  <Table.Row className=' bg-neutral-950 transition-all duration-200'>
                    <Table.Cell>
                      <img
                        src={post.image}
                        alt='user'
                        className='w-14 h-10 rounded-md object-contain bg-neutral-950'
                      />
                    </Table.Cell>
                    <Table.Cell className='w-96 raleway'>{post.title}</Table.Cell>
                    <Table.Cell className='w-5 raleway'>{post.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
