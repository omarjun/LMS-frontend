import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    description: "",
    thumbnail: null,
    previewImage: ""
  });

  function handleImageUpload(e) {
    const uploadedImage = e.target.files[0];
    
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      
      fileReader.addEventListener("load", () => {
        setUserInput({
          ...userInput,
          previewImage: fileReader.result,
          thumbnail: uploadedImage
        });
      });
    }
  }

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.title || !userInput.description || !userInput.category || !userInput.thumbnail) {
      toast.error("All fields are mandatory");
      return;
    }

    const response = await dispatch(createNewCourse(userInput));
        
    if (response?.payload?.success) {
      setUserInput({
        title: "",
        category: "",
        description: "",
        thumbnail: null,
        previewImage: ""
      });
      navigate("/courses");
    } else {
      toast.error("Failed to create the course");
    }
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form 
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative">
          
          <Link to="/" className="absolute top-8 text-2xl link text-accent cursor-pointer">
            <AiOutlineArrowLeft />
          </Link>
          
          <h1 className="text-center text-2xl font-bold">Create new Course</h1>

          <main className="grid grid-cols-2 gap-x-10">
            <div className="gap-y-6">
              <div>
                <label htmlFor="image_uploads" className="cursor-pointer" title="Upload Course Thumbnail">
                  {userInput.previewImage ? (
                    <img 
                      className="w-full h-44 m-auto border"
                      src={userInput.previewImage}
                      alt="Course Thumbnail Preview"
                    />
                  ) : (
                    <div className="w-full h-44 m-auto flex items-center justify-center border rounded-md">
                      <h1 className="font-bold text-lg">Upload your course thumbnail</h1>
                    </div>
                  )}
                </label>

                <input 
                  type="file"
                  className="hidden"
                  id="image_uploads"
                  accept=".jpg, .jpeg, .png"
                  name="image_uploads"
                  onChange={handleImageUpload}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="title" className="text-lg font-semibold">Course Title</label>
                <input 
                  type="text"
                  required
                  name="title"
                  title="title"
                  placeholder="Enter your Course title"
                  className="bg-transparent px-2 py-1 border rounded-md"
                  value={userInput.title}
                  onChange={handleUserInput} 
                /> 
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <label htmlFor="category" className="text-lg font-semibold">Category</label>
                <input 
                  type="text"
                  required
                  name="category"
                  title="category"
                  placeholder="Enter your Course category"
                  className="bg-transparent px-2 py-1 border rounded-md"
                  value={userInput.category}
                  onChange={handleUserInput} 
                /> 
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="description" className="text-lg font-semibold">Description</label>
                <textarea
                  type="text"
                  required
                  name="description"
                  title="description"
                  placeholder="Enter your Course description"
                  className="bg-transparent px-2 py-1 h-24 overflow-y-scroll border rounded-md"
                  value={userInput.description}
                  onChange={handleUserInput} 
                /> 
              </div>
            </div>
          </main>
          
          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 py-2 rounded-sm font-semibold text-lg"
          >
            Create Course
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default CreateCourse;
