"use client"
import React from 'react'
import BudgetList from './_components/BudgetList'
import { useRouter } from 'next/navigation' 
import { ArrowLeft } from 'lucide-react'
function Budgets() {
  const router =useRouter();
  return (
    <div className='p-10'>
        <span className='flex gap-2 items-center font-bold text-3xl'>
      <ArrowLeft  className='cursor-pointer' onClick={()=>router.back()} />My Budgets
      </span>
        <BudgetList/>
     
    </div>
  )
}

export default Budgets
