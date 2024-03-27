/*import React from 'react'
import { TextInput,Select, FileInput } from 'flowbite-react'

export default function CreateBlogpost() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen rounded-md shadow-2xl shadow-black border-2 border-yellow-400 border-solid  bg-black/80 backdrop-blur-[1.5px] '>
        <h1 className='beige text-center my-7 font-semibold fs-4'>Create a Blogpost</h1>
        <form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput type='text' placeholder='Title' required id="title"
                 className='flex-1'/>
                 <Select >
                    <option value="uncategorized" className='raleway'>Select a category</option>
                    <option value="welding" className='raleway'>Welding</option>
                    <option value="metal sculptures" className='raleway'>Metal Scultures</option>
                    <option value="services" className='raleway'>Services</option>
                 </Select>
                 <div className='flex gap-4 justify-between items-center border-4 border--teal-500 border-dotted p-3'>
                    <FileInput type='button' accept='image/*'></FileInput>
                    <button type="button" className="beige main-btn border-1 border-solid border-yellow-100 rounded-md px-2 py-2 uppercase tracking-[.1rem] select-none">Upload Image</button>
                 </div>
            </div>
        </form>
    </div>
  )
}
*/
import React, { useState } from 'react';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
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
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/server/user/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className='grid items-center min-h-screen'>
        <div className='p-8 mx-8 sm:mx-auto lg:w-8/12 rounded-md big-shadow border-2 border-yellow-400 border-solid  bg-black/80 backdrop-blur-[1.5px] mt-10 mb-20'>
        <h1 className='beige text-2xl md:text-3xl text-center mb-6'>Create Blogpost</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit} noValidate>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <input
                type="text"
                id="title"
                value={formData.title}
                placeholder="Title"
                maxLength="30"
                className="focus:border-yellow-400 focus:ring-transparent focus:ring-none bg-transparent border-1 border-solid border-yellow-50 beige rounded-lg py-2 px-3 raleway w-full sm:w-3/4"
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />

            <Select
                onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
                }
            >
                <option value='uncategorized' className='raleway'>Select a category</option>
                <option value='Metal Sculptures' className='raleway'>Metal Sculptures</option>
                <option value='Welding' className='raleway'>Welding</option>
                <option value='Services' className='raleway'>Services</option>
            </Select>
            </div>
            <div className='flex gap-4 items-center justify-between border-2 rounded-md border-yellow-400 border-dashed p-3'>
            <FileInput
                type='file'
                accept='image/*'
                onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
                type='button'
                size='sm'
                outline
                onClick={handleUploadImage}
                disabled={imageUploadProgress}
            >
                {imageUploadProgress ? (
                <div className='w-16 h-16'>
                    <CircularProgressbar
                    value={imageUploadProgress}
                    text={`${imageUploadProgress || 0}%`}
                    />
                </div>
                ) : (
                'Upload Image'
                )}
            </Button>
            </div>
            {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
            {formData.image && (
            <img
                src={formData.image}
                alt='upload'
                className='w-full h-96 object-cover rounded-md'
            />
            )}

                <ReactQuill 
                    placeholder='Type something...'
                    className='h-48 mb-12'
                    onChange={(value) => {
                        setFormData({ ...formData, content: value });
                    }}>
                </ReactQuill>
            <button type="submit" className="main-btn beige border-1 border-solid  border-yellow-50  rounded-md px-4 py-2 uppercase tracking-[.1rem] select-none">
              Publish
            </button>
        </form>
        </div>
    </div>
  );
}
