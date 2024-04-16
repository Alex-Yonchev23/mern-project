import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/user/userSlice';
import { Table,Modal,Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/Loading.jsx';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { errorMessage, successMessage, infoMessage } from './ToastMessage';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashUsers() {
    const currentUser = useSelector(selectCurrentUser);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMore, setShowMore] = useState(true);
    const [showModal , setShowModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`/server/user/get-users?limit=9`);
                const data = await res.json();

                if (res.ok) {
                    setUsers(data.users);
                    if (data.remainingUsers > 0) {
                        setShowMore(true); 
                    }
                }
            } catch (error) {
                errorMessage(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser.user.isAdmin) {
            fetchUsers();
        }
    }, [currentUser.user.isAdmin]);


    
    const handleShowMore = async () => {
        const startIndex = users.length;

        try {
            const res = await fetch(`/server/user/get-users?startIndex=${startIndex}&limit=9`);
            const data = await res.json();

            if (res.ok) {
                setUsers((prev) => [...prev, ...data.users]);
                if (data.remainingUsers <= 0) {
                    setShowMore(false); 
                }
            }
        } catch (error) {
            errorMessage(error.message);
        }
    };



    const handleDeleteUser = async () => {
        try {
            const res = await fetch(`/server/user/delete/${userIdToDelete}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (res.ok) {
                setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
                setShowModal(false);
                successMessage(data.message);
            } else {
                errorMessage(data.message);
            }
        } catch (error) {
            errorMessage(error.message);
        }
      };
    
    

    return (
        <div className='table-auto min-h-screen w-fit xl:w-11/12 m-2 xl:mx-auto overflow-x-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-yellow-400  px-8 pb-8 rounded-xl big-shadow border-2 border-yellow-400 border-solid bg-black/80 backdrop-blur-[1.5px] mt-3 mb-5'>
            <h1 className=' text-yellow-50 text-center mb-4 text-2xl bg-yellow-400 w-fit px-20 py-1 font-semibold rounded-b-lg'>Users</h1>
            {loading ? (
                <LoadingSpinner/>
            ) : (
                users.length > 0 ? (
                    <>        

                        <Table hoverable className='bg-transparent'>
                            <Table.Head className='text-black text-md font-semibold tracking-wider text-nowrap'>
                                <Table.HeadCell className='bg-yellow-50'>Date Created</Table.HeadCell>
                                <Table.HeadCell className='bg-yellow-50'>User Avatar</Table.HeadCell>
                                <Table.HeadCell className='bg-yellow-50'>First Name</Table.HeadCell>
                                <Table.HeadCell className='bg-yellow-50'>Last Name</Table.HeadCell>
                                <Table.HeadCell className='bg-yellow-50'>Email</Table.HeadCell>
                                <Table.HeadCell className='bg-yellow-50'>Admin</Table.HeadCell>
                                <Table.HeadCell className='bg-yellow-50'>
                                    <span>Delete</span>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className='divide-y'>
                                {
                                users.map((user) => (
                                    <Table.Row key={user._id} className='hover:bg-black/50 text-base rounded-none beige transition duration-300 ease-in-out transform hover:scale-105'>
                                        <Table.Cell className='raleway'>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                                        <Table.Cell>
                                                    <img 
                                                        draggable={false}
                                                        src={user.avatar}
                                                        alt={user.firstName}
                                                        className='w-12 h-12 object-cover rounded-full select-none' 
                                                    />
                                        </Table.Cell>
                                        <Table.Cell className='raleway'>
                                            {user.firstName}
                                        </Table.Cell>
                                        <Table.Cell className='raleway'>
                                            {user.lastName}
                                        </Table.Cell>
                                        <Table.Cell className='raleway'>
                                            {user.email}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {
                                                user.isAdmin ? (
                                                <FaCheck className='text-green-500' />
                                                ) : (
                                                <FaTimes className='text-red-500' />
                                                )
                                            }
                                        </Table.Cell>
                                        <Table.Cell>
                                            <span 
                                                className='text-red-500 raleway font-medium hover:underline underline-offset-2 cursor-pointer select-none'
                                                onClick={() => {
                                                    setShowModal(true);
                                                    setUserIdToDelete(user._id);
                                                }}
                                            >
                                                Delete
                                            </span>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                        {
                            showMore && (
                                <button onClick={handleShowMore} className='w-full raleway text-yellow-400 self-center text-sm py-7'>
                                    Show more
                                </button>
                            )
                        }
                        
                            <Modal
                                    show={showModal}
                                    onClose={() => setShowModal(false)}
                                    popup
                                    size='md'
                                    className='bg-black/70 backdrop-blur-sm'
                                >
                                    <Modal.Header className='bg-yellow-50 rounded-lg'/>
                                    <Modal.Body className='bg-yellow-50 rounded-lg'>
                                    <div className='text-center '>
                                        <HiOutlineExclamationCircle className='h-14 w-14 text-black/90 mb-4 mx-auto' />
                                        <h3 className='raleway mb-5 text-lg text-black/90'>
                                            Are you sure you want to delete this user?
                                        </h3>
                                        <div className='flex justify-center gap-4 '>
                                        <Button color='failure' onClick={handleDeleteUser}>
                                            Yes, I'm sure
                                        </Button>
                                        <Button color='warning' onClick={() => setShowModal(false)}>
                                            No, cancel
                                        </Button>
                                        </div>
                                    </div>
                                    </Modal.Body>
                                </Modal>
                        
                    </>
                ) : (
                    <p className='beige'>You have no users yet!</p>
                )
            )}
        
        </div>
    )
}
