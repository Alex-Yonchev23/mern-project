import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import Profile from '../components/Profile';
import DashPosts from '../components/DashPosts';
import CreatePost from '../components/CreateBlogpost';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/user/userSlice';

export default function Dashboard() {
  const currentUser = useSelector(selectCurrentUser);
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    } else if (!currentUser.user.isAdmin) {
      setTab('profile');
    }
  }, [location.search, currentUser.user.isAdmin]);

  
  return (
    <div className='min-h-screen min-w-screen flex flex-col md:flex-row  max-h-5/6'>
      {
              currentUser.user.isAdmin && (
                <div className='my-10'>
                  {/* Sidebar */}
                  <DashSidebar />
                </div>
              )
      }
      
      {/* profile... */}
      {tab === 'profile' && <Profile />}
      {/* create post... */}
      {currentUser.user.isAdmin && tab === 'create-post' && <CreatePost />}
      {/* posts... */}
      {currentUser.user.isAdmin && tab === 'posts' && <DashPosts />}
      {/* users */}
      {/*tab === 'users' && <DashUsers />*/}
      {/* comments  */}
      {/*tab === 'comments' && <DashComments />*/}
      {/* dashboard comp */}
      {/*tab === 'dash' && <DashboardComp />*/}
  </div>
);
}
