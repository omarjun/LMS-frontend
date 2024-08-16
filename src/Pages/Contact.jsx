import { useState } from "react"
import HomeLayout from "../Layouts/HomeLayout"
import toast from "react-hot-toast";


function Contact() {

    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: ""
    });

    function handleInputChange(e){
        const {name, value} = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.email || !userInput.name || !userInput.message){
            toast.error("All feilds are mandatory");
            return
        }
        if(userInput.name.length <4){
            toast.error("Full name should atleast of 4 characters");
            return;
        }
        if(!userInput.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
            toast.error("Invalid email Id")
        }
    }
  return (
    <HomeLayout>
        <div className="flex items-center justify-center h-[100vh]">
            <form noValidate onSubmit={onFormSubmit}
            className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]">
                <h1 className=" text-3xl font-semibold">
                    Contact Form
                </h1>
                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="name" className="text-xl font-semibold">
                        Name
                    </label>
                    <input  className="bg-transparent border px-2 py-1 rounded-sm"
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={userInput.name}
                        onChange={handleInputChange}

                     />
                </div>
                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="email" className="text-xl font-semibold">
                        Email
                    </label>
                    <input  className="bg-transparent border px-2 py-1 rounded-sm"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={userInput.email}
                        onChange={handleInputChange}

                     />
                </div>
                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="message" className="text-xl font-semibold">
                        Message
                    </label>
                    <textarea  className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
                        
                        id="message"
                        name="message"
                        placeholder="Drop your message"
                        value={userInput.message}
                        onChange={handleInputChange}
                     />
                </div>
                <button className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">Submit</button>
            </form>
        </div>
    </HomeLayout>

  )
}

export default Contact