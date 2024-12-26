"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'



function Sidenav() {
    const path =usePathname();
    useEffect(()=>{
        console.log(path)

    },[path])
    const menuList =[
        {
            id:1,
            name:'Dashboard',
            icon:LayoutGrid,
            path:'/dashboard'

        },
        {
            id:2,
            name:'Budgets',
            icon:PiggyBank,
            path:'/dashboard/budgets'
        },


        {
            id:3,
            name:'Expenses',
            icon:ReceiptText,
            path:'/dashboard/expensesData'
        },

       
        

    ]
  return (
    <div className='h-screen p-8 border shadow-sm'>
      <span className='flex p-2 text-1xl font-extrabold sm:text-2xl gap-2 '>
        <Image src={"/logo.svg"}
        width={50}
        height={50}
      
      alt='Logo'
      />
      
     Fintrack
        </span>

        <div>
            {menuList.map((menu)=>(
                <Link href ={menu.path} key={menu.id}>
                <h2   className={`flex gap-5 items-center font-medium text-gray-500 p-5 cursor-pointer rounded-md
                mb-2 hover:text-primary hover:bg-blue-100 ${path==menu.path&&'text-primary bg-blue-100'}`}>
                    <menu.icon/>
                    {menu.name}
                </h2>
                </Link>
            )) 

            }
        </div>

        <div className='fixed bottom-10 p-5 flex gap-2 items-center text-gray-500'>
            <UserButton/>
            Profile
        </div>
    </div>

    
  )
}

export default Sidenav
