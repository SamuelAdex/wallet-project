"use client";

import { authPublicRequest, authUserRequest, publicRequest, userRequest } from "@/utils/requestMethods";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";


export const AppContext = createContext();

export const AppProvider = ({children})=>{
    const [isLoading, setIsLoading] = useState(false);
    const [ticketQuantity, setTicketQuantity] = useState(0);
    const [wallet, setWallet] = useState({})
    const [isPaymentLoading, setIsPaymentLoading] = useState(false)
    const [isWalletLoading, setIsWalletLoading] = useState(false)
    const [isNewWallet, setIsNewWallet] = useState(false)

    const [userInfo, setUserInfo] = useState(() => {
        // Lazy initialization
        const storedData = typeof window !== "undefined" && localStorage.getItem("userInfo");
        return storedData ? JSON.parse(storedData) : {};
    });
    const router = useRouter();
    const [userData, setUserData] = useState({});
    const BASE_URL_MAIN = 'https://tickbit.onrender.com/api';


    // Save userInfo to localStorage only when explicitly set
    const saveUserInfo = (data) => {
        setUserInfo(data);
        typeof window !== "undefined" && localStorage.setItem("userInfo", JSON.stringify(data));
    };

    const removeUserInfo = () => {
        setUserInfo({});
        typeof window !== "undefined" && localStorage.removeItem("userInfo");
    };


    userRequest.interceptors.request.use(
        (config) => {
          const token = userInfo?.token;
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
    );


    const register = async (email, password)=>{
        if(!email || !password){
            toast("Fields can't be empty")
        }else{
            setIsLoading(true);
            try {
                const {data} = await publicRequest.post('/auth/signup', {email, password})
                setIsLoading(false);
                if(data.success == true){
                    setUserInfo(data)
                    localStorage.setItem('userInfo', JSON.stringify(data));
                    toast(data?.message);
                    router.push('/new-wallet')
                }
            } catch (error) {
                const err = error.response?.data;
                setIsLoading(false);
                toast(err?.message)
                return err;
            }
        }
    }




    const login = async (email, password)=>{
        if(!email || !password){
            toast("Fields can't be empty")
        }else{
            setIsLoading(true)
            try {
                const {data} = await publicRequest.post('/auth/login', {email, password})
                setIsLoading(false);
                if(data.success == true){
                    setUserInfo(data)
                    console.log(data, data.token)
                    localStorage.setItem('userInfo', JSON.stringify(data));
                    toast(data?.message);
                    router.push('/wallet')
                }
            } catch (error) {
                const err = error.response?.data;
                setIsLoading(false);
                toast(err?.message)
                return err;
            }
        }
    }

    const logout = ()=>{
        localStorage.removeItem('userInfo')
        setUserInfo({})
        toast("Logged out Successfully")
        router.push("/auth/login");
    }

    const authUserRequest = axios.create({
        baseURL: BASE_URL_MAIN,
        headers: {
            "Content-Type": "application/json",
        }
    });

    authUserRequest.interceptors.request.use(
        (config) => {
          const token = userInfo?.token;
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
    );

    const getUserData = async ()=>{
        if (!userInfo?.token) {
            toast("No token found, please login again");
            return;
        }
        console.log("getUserData normal: ", userInfo?.token);
        setIsLoading(true)
        try {
            const {data} = await userRequest.get('/auth/user')
            setIsLoading(false);
            console.log(data)
            if(data.success == true){
                setUserData(data.data)
                console.log("getUserData: ", data);
                // toast(data?.message);
            }
        } catch (error) {
            const err = error.response?.data;
            setIsLoading(false);
            toast(`${err?.message} - ${userInfo?.token}`)
            console.log("getUserData error: ", err + userInfo?.token)
        }
    }


    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    const createNewWallet = async ()=>{
        if (!userInfo?.token) {
            toast("No token found, please login again");
            return;
        }
        setIsNewWallet(true)
        let newToken = parseJwt(userInfo.token)

        try {
            console.log("This is createWallet Token: ", userInfo.token);
            const {data} = await userRequest.post(`/wallet/${userData?._id}/create-wallet`, 
                {userId: userData?._id, type: 'blockchain'}
            )

            if(data?.success == true){
                console.log(data)
                setIsNewWallet(false);
                router.push('/wallet');
                toast(data?.message)
            }
        } catch (error) {
            const err = error.response?.data;
            setIsNewWallet(false);
            toast(err?.message)
        }
    }

    const connectWallet = async (address, privateKey, mnemonic)=>{
        if (!address || !privateKey || !mnemonic) {
            toast("fields cannot be empty");
            return;
        }
        setIsNewWallet(true)
        let newToken = parseJwt(userInfo.token)
        try {
            console.log("This is createWallet Token: ", userInfo.token);
            const {data} = await userRequest.post(`/wallet/${userData?._id}/connect-wallet-address`, 
                {address, privateKey, mnemonic}
            )

            if(data?.success == true){
                console.log(data)
                setIsNewWallet(false);
                router.push('/wallet');
                toast(data?.message)
            }
        } catch (error) {
            const err = error.response?.data;
            setIsNewWallet(false);
            toast(err?.message)
        }
    }

    const getWalletById = async ()=>{
        setIsWalletLoading(true)
        try {
            const {data} = await userRequest.get(`/wallet/${userData?.wallets[0]}`)
            if(data.success == true){
                setWallet(data.wallet);
                setIsWalletLoading(false)
                console.log(data);
            }
        } catch (error) {
            const err = error.response?.data;
            setIsWalletLoading(false);
            toast(err?.message)
        }
    }

    const convertTo12HourFormat = (time) => {
        if (!time) return "Invalid time";

        const [hours, minutes] = time.split(":");
        const hour = parseInt(hours, 10);
        const suffix = hour >= 12 ? "PM" : "AM";
        const adjustedHour = hour % 12 || 12; // 12-hour format
        return `${adjustedHour}:${minutes} ${suffix}`;
    };

    

    // Fetch user data on app load if token is present
  useEffect(() => {
    if (userInfo?.token) {
      getUserData();
    }
  }, [userInfo?.token]);



    return (
        <AppContext.Provider value={{
            isLoading,
            userInfo,
            register,
            login,
            getUserData,
            userData,
            convertTo12HourFormat,
            logout,

            /* Create Wallet */
            createNewWallet,
            connectWallet,
            /* Wallet */
            wallet,
            getWalletById,
            isWalletLoading,
            isNewWallet,
        }}>
            {children}
        </AppContext.Provider>
    )
}