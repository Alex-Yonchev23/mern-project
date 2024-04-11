import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { errorMessage, successMessage, infoMessage } from './ToastMessage';
import add_image from '../images/add-image.png';
import { useSelector } from 'react-redux';
import { selectCurrentUser, setLoading } from '../redux/user/userSlice';

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate,useParams } from 'react-router-dom';

export default function EditPost() {
  const currentUser = useSelector(selectCurrentUser);
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [formData, setFormData] = useState({title: '',});
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { postId } = useParams();
  console.log(postId);

  useEffect(() => {
    try {
        const fetchPosts = async () => {
            const res = await fetch(`/server/post/get-posts?postId=${postId}`);
            const data = await res.json();

            if (!res.ok) {
                errorMessage(data.message);
                return;
            }
            if (data.posts && data.posts.length > 0) {
                setFormData(data.posts[0]);
            } else {
                errorMessage('Post data not found');
            }
        };
        fetchPosts();
    } catch (error) {
        console.log(error.message);
    }
}, [postId]);




  const handleUploadImage = async () => {
    try {
      if (!file) {
        infoMessage('Please select an image');
        return;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          errorMessage(error.message);
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      errorMessage(error.message);
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/server/post/edit-post/${formData._id}/${currentUser.user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        errorMessage(data.message);
        return;
      }
      if (res.ok) {
        successMessage(data.message);
        navigate(`/post/${data.post.slug}`);
      }
    } catch (error) {
      errorMessage('Something went wrong');
      console.log(error);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  

  return (
    <div className='grid items-center min-h-screen w-full' >
      <div className='p-8 mx-8 sm:mx-auto lg:w-8/12 rounded-md big-shadow border-2 border-yellow-400 border-solid bg-black/80 backdrop-blur-[1.5px] mt-10 mb-20 max-md:mx-3'>
        <h1 className='beige text-2xl md:text-3xl text-center mt-2 mb-8'>Edit Blogpost</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit} noValidate>
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <input
              type="text"
              id="title"
              defaultValue={formData.title}
              placeholder="Title"
              maxLength="100"
              className="focus:border-yellow-400 focus:ring-transparent focus:ring-none bg-transparent border-1 border-solid border-yellow-50 beige rounded-lg py-2 px-3 raleway w-full sm:w-3/4"
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <select
              className='bg-transparent beige focus:ring-0 border rounded-md hover:opacity-60 transition-all duration-300'
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              value={formData.category}
            >
              <option value='uncategorized' disabled hidden className='raleway bg-black'>Select a category</option>
              <option value='metal sculptures' className='raleway bg-yellow-50 text-black'>Metal Sculptures</option>
              <option value='welding' className='raleway bg-yellow-50 text-black'>Welding</option>
              <option value='services' className='raleway bg-yellow-50 text-black'>Services</option>
            </select>
          </div>
          <div className='flex gap-4 items-center justify-between border-2 rounded-md border-yellow-400 border-dashed p-3'>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              className='hidden'
              onChange={(e) => setFile(e.target.files[0])}
            />
            <img
              src={add_image}
              alt='Add Image'
              className='cursor-pointer active:scale-[0.95]	transition-all duration-75 select-none hover:opacity-80 '
              onClick={handleImageClick}
              draggable={false}
            />
            <button
              type='button'
              className='beige main-btn border border-solid border-yellow-100 rounded-md px-3 py-2 '
              onClick={handleUploadImage}
              disabled={imageUploadProgress}
            >
              {imageUploadProgress ? (
                <div className='w-16 h-16 '>
                  <CircularProgressbar
                    value={imageUploadProgress}
                    text={`${imageUploadProgress || 0}%`}
                  />
                </div>
              ) : (
                'Upload Image'
              )}
            </button>
          </div>
            {formData.image && (
              <img
                src={formData.image}
                alt='upload'
                className='w-fit mx-auto max-h-96 object-contain rounded-md'
              />
            )}

          <ReactQuill
            placeholder='Type something...'
            className='h-48 mb-12 '
            onChange={
              (value) => {
                setFormData({ ...formData, content: value });
            }}
            value={formData.content || ''}
            >
            
          </ReactQuill>
          <button type="submit" className="main-btn beige border-1 border-solid border-yellow-50 rounded-md px-4 py-2 uppercase tracking-[.1rem] select-none">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
}
