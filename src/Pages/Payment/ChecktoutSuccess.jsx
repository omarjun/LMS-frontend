import { AiFillCheckCircle } from "react-icons/ai"
import HomeLayout from "../../Layouts/HomeLayout"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { userData } from "../../Redux/Slices/AuthSlice";


async function ChecktoutSuccess() {

    const dispatch = useDispatch();
    await dispatch(userData());

  return (
    <HomeLayout>
        <div className="min-h-[90vh] flex justify-center items-center text-white">
            <div className=" w-80 h-[26rem] flex flex-col items-center justify-center shadow-[0_0_10px_black] rounded-lg relative">
                <h1 className="bg-green-500 absolute top-0 w-full py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg text-center">
                    Payment Successfull
                </h1>
                <div className="px-4 flex flex-col items-center justify-center space-y-2">
                    <div className="text-center space-y-2">
                        <h2 className="text-lg font-semibold">
                            Welcome to the pro bundle
                        </h2>
                        <p className="text-left">
                            Now, You can enjoy all the courses.
                        </p>
                    </div>
                    <AiFillCheckCircle className="text-green-500 text-5xl"/>
                </div>
                <Link to="/" className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full py-2 font-semibold text-xl text-center rounded-bl-lg rounded-br-lg">
                    <button>Go to Dashboard</button>
                </Link>
            </div>
        </div>
    </HomeLayout>
  )
}

export default ChecktoutSuccess