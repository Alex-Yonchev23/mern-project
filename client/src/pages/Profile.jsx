import { useSelector } from "react-redux"
import { selectCurrentUser } from '../redux/user/userSlice';


export default function Profile() {
  const currentUser = useSelector(selectCurrentUser);
  const userAvatar = currentUser?.user?.avatar;
  return (
    <div className="flex justify-center ">
      <div className="flex flex-col items-center justify-center min-w-fit mt-4 p-3 bg-black/80 backdrop-blur-[1px] rounded-md shadow-2xl shadow-black border-2 border-yellow-500 border-solid w-full max-w-xl max-sm:w-3/4 md:w-3/4 lg:w-2/3 xl:w-2/5	">
        <h1 className='text-yellow-500 text-3xl font-semibold text-center my-3'>Profile</h1>

        <form>
          <img src={userAvatar} alt="Profile Picture" className="rounded-full object-cover select-none" />
        </form>
      </div>
    </div>

  )
}
