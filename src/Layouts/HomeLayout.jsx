import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Footer from "../Components/Footer";
import { logout } from "../Redux/Slices/AuthSlice";

function HomeLayout( {children} ){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const role = useSelector((state) => state?.auth?.role);

    function changeWidth(){
        const drawerSide = document.getElementsByClassName("drawer-side")
        drawerSide[0].style.width = 'auto';
    }

    function hideDrawer(){
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;

        const drawerSide = document.getElementsByClassName("drawer-side")
        drawerSide[0].style.width = 0;
    }

    async function handleLogout(e){
        e.preventDefault();

        const res = await dispatch(logout());
        if(res?.payload?.success)
            navigate("/")
    }

    return(
        <div className="min-h-[90vh]">
            <div className="drawer absolute left-0 z-50 w-fit">
                <input className="drawer-toggle" id="my-drawer" type="checkbox" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer relative">
                        <FiMenu
                            onClick={changeWidth}
                            size={"32px"}
                            className="font-bold text-white m-4"
                            />
                    </label>
                </div>
                <div className="drawer-side w-0">
                    <label htmlFor="my-drawer" className="drawer-overlay">
                    </label>
                    <ul className="menu p-4 w-48 sm:w-80 bg-base-100 text-base-content relative">
                        <li className="w-fit absolute right-2 z-50">
                            <button onClick={hideDrawer}>
                                <AiFillCloseCircle size={24}/>
                            </button>
                        </li>

                        <li>
                            <Link to="/">Home</Link>
                        </li>

                       {isLoggedIn && role === 'Admin' && (
                        <li>
                            <Link to="/admin/dashboard">Admin DashBoard</Link>
                        </li>
                       )}

                        <li>
                            <Link to="/courses">All Courses</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact Us</Link>
                        </li>
                        <li>
                            <Link to="/about">About Us</Link>
                        </li>

                       {!isLoggedIn &&(
                        <li className="w-full mt-auto">
                            <div className="flex space-x-2">
                                <Link to="/login" className="btn btn-primary px-4 py-2 font-semibold rounded-md flex-1 text-center">
                                    Login
                                </Link>
                                <Link to="/signup" className="btn btn-secondary px-4 py-2 font-semibold rounded-md flex-1 text-center">
                                    SignUp
                                </Link>
                            </div>
                        </li>
                    
                       )}

                    {isLoggedIn &&(
                        <li className="w-full mt-auto">
                            <div className="flex space-x-2">
                                <Link to="/profile" className="btn btn-primary px-4 py-2 font-semibold rounded-md flex-1 text-center">
                                    Profile
                                </Link>
                                <Link onClick={handleLogout} className="btn btn-secondary px-4 py-2 font-semibold rounded-md flex-1 text-center">
                                    Logout
                                </Link>
                            </div>
                        </li>
                    
                    )}


                    </ul>
                </div>

            </div>
        {children}
        <Footer/>
        </div>
    )
}

export default HomeLayout