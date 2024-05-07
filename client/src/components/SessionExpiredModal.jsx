import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { infoMessage } from './ToastMessage';
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

const SessionExpiredModal = ({ isOpen, onClose }) => {
    const [showModal, setShowModal] = useState(isOpen);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuthStatus = async () => {
            try {
                const res = await fetch('/server/auth/auth-check');
                const data = await res.json();
                
                if (res.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    setErrorMessage(data.message);
                    setShowModal(true);
                }
            } catch (error) {
                console.error('Error checking authentication status:', error);
            }
        };

        fetchAuthStatus();
    }, []);

    const handleCheckAuth = () => {
        if (isAuthenticated) {
            infoMessage("User is authenticated. Proceed with action...");
        } else {
            navigate('/sign-up');
        }
        setShowModal(false);
    };

    return (
        <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            popup
            size='md'
            className='bg-black/70 backdrop-blur-sm'
        >
            <Modal.Header className='bg-yellow-50 rounded-lg' />
            <Modal.Body className='bg-yellow-50 rounded-lg'>
                <div className='text-center '>
                    <HiOutlineExclamationCircle className='h-14 w-14 text-black/90 mb-4 mx-auto' />
                    <h3 className='raleway mb-5 text-lg text-black/90'>
                        {errorMessage}
                    </h3>
                    <div className='flex justify-center gap-2 flex-col'>
                        <Button color='warning' onClick={handleCheckAuth}>
                            <p className='mr-2'>Go to login page</p> <GoArrowRight />
                        </Button>
                        <Button color='failure' onClick={() => setShowModal(false)}>
                            Continue without registration
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default SessionExpiredModal;
