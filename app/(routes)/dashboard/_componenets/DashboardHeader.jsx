import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Home=()=>{
  window.location.href='/'
}
const Budgets=()=>{
  window.location.href='/dashboard/budgets'
}
const Expenses=()=>
  {
    window.location.href='/dashboard/expensesData'
  
  }
const Dash=()=>{
  window.location.href='/dashboard'

}
function DashboardHeader() {
  return (
    <div className='p-5 shadow-sm border flex justify-between'>
    <div className=''></div>
     <div className='flex justify-between gap-4'>


     <Button  className='hidden md:flex' onClick={()=>Home() } >Home</Button>
     
    
      <Button  size='sm' onClick={()=>Dash()} className='md:hidden'>Dashboard</Button>
      <Button size='sm' onClick={()=>Budgets()}className='md:hidden'>Budgets</Button>
      <Button size='sm' onClick={()=>Expenses()}className='md:hidden'>Expenses</Button>
      
      <UserButton/></div>

    </div>
  )
}

export default DashboardHeader
