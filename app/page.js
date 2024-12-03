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

const Page = () => {
    const {getUserData, userData, userInfo, isLoading, createNewWallet, connectWallet, wallet,
        getWalletById, isWalletLoading} = useContext(AppContext);
    const [auth, setAuth] = useState("register")


  return (
    <div className='grid place-items-center p-3 py-[6rem] bg-gradient-to-tr to-[#2B293D] from-[#0d0b1e] h-[100vh]'>
        {auth == "login" ? <Login setAuth={setAuth} /> : auth == "register" ? <Register setAuth={setAuth} /> : ""}            
    </div>
  )
}

export default Page


function Register({setAuth}){
  const [registerData, setRegisterData] = useState({
    email: "",
    password: ""
  });

  const {register, isLoading} = useContext(AppContext);

  return (
    <div className='md:w-[600px] backdrop-blur-lg rounded-[30px] p-3 bg-[rgba(255,255,255,0.02)] border-[0.2px]'>
        <div className='md:p-10 p-6'>
            <div className='flex justify-between items-center'>
              <div className='text-white md:text-[30px] font-[600] text-[20px]'>Sign Up</div>
              <MdClose onClick={()=> router.push('/')} className="cursor-pointer text-2xl text-[#A3A3A3]" />
            </div>

            <div className='flex flex-col gap-4 mt-8'>
              <Input placeholder={"Enter your email"} value={registerData.email} onChange={(e)=> setRegisterData({...registerData, email: e.target.value})} inputStyle={"rounded-[8px]"} type={"email"} labelName={"Email Address"} />
              <Input placeholder={"Enter password"} value={registerData.password} onChange={(e)=> setRegisterData({...registerData, password: e.target.value})} inputStyle={"rounded-[8px]"} type={"password"} labelName={"Password"} />
                <Button 
                  text={"Register"}
                  loading={isLoading}
                  onBtnClick={()=> register(registerData.email, registerData.password)}
                  btnStyle={"bg-gray-400 text-white font-[600] md:text-[15px] text-[12px] p-4 mt-2 rounded-[8px] w-full"}
                />
            </div>
            <div className='md:text-[15px] mt-6 text-[12px] text-[#cccccc]'>{"Already have an account"}? <div onClick={()=> setAuth('login')} className="text-primary cursor-pointer">Sign In</div></div>
        </div>
      </div>
  )
}

function Login({setAuth}){
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const {login, isLoading} = useContext(AppContext);

  return (
    <div className='md:w-[600px] backdrop-blur-lg rounded-[30px] p-3 bg-[rgba(255,255,255,0.02)] border-[0.2px] '>
        <div className='md:p-10 p-6'>
            <div className='flex justify-between items-center'>
              <div className='md:text-[30px] text-white text-[20px] font-[600]'>Login</div>
              <MdClose onClick={()=> router.push('/')} className="cursor-pointer text-2xl text-[#A3A3A3]" />
            </div>

            <div className='flex flex-col gap-4 mt-8'>
              <Input placeholder={"Enter your email"} value={loginData.email} onChange={(e)=> setLoginData({...loginData, email: e.target.value})} inputStyle={"rounded-[8px]"} type={"email"} labelName={"Email Address"} />
              <Input placeholder={"Enter password"} value={loginData.password} onChange={(e)=> setLoginData({...loginData, password: e.target.value})} inputStyle={"rounded-[8px]"} type={"password"} labelName={"Password"} />
                <Button 
                  text={"Login"}
                  loading={isLoading}
                  onBtnClick={()=> login(loginData.email, loginData.password)}
                  btnStyle={"bg-gray-400 text-white font-[600] md:text-[15px] mt-2 text-[12px] p-4 rounded-[8px] w-full"}
                />
            </div>
            <div className='md:text-[15px] mt-6 text-[12px] text-[#cccccc]'>{"Don't have an account"}? <div onClick={()=> setAuth('register')} className="text-primary cursor-pointer">Sign Up</div></div>
        </div>
      </div>
  )
}