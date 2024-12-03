"use client"

import Button from '@/components/Button'
import { BASE_URL } from '@/constants/api'
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import {MdClose} from 'react-icons/md'
import { headers } from '@/next.config'


const Page = () => {
    const [name, setName] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [levels, setLevels] = useState([]);

    const createLevelHandler = async (e)=>{
        e.preventDefault()

        if(!name) return toast.warning("Field can't be empty")

        try {
            setIsLoading(true)
            const {data} = await axios.post(`${BASE_URL}/level`, {name}, {ContentType: "application/json"})
            if(data.msg === "success"){
                toast.success('Level Added Successfully')

                setIsLoading(false)

                setTimeout(()=>{
                    setName("")
                }, 3000)
            }            
        } catch (error) {
            const err = error.response?.data;
            setIsLoading(false)
            return toast.error(err)
        }
    }


    useEffect(() => {
      async function fetchLevels(){
        try {
            const {data} = await axios.get(`${BASE_URL}/level`)
            if(data.msg === "success"){
                setLevels(data.response)
            }
        } catch (error) {
            const err = error.response?.data;
            setIsLoading(false)
            return toast.error(err)
        }
      }

      fetchLevels()
    }, [])
    


  return (
    <div className=''>
        <div className='text-sm text-gray-300 font-normal'>
            <span className=''>dashboard / Manage Level</span>
        </div>
        <div className='flex gap-6 mt-8'>
            <div className='flex-[3]'>
                <div className=''>
                    <span className=''>Add New Level</span>
                </div>
                <div className='flex flex-col gap-3'>
                    <input type='text' value={name} onChange={(e)=> setName(e.target.value)} className='border-[1px] p-3 rounded-[10px]' placeholder='Enter Level' />
                    <Button 
                        text={"Create"}
                        btnStyle={"bg-blue-600 text-white text-[14px] p-3"}
                        onBtnClick={createLevelHandler}
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
                        {levels.length > 0 ? (
                            <div className='flex flex-col gap-4'>
                                {levels.map((level, i)=>(
                                    <div key={i} className='flex justify-between items-center p-3 rounded-md shadow-sm'>
                                        <span className=''>{level.name}</span>
                                        <MdClose className='text-red-500 text-2xl cursor-pointer' onClick={()=> ""} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='mt-2'>No levels found.</div>
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