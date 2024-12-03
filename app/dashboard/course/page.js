"use client"

import Button from '@/components/Button'
import { BASE_URL } from '@/constants/api'
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import {MdClose} from 'react-icons/md'
import { FaChartSimple } from "react-icons/fa6";
import { useRouter } from 'next/navigation'


const Page = () => {
    const [formData, setFormData] = useState({
        title: "",
        code: "",
        level: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const [courses, setCourses] = useState([]);
    const router = useRouter();


    // const handleChange = ()=>{
    //     setFormData((prev)=> [...formData, ])
    // }

    const createCourseHandler = async (e)=>{
        e.preventDefault()
        const {title, code, level} = formData;

        if(!title || !code || !level) return toast.warning("Field can't be empty")

        try {
            setIsLoading(true)
            const {data} = await axios.post(`${BASE_URL}/course`, {title, code, level})
            toast.success('Course Added Successfully')
            if(data.msg === "success"){

                setIsLoading(false)

                setTimeout(()=>{
                    setFormData({
                        title: "",
                        code: "",
                        levelId: ""
                    })
                }, 3000)
            }            
        } catch (error) {
            const err = error.response?.data;
            setIsLoading(false)
            return toast.error(err)
        }
    }

    useEffect(()=>{
        async function fetchCourses(){
            try {
                const {data} = await axios.get(`${BASE_URL}/course`)
                if(data.msg === 'success'){
                    setCourses(data.response)

                }
            } catch (error) {
                const err = error.response?.data;
                return toast.error(err)
            }
        }

        fetchCourses();
    }, [])
    


  return (
    <div className=''>
        <div className='text-sm text-gray-300 font-normal'>
            <span className=''>dashboard / Manage Course</span>
        </div>
        <div className='flex gap-6 mt-8'>
            <div className='flex-[3]'>
                <div className=''>
                    <span className=''>Add New Course</span>
                </div>
                <div className='flex flex-col gap-3'>
                    <input type='text' value={formData.title} onChange={(e)=> setFormData({...formData, title: e.target.value})} className='border-[1px] p-3 rounded-[10px]' placeholder='Enter Course Title' />
                    <input type='text' value={formData.code} onChange={(e)=> setFormData({...formData, code: e.target.value})} className='border-[1px] p-3 rounded-[10px]' placeholder='Enter Course Code' />
                    <select value={formData.level} onChange={(e)=> setFormData({...formData, level: e.target.value})} className='border-[1px] p-3 rounded-[10px] bg-transparent'>
                        <option>-- Select Level --</option>
                        <option value="ND">ND</option>
                        <option value="HND">HND</option>
                    </select>
                    <Button 
                        text={"Create"}
                        btnStyle={"bg-blue-600 text-white text-[14px] p-3"}
                        onBtnClick={createCourseHandler}
                        loading={isLoading}
                    />
                </div>
            </div>
            <div className='flex-[5]'>
                <div className=''>
                    <div className="">
                        <p className='text-sm text-gray-300'>Search</p>
                        <input type="text" placeholder='Filter by name' className="w-full border-[1px] p-1 placeholder:text-[12px] rounded-md bg-transparent focus:outline-none" />
                    </div>
                    <div className='mt-6'>
                        {/* Levels */}
                        {courses?.length > 0 ? (
                            <div className='flex flex-col gap-4'>
                                {courses?.map((course, i)=>(
                                    <div key={i} className='flex justify-between items-center p-3 rounded-md shadow-sm'>
                                        <span className=''>{course.title}</span>
                                        <span className=''>{course.code}</span>
                                        <div className='flex gap-8 items-center'>
                                            <FaChartSimple className='text-blue-600 font-bold text-2xl cursor-pointer' onClick={()=> router.push(`/dashboard/course/${course._id}`)} />
                                            <MdClose className='text-red-500 text-2xl cursor-pointer' onClick={()=> ""} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='mt-2'>No Courses found.</div>
                        )}
                        {/* Empty Data Available */}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Page