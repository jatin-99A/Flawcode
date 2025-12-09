import Navbar from '@/modules/home/components/navbar';
import React from 'react'

const RootLayout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    
    return (
        <div className='flex flex-col items-center w-full h-full'>
            <Navbar role={""} />
            <div className='flex-1 flex items-center flex-col px-4 pb-4'>
                {children}
            </div>
        </div>
    )
}

export default RootLayout