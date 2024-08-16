import React from 'react'
import { useNavigate } from 'react-router-dom'

function CourseCard({data}) {
     
    const navigate = useNavigate();
    return (
        <div 
        onClick={() => navigate("/courses/description/")}
        className='text-white w- [22 rem] h-[430px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-700'>
            <div className='overflow-hidden'>
                <img className="h-48 w-full rounded-tl-lg rounded-tr-lg group-hover:scale=[1,2] transition-all ease-in-out duration-300"
                src = {data.thumbnail} alt="course thumbnail" />
                <div className="space-y-1 text-white text-center">
                    <h2 className='text-xl font-bold text-yellow-500 line-clamp-2'>
                        {data?.title}
                    </h2>
                    <p className='line-clamp-2'>
                        {data?.description}
                    </p>
                    <p className='font-semibold'>
                        <span className='text-yellow-500 font-bold'>Category :</span>
                        {data?.category}
                    </p>
                    <p className='font-semibold'>
                        <span className='text-yellow-500 font-bold'>Total lectures :</span>
                        {data?.lecturesCount}
                    </p>
                    <p className='font-semibold'>
                        <span className='text-yellow-500 font-bold'>Instructor :</span>
                        {data?.owner}
                    </p>
                </div>
            </div>
        </div>
  )
}

export default CourseCard