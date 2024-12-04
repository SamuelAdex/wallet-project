"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Button = ({
  type,
  text,
  onBtnClick,
  iconName,
  imgPath,
  btnStyle,
  imgStyle,
  loading
}) => {

  const router = useRouter()

  return (
    <>
      {type == "outline" ? (
        <button
          className={`border-2 flex items-center justify-center font-[500] gap-1 border-black text-black text-[13px] ${btnStyle}`}
          onClick={onBtnClick}
        >
          {loading == true ? (
            <Loader />
          ) : (
            <>
              {iconName ? (
                <span>{iconName}</span>
              ) : (
                <>
                  {imgPath && <Image className={`${imgStyle}`} width={24} height={24} src={imgPath} alt="" />}
                </>
              )}
              {text}
            </>
          )}
        </button>
      ) : (
        <button
          className={`flex items-center justify-center gap-1 font-[500] text-center text-[13px] ${btnStyle}`}
          onClick={onBtnClick}
        >
          {loading == true ? (
            <Loader />
          ) : (
            <>  
              {iconName ? (
                <span>{iconName}</span>
              ): (
                <>
                  {imgPath && <Image src={imgPath} width={24} height={24} alt="" />}
                </>
              )}
              {text}
            </>
          )}
        </button>
      )}
    </>
  );
};

export default Button;


export function Loader(){
  return (
    <div className="loader animate-spin p-[8px] border-t-[2px] border-[2px] border-transparent rounded-[100%] border-t-white"></div>
  )
}