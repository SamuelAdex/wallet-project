"use client"

import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import { IoFingerPrint, IoWallet } from "react-icons/io5";
import { AppContext } from '@/context/AppContext';
import { MdWallet } from 'react-icons/md';
import { GrGoogleWallet } from 'react-icons/gr';

const Header = ()=>{
    const router = useRouter();
    const {userInfo} = useContext(AppContext);

    return (
        <header className='w-full p-6 p-4 fixed top-0 z-10 backdrop-blur-md'>
            <div className='md:w-[95%] w-full m-auto flex justify-between items-center'>
                <div className="">
                    <div className='font-[700] md:text-[32px] md:flex hidden text-[20px] text-white'>BitWally</div>
                    {/* <div className='font-[700] md:text-[32px] md:hidden flex text-[20px] text-white'>BitW</div> */}
                    <GrGoogleWallet className='text-3xl cursor-pointer md:hidden flex text-white' />
                </div>
                <div className="md:flex hidden items-center gap-14 md:text-[20px] text-[14px] font-[500] text-gray-300">
                    <Link href={"/"}>Home</Link>
                    <Link href={"#"}>About</Link>
                    <Link href={"/wallet"}>Wallet</Link>
                    <Link href={"#"}>Support</Link>
                </div>
                    {!userInfo?.token && (
                <div className="flex items-center md:gap-5 gap-2">
                        <>
                            <Button 
                                text={"Login BitWally"}
                                iconName={<IoFingerPrint className='text-white text-2xl' />}
                                onBtnClick={()=> router.push('/auth')}
                                btnStyle={"bg-transparent text-white font-[500] md:text-[20px]"}
                            />
                            <Button 
                                text={"Get your Wally"}
                                onBtnClick={()=> router.push('/auth')}
                                btnStyle={"bg-lime-400 rounded-[10px] text-[#000] font-[500] md:px-4 px-1 py-3 md:text-[20px]"}
                            />
                        </>
                </div>
                    )}

                    {userInfo?.token && (
                        <MdWallet className='text-3xl cursor-pointer text-white' onClick={()=> router.push("/wallet")} />
                    )}
            </div>
        </header>
    )
}

export default Header;