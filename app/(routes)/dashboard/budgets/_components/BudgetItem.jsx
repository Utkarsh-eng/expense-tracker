import Link from 'next/link'
import React from 'react'

function BudgetItem({budget}) {

    const calculateProgress=()=>{
        const percentage =(budget.totalSpend/budget.amount)*100;
        return percentage.toFixed(2);
    }
  return (
    <Link href={'/dashboard/expenses/'+budget.id} >

      <div className='p-5 border rounded-lg cursor-pointer hover:shadow-md h-[170px] mb-5'>
      <div className='flex gap-2 items-center justify-between'>

<div className='flex gap-2 items-center'>
  <h2 className='text-3xl p-2  bg-slate-100 rounded-full '>{budget?.icon}</h2>
  <div >
      <h2 className='font-bold'>{budget.name}</h2>
      <h2 className='text-sm text-gray-500'>{budget.totalItems} Items</h2>
  </div>
</div>
  <h2 className='font-bold text-primary text-lg'>₹{budget.amount}</h2>
</div>
<div className='mt-7'>
  <div className='flex justify-between items-center mb-3'>
      <h2 className='text-xs text-slate-500'>₹{
          budget.totalSpend?budget.totalSpend:0}Spend</h2>

<h2 className='text-xs text-slate-500'>₹{
         budget.amount-budget.totalSpend} Remaining</h2>
  </div>
  <div className='w-full bg-slate-300 h-2 rounded-full'>
      <div className='  bg-primary h-2 rounded-full' style={{
          width:`${calculateProgress()}%`
      }}></div>

  </div>
</div>
      </div>
       
    </Link>
  )
}

export default BudgetItem
