import { useLocation, useNavigate } from "react-router-dom"
import HomeLayout from "../../Layouts/HomeLayout" 
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteLectureFromCourse, getAllLectures } from "../../Redux/Slices/LectureSlice";
function DisplayLecture() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {state} = useLocation();
    const {lectures} = useSelector((state) => state.lecture);
    const {role} = useSelector((state) => state.auth);

    const [currentVideo, setCurrentVideo] = useState(0);

    useEffect(() => {
        console.log(lectures);
        
        if(!state){
            navigate("/course")
        }
        dispatch(getAllLectures(state._id));
    }, []);

    async function onLectureDelete(courseId, lectureId){
        // console.log(courseId, lectureId);
        await dispatch(deleteLectureFromCourse({courseId, lectureId}));
        await dispatch(getAllLectures(courseId));
        
    }
  return (
    <HomeLayout>
        <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
            <div className="text-center text-2xl font-semibold text-yellow-500">
                Course Name: {state?.title}
            </div>
            <div className=" flex justify-center gap-10 w-full">
                {/*left section for displaying videp and displaying course details to admin*/}


               {lectures && lectures.length > 0 && <div className=" space-y-5 w-[28 rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                    <video src={lectures && lectures[currentVideo]?.lecture?.thumbnail}
                        className=" object-fill rounded-tl-lg rounded-tr-lg w-full"
                        controls disablePictureInPicture muted controlsList="nodownload">                    
                    </video>
                    <div>
                        <h1>
                            <span className=" text-yellow-500"> Title: {" "} </span>
                                {lectures && lectures[currentVideo]?.title}                            
                        </h1>
                        <p>
                            <span className=" text-yellow-500 line-clamp-4">Description: {" "}</span>
                            {lectures && lectures[currentVideo]?.description}                       
                        </p>
                    </div>
               </div>}


               {/* rihght section for displaying list of lectures*/}
               <ul className=" w-[28 rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
                    <li className=" font-semibold text-xl text-yellow-500 items-center justify-between">
                        <p>Lectures List</p>
                        {role === "Admin" && (
                            <button onClick ={() => navigate("course/addlecture", {state: {...state}})} className="btn-primary px-2 py-1 rounded-md font-semibold text-sm">
                                Add new lectures
                            </button>
                        )}
                    </li>
                    {lectures &&
                        lectures.map((lecture, idx) =>{
                            return (
                                <li className=" space-y-2" key={lecture._id}>
                                    <p className=" cursor-pointer" onClick={() => setCurrentVideo(idx)}>
                                        <span>
                                            {" "} Lecture {idx + 1} : {" "}
                                        </span>
                                        {lecture.title}
                                    </p>
                                    {role === "Admin" && (
                                        <button onClick={onLectureDelete(state?._id, lecture?._id)} className=" btn-accent py-2 px-1 rounded font-semibold text-sm">Delete Lecture</button>
                                    )}
                                </li>
                            )
                        })}
               </ul>
            </div>
        </div>
    </HomeLayout>
  )
}

export default DisplayLecture