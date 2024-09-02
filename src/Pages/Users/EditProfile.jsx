import { useDispatch, useSelector } from 'react-redux'
import HomeLayout from '../../Layouts/HomeLayout'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { updateProfile } from '../../Redux/Slices/AuthSlice';
import { userData } from '../../Redux/Slices/AuthSlice';
import { BsPersonCircle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';

function EditProfile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [data, setData] = useState({
        previewImage: "",
        fullname: "",
        avatar: undefined,
        userid: useSelector((state) => state?.auth?.data?._id)
    });

    function handleImageUpload(e){
        e.preventDefault()
        const uploadedImage = e.target.files[0]
        if(uploadedImage){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function (){
                setData({
                    ...data,
                    previewImage: this.result,
                    avatar: uploadedImage
                })
            })
        }
    }

    function handleInputChange(e){
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();

        if(!data.fullname && !data.avatar){
            toast.error("Please provide either avatar or fullName to update");
            return;
        }
        if(data.fullname.length <4){
            toast.error("The name should be more than 4 characters");
            return;
        }

        const formData = new FormData();
        formData.append("fullname", data.fullname);
        formData.append("avatar", data.avatar);

        await dispatch(updateProfile([data.userid, formData]));

         await dispatch(userData());

        navigate("/users/profile")

    }
  return (
    <HomeLayout>
        <div className='flex items-center justify-center h-[100vh] '>
            <form 
                noValidate
                onSubmit={onFormSubmit}
                className='flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rems] shadow-[0_0_10px_black]'
            >
                <h1 className='text-center text-2xl font-semibold'>Edit Profile</h1>
                <label htmlFor="image_uploads" className='cursor-pointer'>
                    {data?.previewImage ? (
                        <img 
                        src={data.previewImage}
                        className='w-28 h-28 rounded-full m-auto'/>
                    ): (<BsPersonCircle className = "w-28 h-28 rounded-full m-auto"/>)}
                </label>
                <input 
                    type="file"
                    onChange={handleImageUpload} 
                    className="hidden"
                    id='image_uploads'
                    name='image_uploads' 
                    accept='.jpg, .jpeg, .svg, .png'
                    />
                    <div className='flex flex-col gap-1'>
                        <label 
                        htmlFor="fullname" className='text-lg font-semibold'>FullName</label>
                        <input 
                            required
                            type="text"
                            name='fullname'
                            id='fullname'
                            onChange={handleInputChange}
                            className='transparent px-1 py-2 border'
                            value={data.fullname}
                            placeholder='Enter Your FullName'
                        />
                    </div>
                    <button className='w-full bg- bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 text-lg rounded-md cursor-pointer py-2' type='submit'>
                        Update Profile
                    </button>
                    <Link 
                        to="/users/profile"
                        className=''>

                            <p className='link text-accent cursor-pointer flex items-center justify-center w-full gap-2'> <AiOutlineArrowLeft/> Go Back to Profile</p>
                        </Link>
            </form>
        </div>
    </HomeLayout>
  )
}

export default EditProfile
