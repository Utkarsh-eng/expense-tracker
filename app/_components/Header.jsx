"use client"
import React from 'react'
import Image from 'next/image'
import {useUser,UserButton} from "@clerk/nextjs"
import { Button } from '@/components/ui/button'
import Link from 'next/link';



function Header  () {

    const {user,isSignedIn}=useUser();
   

  return (
    <div className='p-4 flex justify-between items-center border shadow-sm'>
        <span className='flex p-2 text-lg font-extrabold sm:text-2xl '>
        <Image src={'./logo.svg'}
      width={50}
      height={50}
      />
      
     Fintrack
        </span>
     {
        isSignedIn?
        <UserButton/>:
        <Link href={'/sign-in'}>
        <Button>Sign in</Button>
        </Link>
     }
    </div>
  )
}

export default Header
