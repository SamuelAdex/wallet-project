"use client";

import Button from '@/components/Button';
import { AppContext } from '@/context/AppContext';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { LuUpload } from "react-icons/lu";
import { FiDownload } from "react-icons/fi";
import { IoCardOutline, IoCopyOutline } from "react-icons/io5";
import { TbExchange } from "react-icons/tb";
import { IoMdCopy } from 'react-icons/io';
import Input from '@/components/Input';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';



function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

const WalletPage = () => {
    const {getUserData, userData, userInfo, isLoading, createNewWallet, connectWallet, wallet,
        getWalletById, isWalletLoading} = useContext(AppContext);
    
    const router = useRouter();

    useEffect(()=>{
        if(userData?.wallets?.length < 1){
            router.push('/new-wallet')
        }
    }, [])

    useEffect(()=>{
        getUserData();
    }, [])


    useEffect(()=>{
        getWalletById();
    }, []);



    const copyText = (c) => {
        navigator.clipboard.writeText(c);
        toast(`wallet address copied successfully`);
    };


  return (
    <div className='grid place-items-center p-3 md:h-[100vh] bg-gradient-to-tr to-[#2B293D] from-[#0d0b1e] relative '>

        <div className='absolute rounded-full w-[50px] h-[50px] bg-white'>

        </div>
        {/* {isLoading && <Loader />} */}
        <div className='md:w-[884px] w-full rounded-[32px] backdrop-blur-md bg-[rgba(45,44,60,0.5)] py-10 px-14 md:space-y-8 border-[2px] border-gray-400 grid place-items-center'>
            <div className=''>
                {/* {userData?.wallets[0]} */}
                {/* <select className='p-3 rounded-[12px] border-[1px] bg-primary'>
                    <option>-- Switch Wallet --</option>
                    {userData.wallets?.map((wallet, index) =>(
                        <option key={index} value={wallet}>{`Wallet ${index === 0 ? "" : index}`}</option>
                    ))}
                </select> */}
            </div>

            <div className='flex items-center justify-center'>
                <div className='text-gray-300 text-2xl cursor-pointer'>{wallet?.address && wallet?.address.slice(0,10)+"..."+wallet.address.slice(wallet?.address.length - 10, wallet?.address.length)}</div>
                <IoCopyOutline onClick={()=> copyText(wallet?.address)} className='text-3xl text-white cursor-pointer' />
            </div>

            <div className='md:w-[343px] md:space-y-6 space-y-3'>    
                {isWalletLoading ? (
                    <Loader />
                ) : <div className='w-full rounded-[16px] bg-[#212246] shadow-md p-6 md:space-y-5 '>
                    <div className='text-white'>
                        <div className='md:text-[12px] text-[10px] font-[400]'>My Assets</div>
                        <div className='md:text-[32px] text-[23px] font-[700]'>{!isNaN(wallet?.balance) && parseFloat(wallet?.balance).toFixed(10) || "0.00"} BTC</div>
                    </div>
                    <div className='flex justify-between'>
                        <div className=''>
                            <div className='text-white text-[12px]'>Monthly profit</div>
                            <div className='md:text-[12px] text-[10px] text-[#07A962]'>+ $ 3,212.5</div>
                        </div>
                        <div className='flex items-end'>
                            <div className='text-[#07A962] bg-[rgba(123,255,178,0.2)] w-[56px] md:text-[10px] text-[8px] font-[600] py-[3px] px-[6px] h-[21px] rounded-[4px]'>+34%</div>
                        </div>
                    </div>
                </div>}
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col gap-1 items-center cursor-pointer'>
                        <div className='bg-white w-[60.79px] h-[48.13px] rounded-[16px] grid place-items-center'>
                            <LuUpload className='text-3xl' />
                        </div>
                        <div className='text-white text-[13px] font-[400]'>Send</div>
                    </div>
                    <div className='flex flex-col gap-1 items-center cursor-pointer'>
                        <div className='bg-white w-[60.79px] h-[48.13px] rounded-[16px] grid place-items-center'>
                            <FiDownload className='text-3xl' />
                        </div>
                        <div className='text-white text-[13px] font-[400]'>Receive</div>
                    </div>
                    <div className='flex flex-col gap-1 items-center cursor-pointer'>
                        <div className='bg-white w-[60.79px] h-[48.13px] rounded-[16px] grid place-items-center'>
                            <IoCardOutline className='text-3xl' />
                        </div>
                        <div className='text-white text-[13px] font-[400]'>Buy</div>
                    </div>
                    <div className='flex flex-col gap-1 items-center cursor-pointer'>
                        <div className='bg-white w-[60.79px] h-[48.13px] rounded-[16px] grid place-items-center'>
                            <TbExchange className='text-3xl' />
                        </div>
                        <div className='text-white text-[13px] font-[400]'>Exchange</div>
                    </div>
                </div>
                <div className=''>
                    <div className='flex justify-between text-white font-[600] md:text-[16px] text-[13px] items-center'>
                        <span className='cursor-pointer flex-[1] text-center'>Token</span>
                        <span className='cursor-pointer flex-[1] text-center'>NFTs</span>
                    </div>
                </div>
                <div className=''>
                    <div className=''>
                        <div className=''>
                            
                        </div>
                    </div>
                    <div className=''></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WalletPage