import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/user/userSlice';


export default function DashPosts() {
    const currentUser = useSelector(selectCurrentUser);
    const [ userPosts, setUserPosts ] = useState([]);
    console.log(userPosts);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/server/post/getposts?userId=${currentUser._id}`);
                const data = await res.json();

                if(res.ok){
                    setUserPosts(data.posts);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        
    if(currentUser.isAdmin){
        fetchPosts();
    }
    }, [currentUser._id]);
    
  return (
    <div>DashPosts</div>
  )
}
