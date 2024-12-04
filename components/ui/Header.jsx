"use client"

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import { IoFingerPrint } from "react-icons/io5";

const Header = ()=>{
    const router = useRouter();

    return (
        <header className='w-full p-6 fixed top-0 z-10 backdrop-blur-md'>
            <div className='md:w-[95%] m-auto flex justify-between items-center'>
                <div className="">
                    <div className='font-[700] md:text-[32px] text-[20px] text-white'>BitWally</div>
                </div>
                <div className="md:flex hidden items-center gap-14 md:text-[20px] text-[14px] font-[500] text-gray-300">
                    <Link href={"/"}>Home</Link>
                    <Link href={"#"}>About</Link>
                    <Link href={"/wallet"}>Wallet</Link>
                    <Link href={"#"}>Support</Link>
                </div>
                <div className="flex items-center gap-5">
                    <Button 
                        text={"Login BitWally"}
                        iconName={<IoFingerPrint className='text-white text-2xl' />}
                        onBtnClick={()=> router.push('/auth')}
                        btnStyle={"bg-transparent text-white font-[500] md:text-[20px]"}
                    />
                    <Button 
                        text={"Get your Wally"}
                        onBtnClick={()=> router.push('/auth')}
                        btnStyle={"bg-lime-400 rounded-[10px] text-[#000] font-[500] md:px-4 py-3 md:text-[20px]"}
                    />
                </div>
            </div>
        </header>
    )
}

export default Header;