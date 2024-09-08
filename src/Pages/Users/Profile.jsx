import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";
import { userData } from "../../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";


function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo= useSelector((state) => state?.auth?.data);
    
    
    async function handleCancelation(){
        await dispatch(cancelCourseBundle());
        await dispatch(userData())
        toast.success("Subscrition Cancelled !!");
        navigate("/");
    }
    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center">
                <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    
                    
                    <img 
                        src={userInfo?.avatar} 
                        className="w-40 m-auto rounded-full border-black" 
                    />
                    <h3 className="text-xl font-semibold text-center capitalize">
                        {userInfo?.fullName}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                        <p>Email:</p><p>{userInfo?.email}</p>
                        <p>Role:</p><p>{userInfo?.role}</p>
                        <p>Subscription: </p>
                        {<p>{userInfo?.subscription?.status === "active" || userInfo?.role === "Admin" ? "Active" :"Inactive"}</p>}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <Link to="/changepassword" 
                        className="w-1/2 bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 cursor-pointer rounded-sm font-semibold py-2 text-white text-center">
                            Change Password
                        </Link>
                        <Link to="/users/editProfile" 
                        className="w-1/2 bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 cursor-pointer rounded-sm font-semibold py-2 text-white text-center ease-in-out">
                            Edit Profile
                        </Link>
                    </div>
                    {userInfo?.subscription?.status === "active" && (
                        <button onClick={handleCancelation} className="w-full bg-red-600 hover:bg-red-500 transition-all duration-300 cursor-pointer rounded-md  font-semibold text-white py-2">
                            Cancel Subscription
                        </button>
                    )}
                </div>
                
            </div>
        </HomeLayout>
    );
}

export default Profile;
