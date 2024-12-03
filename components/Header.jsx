import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const Header = ()=>{
    return (
        <header className='w-full bg-blue-600 p-6 fixed top-0 flex z-10 justify-between items-center text-white'>
            <Link href={"/"} className="flex gap-1 items-center">
                <Image 
                    src={'/assets/nekedelogo.png'}
                    alt=''
                    width={200}
                    height={50}
                />
                <span className='text-[23px] font-bold'>SICT FPNO</span>
            </Link>
            <div className=''>
                <Link href={"/login"} className='px-6 rounded-[8px] cursor-pointer py-3 bg-orange-400'>Login</Link>
            </div>
        </header>
    )
}

export default Header;