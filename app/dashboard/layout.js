import Header from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'
import React from 'react'

const layout = ({children}) => {
  return (
    <div className=''>
        <Sidebar />
        <div className='ml-[14rem] p-8'>
            <Header />
            <div className=''>
                {children}
            </div>
        </div>
    </div>
  )
}

export default layout