import { useNavigate } from "react-router-dom"
function NotFoundPage() {

    const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2233]">
        <h1 className="text-9xl font-extrabold tracking-widest text-white">
            404
        </h1>
        <div className="bg-black text-white text-sm rounded rotate-12 absolute">
            Page Not Found...
        </div>
        <button className="mt-5">
            <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring">
                <span onClick={() => (navigate(-1))} className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                        Go Back
                </span>
            </a>
            
        </button>
    </div>
  )
}

export default NotFoundPage