import { Sidebar } from 'flowbite-react';
import '../styles/dash-sidebar.css';
import { HiMiniMinusSmall } from "react-icons/hi2";

import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
  HiOutlinePlusCircle,
  HiOutlineMinusSm
  
} from 'react-icons/hi';
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logOut } from "../redux/user/userSlice";


export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleLogOut = async () => {
    try {
      await fetch('/server/auth/log-out');
      dispatch(logOut());
    } catch (error) {
        console.log(error);
    }
}
  
  return (
    <div className='md:sticky md:top-28'>
    <Sidebar className='w-full md:w-56 md:mx-10 '>
      <Sidebar.Items className=''>
        <Sidebar.ItemGroup className='flex flex-col gap-1 p-0 my-4'>
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item
                active={tab === 'dash' || !tab}
                icon={HiChartPie}
                as='div'
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label='Admin'
              labelColor='yellow'
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>
            <Sidebar.Collapse icon={HiOutlinePlusCircle} label="Create">
                <Link to='/dashboard?tab=create-post'>
                    <Sidebar.Item
                    active={tab === 'create-post'}
                    icon={HiMiniMinusSmall}
                    as='div'
                    >
                      Blog Post
                    </Sidebar.Item>
                </Link>
                <Link to='/dashboard?tab=image-card'>
                    <Sidebar.Item
                    active={tab === 'image-card'}
                    icon={HiMiniMinusSmall }
                    as='div'
                    >
                      Gallery Item
                    </Sidebar.Item>
                </Link>
            </Sidebar.Collapse>
            

            <Link to='/dashboard?tab=posts'>
              <Sidebar.Item
                active={tab === 'posts'}
                icon={HiDocumentText}
                as='div'
              >
                Posts 
              </Sidebar.Item>
            </Link>

            
              <Link to='/dashboard?tab=users'>
                <Sidebar.Item
                  active={tab === 'users'}
                  icon={HiOutlineUserGroup}
                  as='div'
                >
                  Users
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=comments'>
                <Sidebar.Item
                  active={tab === 'comments'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Comments
                </Sidebar.Item>
              </Link>
            
          <Sidebar.Item
            icon={HiArrowSmRight}
            className='cursor-pointer'
            onClick={handleLogOut}
          >
            Log Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    </div>
  );
}