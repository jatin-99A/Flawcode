import { onBoardUser } from "@/modules/auth/actions";
import Navbar from '@/modules/home/components/navbar';

import React from 'react'

const RootLayout = async ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    const res = await onBoardUser();
    let role: string | undefined;
    res.success && (role = res.user?.role);

    return (
        <div className='flex flex-col items-center w-full h-full'>
            <Navbar role={role} />
            <div className='flex-1 flex items-center flex-col px-4 pb-4'>
                {children}
            </div>
        </div>
    )
}

export default RootLayout