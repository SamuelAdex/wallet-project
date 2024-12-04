"use client";

import React from 'react'
import Button from '../Button';
import { useRouter } from 'next/navigation';
import { GiVibratingShield } from "react-icons/gi";
import { GrSecure } from "react-icons/gr";

const Hero = () => {
    const router = useRouter()
  return (
    <div className='mt-[4rem] h-[90dvh] grid place-items-center md:px-0 px-10'>
        <div className='md:w-[550px] w-full'>
            <div className='md:text-[50px] md:leading-[50px] leading-10 text-white text-[40px] font-[700] text-center'>Perfect for Keeping your crypto wallet.</div>
            <p className='text-gray-400 text-center mt-4 md:leading-[20px]'>Our advanced cold wallet protectsyour digital assets from online threats, providing top-notch security and peaceof mind.</p>

            <div className='mt-5 flex items-center gap-6'>
                <div className='flex items-center gap-2'>
                    <GiVibratingShield className='md:text-[70px] text-[60px] bg-gray-900 rounded-[10px] p-[12px] text-white' />
                    <div className=''>
                        <div className='md:text-[16px] text-[14px] text-white font-[500]'>Wallet Backup</div>
                        <div className='text-gray-600 md:text-[14px] text-[10px] font-[400]'>Recover your coins easily</div>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <GrSecure className='md:text-[70px] text-[60px] bg-gray-900 rounded-[10px] p-[12px] text-white' />
                    <div className=''>
                        <div className='md:text-[16px] text-[14px] text-white font-[500]'>Device Protection</div>
                        <div className='text-gray-600 md:text-[14px] text-[10px] font-[400]'>Make your Wally untouchable</div>
                    </div>
                </div>
            </div>

            <div className='flex items-center justify-center md:space-x-6 space-x-4 mt-6'>
                <Button
                    text={"Get your Wally"}
                    onBtnClick={()=> router.push('/auth')}
                    btnStyle={"bg-transparent bg-[#ABF600] text-[#000] md:w-[200px] w-full font-[500] px-4 py-3 md:text-[20px]"}
                />
                <Button 
                    text={"Learn More"}
                    btnStyle={"bg-transparent bg-white text-black md:w-[200px] w-full font-[500] px-4 py-3 md:text-[20px]"}
                />
            </div>
        </div>
    </div>
  )
}

export default Hero