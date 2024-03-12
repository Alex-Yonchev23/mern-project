import { useSelector } from "react-redux";
import { selectCurrentUser } from '../redux/user/userSlice';
import React,{ useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from "firebase/storage";
import { app } from "../firebase";
import { errorMessage, successMessage } from '../components/message/ToastMessage';
import { useDispatch } from "react-redux";
import { updateUserError, updateUserStart ,updateUserSuccess} from "../redux/user/userSlice";


export default function Profile() {
  const currentUser = useSelector(selectCurrentUser);
  const userAvatar = currentUser?.user?.avatar;
  const [ image , setImage ] = useState(undefined);
  const [ imagePercentage , setImagePercentage ] = useState(0);
  const [formData, setFormData] = useState({});
  const [imgError, setImgError] = useState(null);
  const dispatch = useDispatch();

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

      if (data.success === false){
        dispatch(updateUserError(data));
        return;
      }
      dispatch(updateUserSuccess(data));

    } catch (error) {
      dispatch(updateUserError(error));
    }
  };
  

  
  console.log(formData);
  console.log(currentUser);
  
  return (
    <div className="grid place-items-center h-screen"  style={{ height: `calc(100vh - ${120}px)`}}>
      <div className="flex flex-col gap-3 justify-center mt-4 p-7 bg-black/80 backdrop-blur-[1.5px] rounded-md shadow-2xl shadow-black border-2 border-yellow-500 border-solid w-full max-w-xl max-sm:w-3/4 md:w-3/4 lg:w-2/3 xl:w-2/6	big-shadow">
      <h1 className='beige text-2xl md:text-3xl font-normal text-center '>
        Welcome <span className="raleway font-thin">{currentUser?.user?.firstName}</span>
      </h1>        
        <div className="flex items-center justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-2/3">
            <input 
              type="file" 
              ref={fileRef} 
              hidden 
              accept="image/*" 
              onChange={(e) => setImage(e.target.files[0])}/>

            <img 
              src={ formData.avatar || userAvatar } 
              alt="Avatar"  
              title="Change your avatar" 
              className="rounded-full object-cover select-none self-center cursor-pointer hover:opacity-60 transition-all duration-200 h-24 w-24" 
              onClick={() => fileRef.current.click()}
            />
            
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


            <p className="beige">Details:</p>
            
            <input
              type="text"
              id="firstName"
              defaultValue={currentUser.user.firstName}
              placeholder="First Name"
              className="bg-transparent border-1 border-solid beige rounded-lg py-2 px-3 raleway"
              onChange={handleChange}
            />

            <input
              type="text"
              id="lastName"
              defaultValue={currentUser.user.lastName}
              placeholder="Last Name"
              className="bg-transparent border-1 border-solid beige rounded-lg py-2 px-3 raleway"
              onChange={handleChange}
            />

            <input
              type="email"
              id="email"
              defaultValue={currentUser.user.email}
              disabled
              placeholder="Email"
              className="bg-transparent border-1 border-solid beige rounded-lg py-2 px-3 raleway"
              onChange={handleChange}
            />

            <input
              type="password"
              id="password"
              placeholder="New Password"
              className="bg-transparent tracking-[.01rem] border-1 border-solid beige rounded-lg py-2 px-3 raleway"
              onChange={handleChange}
            />
            <button type="submit" className="beige main-btn border-1 border-solid border-yellow-500 rounded-md px-4 py-2 uppercase tracking-[.1rem] select-none">Update</button>
          </form>
        </div>

        <div className="flex justify-between mt-3"> 
          <span className="beige cursor-pointer raleway">Delete account</span>
          <span className="beige cursor-pointer raleway">Log out</span>
        </div>
      </div>
    </div>

  )
}
