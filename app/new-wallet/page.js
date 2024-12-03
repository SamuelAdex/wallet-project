"use client";

import { AppContext } from '@/context/AppContext';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { LuUpload } from "react-icons/lu";
import { FiDownload } from "react-icons/fi";
import { IoCardOutline, IoCopyOutline } from "react-icons/io5";
import { TbExchange } from "react-icons/tb";
import { IoMdCopy } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { MdClose } from 'react-icons/md';
import Link from 'next/link';



function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

const Wallet = () => {
    const {getUserData, userData, userInfo, isLoading, createNewWallet, connectWallet, wallet,
        getWalletById, isWalletLoading, isNewWallet} = useContext(AppContext);
    const [walletType, setWalletType] = useState("")
    console.log("jwt token: ", parseJwt(userInfo?.token)?.id, userData.wallets);
    const [walletImportData, setWalletImportData] = useState({
        address: "",
        privateKey: "",
        seedPhrase: ""
    })
    const router = useRouter();

    const [loginData, setLoginData] = useState({
      email: "",
      password: ""
    });

    // useEffect(()=>{
    //     if(!userInfo.token){
    //         router.push('/auth/login')
    //     }
    // }, [userInfo.token])

    useEffect(()=>{
        getUserData();
    }, [isNewWallet])


    useEffect(()=>{
        getWalletById();
    }, []);

    const handleWalletType = (val) =>{
        setWalletType(val)
    }


    const copyText = (c) => {
        navigator.clipboard.writeText(c);
        toast(`wallet address copied successfully`);
    };


  return (
    <div className='grid place-items-center p-3 py-[6rem]'>
        <>
          <div className='md:w-[884px] w-full rounded-[32px] py-10 px-14 md:space-y-8 border-[2px] border-primary bg-gradient-to-tr to-[rgba(45,44,60,0.8)] from-[rgba(45,44,60,0.8)]'>

            <div className='text-white text-center'>
                <div className='md:font-[700] font-[600] md:text-[30px] text-[22px]'>Welcome to Tickbit Wallet</div>
                <div className='md:text-[13px] text-[10px] font-[500]'>Hold crypto assets in your custody. Track your portfolio performance, and interact with web 3 Dapps</div>
            </div>

            <div className='md:space-y-8 space-y-4'>
                <div onClick={()=> handleWalletType("0")} className={`md:flex items-center rounded-[32px] cursor-pointer py-14 px-8 border-[2px] ${walletType == '0' ? 'border-white' : 'border-transparent'} hover:border-white bg-[#212246] text-white`}>
                    <div className='flex-[1]'></div>
                    <div className='flex-[4]'>
                        <div className='md:font-[700] font-[600] md:text-[20px] text-[16px]'>Create a new wallet</div>
                        <div className='md:text-[12px] text-[10px] font-[500]'>Get started with Crypto by creating a new wallet address to hold, trade and exchange assets.</div>
                    </div>
                </div>
                <div onClick={()=> handleWalletType("1")} className={`md:flex items-center rounded-[32px] cursor-pointer px-8 py-14 border-[2px] ${walletType == '1' ? 'border-primary' : 'border-transparent'}  hover:border-primary bg-[#fff] text-primary`}>
                    <div className='flex-[1]'></div>
                    <div className='flex-[4]'>
                        <div className='md:font-[700] font-[600] md:text-[20px] text-[16px]'>I already have an account</div>
                        <div className='md:text-[12px] text-[10px] font-[500]'>Import your seed phrase from an already existing account and hold, trade and exchange crypto asset.</div>
                        {walletType == 1 && <div className='space-y-2'>
                            <Input labelName={""} value={walletImportData.address} onChange={(e)=> setWalletImportData({...walletImportData, address: e.target.value})} type={"text"} placeholder={"Enter wallet address"} />
                            <Input labelName={""} value={walletImportData.privateKey} onChange={(e)=> setWalletImportData({...walletImportData, privateKey: e.target.value})} type={"text"} placeholder={"Enter private key"} />
                            <textarea placeholder='Enter seed phrase' value={walletImportData.seedPhrase} onChange={(e)=> setWalletImportData({...walletImportData, seedPhrase: e.target.value})} className='w-full h-[140px] border-[1px] p-3'>

                            </textarea>
                        </div>}
                    </div>
                </div>
            </div>


            <Button 
                text={"Create Wallet"}
                loading={isLoading}
                onBtnClick={()=>{
                    if(walletType === "0"){
                        createNewWallet();
                    }else if(walletType == "1"){
                        connectWallet(walletImportData.address, walletImportData.privateKey, walletImportData.seedPhrase)
                    }else{
                        toast("Please Select a Wallet Option")
                    }
                }}
                btnStyle={"bg-[rgba(45,44,60,0.8)] text-white m-auto p-3 rounded-[20px] font-[600] md:w-[230px]"}
            />
            </div>
        </>            
    </div>
  )
}

export default Wallet