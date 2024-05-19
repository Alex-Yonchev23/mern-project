import { Sidebar } from 'flowbite-react';
import '../styles/dash-sidebar.css';
import { HiMiniMinusSmall } from "react-icons/hi2";
import { selectCurrentUser, setLoading } from '../redux/user/userSlice';

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
  const currentUser = useSelector(selectCurrentUser);
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
    <div className='md:sticky md:top-28 mb-2'>
    <Sidebar className='w-screen md:w-56 lg:mx-10 mx-3 big-shadow sidebar-style'>
      <Sidebar.Items className=''>
        <Sidebar.ItemGroup className='flex flex-col gap-1 p-0 my-4 text-yellow-50'>
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item
                active={tab === 'dash' || !tab ? 'bg-neutral-800 transition-all duration-200' : ''}
                icon={HiChartPie}
                as='div'
                className='hover:bg-neutral-800 transition-all duration-200 bg-neutral-950 focus:border focus:border-solid focus:border-yellow-500'
              >
                Дашборд
              </Sidebar.Item>
            </Link>
          
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label='Админ'
              labelColor='yellow'
              as='div'
              className='hover:bg-neutral-800 transition-all duration-200 bg-neutral-950'
            >
              Профил
            </Sidebar.Item>
          </Link>
            <Sidebar.Collapse icon={HiOutlinePlusCircle} label="Добавяне" className='text-yellow-50 hover:bg-neutral-800 transition-all duration-200 bg-neutral-950'>
                <Link to='/dashboard?tab=create-post'>
                    <Sidebar.Item
                    active={tab === 'create-post'}
                    icon={HiMiniMinusSmall}
                    as='div'
                    className='hover:bg-neutral-800 transition-all duration-200 bg-neutral-950'
                    >
                      Публикация
                    </Sidebar.Item>
                </Link>
                <Link to='/dashboard?tab=image-card'>
                    <Sidebar.Item
                    active={tab === 'image-card'}
                    icon={HiMiniMinusSmall }
                    as='div'
                    className='hover:bg-neutral-800 transition-all duration-200 bg-neutral-950'
                    >
                      Скулптура
                    </Sidebar.Item>
                </Link>
            </Sidebar.Collapse>
            

            <Link to='/dashboard?tab=posts'>
              <Sidebar.Item
                active={tab === 'posts'}
                icon={HiDocumentText}
                as='div'
                className='hover:bg-neutral-800 transition-all duration-200 bg-neutral-950'
              >
                Публикации 
              </Sidebar.Item>
            </Link>

            
              <Link to='/dashboard?tab=users'>
                <Sidebar.Item
                  active={tab === 'users'}
                  icon={HiOutlineUserGroup}
                  as='div'
                  className='hover:bg-neutral-800 transition-all duration-200 bg-neutral-950'
                >
                  Потребители
                </Sidebar.Item>
              </Link>

              <Link to='/dashboard?tab=comments'>
                <Sidebar.Item
                  active={tab === 'comments'}
                  icon={HiAnnotation}
                  as='div'
                  className='hover:bg-neutral-800 transition-all duration-200 bg-neutral-950'
                >
                  Коментари
                </Sidebar.Item>
              </Link>
            
            <Sidebar.Item
              icon={HiArrowSmRight}
              className='cursor-pointer hover:bg-neutral-800 transition-all duration-200 bg-neutral-950'
              onClick={handleLogOut}
              
            >
              Изход
            </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    </div>
  );
}
