"use client"

import { ModeToggle } from '@/components/ui/theme-toggle'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'
import { useRef, useState } from 'react'
import ActiveLink from './activeLink'
import Logo from './logo'
import { IUser } from '@/types/types'
import { UserRole } from '@prisma/client'

const Navbar = ({ role }: {role : IUser["role"]}) => {
  const menuDivRef = useRef<HTMLDivElement | null>(null);
  const [isAsideMenu, setIsAsideMenu] = useState<boolean>(false);

  const handleMenu = (): void => {
    if (isAsideMenu) {
      menuDivRef.current!.style.transform = "translateX(105%)";
    } else {
      menuDivRef.current!.style.transform = "translateX(0)";
    }
    setIsAsideMenu(!isAsideMenu);
  }

  return (
    <nav className="h-20 w-[95vw] max-w-[1536px] flex items-center justify-between px-9 fixed top-4 z-50 bg-white dark:bg-[black] rounded-b-3xl shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_1px_#FFFFFF]">

      <section className="">
        <Logo />
      </section>

      <div ref={menuDivRef} className='w-full flex flex-col md:flex-row gap-3 items-center justify-between absolute md:static transform top-24 left-0.5 bg-white dark:bg-black p-7 md:p-0 rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_1px_#FFFFFF] md:shadow-none dark:md:shadow-none transition-all ease-in menu-bar duration-300'>

        <section className="flex gap-5 text-gray-500 font-bold mx-auto">

          <ActiveLink href={"/"} activeClass='text-black dark:text-white' className='hover:text-black dark:hover:text-white hover:scale-[1.05] duration-200'>Home</ActiveLink>

          <ActiveLink href={"/problem"} activeClass='text-black dark:text-white' className='hover:text-black dark:hover:text-white hover:scale-[1.05] duration-200'>Problem</ActiveLink>

          <ActiveLink href={"/about"} activeClass='text-black dark:text-white' className='hover:text-black dark:hover:text-white hover:scale-[1.05] duration-200'>About</ActiveLink>

          <ActiveLink href={"/profile"} activeClass='text-black dark:text-white' className='hover:text-black dark:hover:text-white hover:scale-[1.05] duration-200'>Profile</ActiveLink>

        </section>

        <section className="flex gap-3">
          {role === UserRole.ADMIN && <Button variant="outline">Add problem</Button>}

          <ModeToggle />

          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <div className="flex items-center gap-2">
              <SignInButton>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm font-medium hover:bg-white/20 dark:hover:bg-white/10"
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button
                  size="sm"
                  className="text-sm font-medium bg-[#3d0ef6] hover:bg-[#5a25ff] text-white"
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          </SignedOut>

        </section>

      </div>
      {!isAsideMenu ? <Menu onClick={handleMenu} className='md:hidden' /> : <X onClick={handleMenu} />}
    </nav>
  )
}

export default Navbar
