import { useSelector } from "react-redux"
import { selectCurrentUser } from '../redux/user/userSlice';

export default function Profile() {
  const currentUser = useSelector(selectCurrentUser);
  const userAvatar = currentUser?.user?.avatar;
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-3 justify-center mt-4 p-7 bg-black/80 backdrop-blur-[1.5px] rounded-md shadow-2xl shadow-black border-2 border-yellow-500 border-solid w-full max-w-xl max-sm:w-3/4 md:w-3/4 lg:w-2/3 xl:w-2/6	big-shadow">
        <h1 className='text-yellow-500 text-3xl font-semibold text-center '>Profile</h1>
        
        <div className="flex items-center justify-center">
          <form className="flex flex-col gap-3 w-2/3">
            <img src={userAvatar} alt="Profile Picture"  title="Change your avatar" className="rounded-full object-cover select-none self-center cursor-pointer hover:opacity-60 transition-all duration-200"/>

            <input type="text" id="firstName" defaultValue={currentUser.user.firstName} placeholder="First Name" className="bg-transparent border-1 border-solid beige rounded-lg py-2 px-3 raleway"/>
            <input type="text" id="lastName" defaultValue={currentUser.user.lastName} placeholder="Last Name" className="bg-transparent border-1 border-solid beige rounded-lg py-2 px-3 raleway"/>
            <input type="email" id="email" defaultValue={currentUser.user.email} disabled placeholder="Email" className="bg-transparent border-1 border-solid beige rounded-lg py-2 px-3 raleway"/>
            <input type="password" id="password" placeholder="Password" className="bg-transparent border-1 border-solid beige rounded-lg py-2 px-3 raleway"/>
            <button className="beige border-1 border-solid border-yellow-500 rounded-md px-4 py-2 uppercase tracking-[.1rem] font-bold select-none">Update</button>
          </form>
        </div>

        <div className="flex justify-between mt-3"> 
          <span className="beige cursor-pointer">Delete account</span>
          <span className="beige cursor-pointer">Log out</span>
        </div>
      </div>
    </div>

  )
}
