import { useSelector } from "react-redux"
import { selectCurrentUser } from '../redux/user/userSlice';


export default function Profile() {
  const currentUser = useSelector(selectCurrentUser);
  const userAvatar = currentUser?.user?.avatar;
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center mt-5 p-3 bg-black/25 backdrop-blur-[2px] w-1/3 rounded-md">
        <h1 className='text-yellow-500 text-3xl font-semibold text-center my-3'>Profile</h1>

        <form>
          <img src={userAvatar} alt="Profile Picture" className="rounded-full object-cover"/>
        </form>
      </div>
    </div>
  )
}
