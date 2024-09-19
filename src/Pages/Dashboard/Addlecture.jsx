import { useLocation, useNavigate } from "react-router-dom"
import HomeLayout from "../../Layouts/HomeLayout"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";

function Addlecture() {
    const courseDetails = useLocation().state;
    // console.log(courseDetails);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        id: courseDetails._id,
        lecture: undefined,
        title: "",
        videoSrc: "",
    })

    function handleInputChange (e){
        const {name, value} = e.target;
        setUserInput({
            ...userInput,
            [name] : value
        })
    }

    function handleVideoUpload(e){
        const video = e.target.files[0];
        const source = window.URL.createObjectURL(video);

        console.log(source);
        
        setUserInput({
            ...userInput,
            lecture: video,
            videoSrc: source
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.lecture || !userInput.title){
            toast.error("All feilds are mandatory");
            return;
        }

        const response = await dispatch(addCourseLecture(userInput));
        if(response?.payload?.success){
            navigate(-1);
            setUserInput({
                id: courseDetails._id,
                lecture: undefined,
                title: "",
                videoSrc: "",
            });
            
        }
    }

    useEffect(()=> {
        if(!courseDetails){
            navigate("/courses");
        }
    },[])
  return (
    <HomeLayout>
        <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-16">
            <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
                    <header className="flex items-center justify-center relative">
                        <button className="absolute left-2 text-xl text-green-500" onClick={() =>navigate(-1)}>
                            <AiOutlineArrowLeft/>
                        </button>
                        <h1 className="text-xl text-yellow-500 font-semibold">
                            Add New Lecture
                        </h1>
                    </header>
                    <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
                        <input 
                            type="text"
                            name="title"
                            placeholder="Enter the title of the lecture"
                            onChange={handleInputChange}
                            className="bg-transparent px-3 py-1 border rounded"
                            value={userInput.title}

                         />
                        {userInput.videoSrc ? (
                            <video 
                                src={userInput.videoSrc}
                                muted
                                controls
                                controlsList="nodownload nofullscreen"
                                disablePictureInPicture
                                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                                ></video>

                        ) : (
                            <div className="h-48 border flex items-center justify-center cursor-pointer">
                                <label htmlFor="lecture">Choose Your video</label>
                                <input type="file" className="hidden" id="lecture" name="lecture" onChange={handleVideoUpload}
                                accept="video/mp4 video/x-mp4 video/*"/>
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary py-1 font-semibold text-lg">
                            Add new Lecture
                        </button>
                    </form>
            </div>
        </div>
    </HomeLayout>
      )
}

export default Addlecture