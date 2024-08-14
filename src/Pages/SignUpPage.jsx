import { useState } from "react"
import HomeLayout from "../Layouts/HomeLayout"
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { createAccount } from "../Redux/Slices/AuthSlice";

function SignUpPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState("");

    const [signUpData, setSignUpData] = useState({
        email: "",
        fullName: "",
        password: "",
        avatar: ""
    });

    function getImage(e){
        e.preventDefault();
        const uploadedImage = e.target.files[0];

        if(uploadedImage){
            setSignUpData({
                ...signUpData,
                avatar: uploadedImage
            });

            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load",function(){
                setPreviewImage(this.result);
            })
        }
    }

    function handleUserInput(e){
        const {name, value} = e.target;
        setSignUpData({
            ...signUpData,
            [name]: value
        })
    }

    async function  createNewAccount(e){
        e.preventDefault();
        if(!signUpData.email || !signUpData.password || !signUpData.fullName || !signUpData.avatar){
            toast.error("Please fill all the details");
            return;
    }
    if(signUpData.fullName.length <4){
        toast.error("Full name should atleast of 4 characters");
        return;
    }
    if(!signUpData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
        toast.error("Invalid email Id")
    }
    if(!signUpData.password.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/)){
        toast.error("Password must be of 8 characters,contain an uppercase letter, number, and any special character")
    }

    const formdata= new FormData();
    formdata.append("fullName", signUpData.fullName);
    formdata.append("password", signUpData.password);
    formdata.append("email", signUpData.email);
    formdata.append("avatar", signUpData.avatar);

   console.log( formdata.get("fullName"));
       
    // dispatch createe account action
    const response = await dispatch(createAccount(formdata));
    if(response?.payload?.success){

        navigate("/");}

    setSignUpData({
        email: "",
        fullName: "",
        password: "",
        avatar: ""
    });

    setPreviewImage("");


}
  return (
    <HomeLayout>
        <div className="flex items-center justify-center h-[100vh]">
            <form noValidate onSubmit={createNewAccount} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]" action="">
                <h1 className="text-center text-2xl font-bold">Registration Page</h1>
                <label htmlFor="image_uploads" className="cursor-pointer">
                    {previewImage ? (
                        <img className="w-24 h-24 rounded-full m-auto" src={previewImage} />
                    ):(<BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>)}
                </label>
                <input 
                    onChange={getImage}
                    className="hidden"
                    type="file" 
                    name="image_uploads"
                    id="image_uploads"
                    accept=".jpeg, .jpg, .png, .svg"
                />
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-semibold"> Email </label>
                    <input 
                        type="email"
                        required
                        name="email"
                        id="email"
                        placeholder="Enter Your Email..."
                        className="bg-transparent px-2 py-1 border"
                        onChange={handleUserInput}
                        value={signUpData.email}
                    />
                    
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="font-semibold"> Password </label>
                    <input 
                        type="password"
                        required
                        name="password"
                        id="password"
                        placeholder="Create Your Password..."
                        className="bg-transparent px-2 py-1 border"
                        onChange={handleUserInput}
                        value={signUpData.password}
                    />
                   
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="Full name" className="font-semibold"> Full Name </label>
                    <input 
                        type="text"
                        required
                        name="fullName"
                        id="fullName"
                        placeholder="Enter Your Full Name"
                        className="bg-transparent px-2 py-1 border"
                        onChange={handleUserInput}
                        value={signUpData.fullName}
                    />
                </div>

                <button  type="submit" className="mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg">
                    Create Account
                </button>
                <p className="text-center">
                    Already have an account ? <Link to="/login" className="link text-accent cursor-pointer">
                    Login</Link>
                </p>
            </form>
        </div>
    </HomeLayout>
  )

}
export default SignUpPage