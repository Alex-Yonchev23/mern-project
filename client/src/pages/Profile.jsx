import { useSelector } from "react-redux";
import { selectCurrentUser, setLoading } from '../redux/user/userSlice';
import React,{ useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from "firebase/storage";
import { app } from "../firebase";
import { errorMessage, successMessage , infoMessage} from '../components/message/ToastMessage';
import { useDispatch } from "react-redux";
import { updateUserError, updateUserStart ,updateUserSuccess,deleteUserError,deleteUserStart,deleteUserSuccess ,logOut} from "../redux/user/userSlice";
import LoadingSpinner from "../components/loading/Loading";
import { Tooltip } from 'flowbite-react';
import { Link } from "react-router-dom";


export default function Profile() {
  const currentUser = useSelector(selectCurrentUser);
  const userAvatar = currentUser?.user?.avatar;
  const [ image , setImage ] = useState(undefined);
  const [ imagePercentage , setImagePercentage ] = useState(0);
  const [formData, setFormData] = useState({});
  const [imgError, setImgError] = useState(null);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);


  const fileRef = useRef(null);
  useEffect(() => {
    if(image){
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    try {
      const maxSize = 3 * 1024 * 1024; // 3MB in bytes
  
      if (image.size > maxSize) {
        throw new Error("Image size exceeds 3MB. Please choose a smaller image.");
      }
  
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setImagePercentage(progress);
        },
        (error) => {
          throw error; 
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            setFormData({ ...formData, avatar: downloadURL })
          );
        }
      );
    } catch (error) {
      setImgError(error.message);
      errorMessage(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
    
  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());

      const res = await fetch(`/server/user/update/${currentUser.user._id}` , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        successMessage(data.message);
        dispatch(updateUserSuccess(data));
      } else {
        if (data.message === 'No changes are made.') {
          infoMessage(data.message, 'info');
          dispatch(updateUserError(data));  
        } else {
          dispatch(updateUserError(data));  
          errorMessage(data.message);
        }
      }
    } catch (error) {
      dispatch(updateUserError(error));
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmDelete) {
      try {
        dispatch(deleteUserStart());

        const res = await fetch(`/server/user/delete/${currentUser.user._id}` ,{
          method: 'DELETE',
        });

        const data = await res.json();

        if (data.success === false){
          dispatch(deleteUserError(data));
          errorMessage(data.message);
        }
        dispatch(deleteUserSuccess(data));
        
      } catch (error) {
        dispatch(deleteUserError(error));
      }
    }
   };

   const handleLogOut = async () => {
    try {
      await fetch('/server/auth/log-out');
      dispatch(logOut());
    } catch (error) {
        console.log(error);
    }
}
  
  return (
    <div className="flex items-center justify-center min-h-screen"  style={{ height: `calc(100vh - ${110}px)`}}>
      <div className="flex flex-col justify-center p-7 bg-black/80 backdrop-blur-[1.5px] rounded-md border-2 border-yellow-400 border-solid w-full max-w-xl max-sm:w-3/4 md:w-3/4 lg:w-2/3 xl:w-2/6	big-shadow">
        <h1 className='beige text-2xl md:text-3xl font-normal text-center '>
          Welcome <span className="raleway font-thin break-words text-2xl md:text-3xl">{currentUser?.user?.firstName}</span>
        </h1>        

        <div className="flex items-center justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:w-9/12 w-full">
            <input 
              type="file" 
              ref={fileRef} 
              hidden 
              accept="image/*" 
              onChange={(e) => setImage(e.target.files[0])}/>

            <p className="beige raleway text-center">You can update the details.</p>

            <div className="flex justify-center">
            <Tooltip content="Change avatar" className="beige bg-transparent border border-solid border-yellow-400" placement="left"  style="yellow">
              <img 
                src={ formData.avatar || userAvatar } 
                alt="Avatar"  
                className="rounded-full object-cover select-none self-center cursor-pointer hover:opacity-60 transition-all duration-200 h-24 w-24 my-3 outline outline-2 outline-offset-4 outline-yellow-100 white-shadow" 
                onClick={() => fileRef.current.click()}
              />
            </Tooltip>
            </div>
            <p className="text-sm self-center">
              {imgError ? (
                <span className="text-red-700 raleway">Error uploading avatar</span>
              ) : imagePercentage > 0 && imagePercentage < 100 ? (
                <span className="font-medium text-slate-500 raleway">{`Uploading: ${imagePercentage} %`}</span>
              ) : imagePercentage === 100 ? (
                <span className="font-medium text-green-700 raleway">Image uploaded successfully</span>
              ) : (
                ''
              )}
            </p>


            <div className="flex flex-row gap-2">
              <input
                type="text"
                id="firstName"
                defaultValue={currentUser.user.firstName}
                placeholder="First Name"
                maxLength="30"
                className=" focus:border-yellow-400 focus:ring-transparent focus:ring-none  bg-transparent border-1 border-solid beige rounded-lg py-2 px-3 raleway w-3/4 "
                onChange={handleChange}
              />

              <input
                type="text"
                id="lastName"
                defaultValue={currentUser.user.lastName}
                placeholder="Last Name"
                maxLength="30"
                className="focus:border-yellow-400 focus:ring-transparent focus:ring-none bg-transparent border-1 border-solid beige rounded-lg py-2 px-3 raleway w-3/4"
                onChange={handleChange}
              />
            </div>

            <input
              type="email"
              id="email"
              defaultValue={currentUser.user.email}
              disabled
              title="You cannot change your email address"
              placeholder="Email"
              className="bg-transparent border-1 border-solid beige rounded-lg py-2 px-3 raleway"
            />

            <input
              type="password"
              id="password"
              placeholder="New Password"
              maxLength="128"
              className="focus:border-yellow-400 focus:ring-transparent focus:ring-none bg-transparent tracking-[.01rem] border-1 border-solid beige rounded-lg py-2 px-3 raleway"
              onChange={handleChange}
            />
            <button type="submit" className="beige main-btn border-1 border-solid border-yellow-400 rounded-md px-4 py-2 uppercase tracking-[.1rem] select-none">
              Update
            </button>
            {
              currentUser.user.isAdmin && (
                <Link to='/create-blogpost'>
                  <button type="button" className="w-full beige main-btn border-1 border-solid border-yellow-100 rounded-md px-4 py-2 uppercase tracking-[.1rem] select-none">Create BlogPost</button>
                </Link>
              )
            }
          </form>
        </div>

        <div className="flex justify-between mt-4"> 
          <span onClick={handleDeleteAccount} className="hover:text-red-700 beige cursor-pointer raleway text-nowrap transition-all">Delete account</span>
          <span onClick={handleLogOut} className="cursor-pointer beige raleway text-nowrap	hover:opacity-50 transition-all">Log out</span>
        </div>
        {loading && <LoadingSpinner/>}
      </div>
    </div>

  )
}
