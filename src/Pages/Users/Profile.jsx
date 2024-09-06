import { useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";

function Profile() {
    const userData = useSelector((state) => state?.auth?.data);
    
    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center">
                <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    
                    
                    <img 
                        src={userData?.avatar} 
                        className="w-40 m-auto rounded-full border-black" 
                    />
                    <h3 className="text-xl font-semibold text-center capitalize">
                        {userData?.fullName}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                        <p>Email:</p><p>{userData?.email}</p>
                        <p>Role:</p><p>{userData?.role}</p>
                        <p>Subscription: </p>
                        {<p>{userData?.subscription?.status === "active" || userData?.role === "Admin" ? "Active" :"Inactive"}</p>}
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
                    {userData?.subscription?.status !== "active" && (
                        <button className="w-full bg-red-600 hover:bg-red-500 transition-all duration-300 cursor-pointer rounded-md  font-semibold text-white py-2">
                            Cancel Subscription
                        </button>
                    )}
                </div>
                
            </div>
        </HomeLayout>
    );
}

export default Profile;
