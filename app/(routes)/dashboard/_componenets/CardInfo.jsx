import { PiggyBank, ReceiptText, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function CardInfo({budgetList}) {

    const [totalBudget,setTotalBudget] = useState(0)
    const [totalSpend,setTotalSpend] = useState(0)
    

    useEffect(()=>{
        console.log(budgetList)
       calculateCardInfo()
    
    },[budgetList])


    const calculateCardInfo =()=>{
        let totalBudget_ = 0;
        let totalSpend_ = 0;

        budgetList.forEach((budget)=>{
            totalBudget_+=Number(budget.amount);
            totalSpend_+=(budget.totalSpend);
        })

        setTotalBudget(totalBudget_)
        setTotalSpend(totalSpend_)
    }
  return (
    <div>
    
    {budgetList.length>0?
        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 '>
      
      <div className='p-7 border-rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:bg-slate-200 '>
        <div>
            <h2 className='text-sm'>Total Budget</h2>
            <h2 className='font-bold text-2xl'>₹{totalBudget}</h2>
        </div>

        <PiggyBank size={50} className=' rounded-full  text-white p-3 h-12 w-12 bg-primary'/>
        </div>

            
      <div className='p-7 border-rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:bg-slate-200  '>
        <div>
            <h2 className='text-sm'>Total Spend</h2>
            <h2 className='font-bold text-2xl'>₹{totalSpend}</h2>
        </div>

        <ReceiptText size={50} className=' rounded-full  text-white p-3 h-12 w-12 bg-primary'/>
        </div>

            
      <div className='p-7 border-rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:bg-slate-200 '>
        <div>
            <h2 className='text-sm'>Wallet</h2>
            <h2 className='font-bold text-2xl'>₹{totalBudget-totalSpend}</h2>
        </div>

        <Wallet size={50} className=' rounded-full  text-white p-3 h-12 w-12 bg-primary'/>
        </div>
        
    </div>
    :  <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 '>
        {
            [1,2,3].map((item,index)=>(
                <div className='h-[160px] w-full bg-slate-200 animate-pulse rounded-lg ' key={index}>
                    </div>

            ))
        }
        </div>
    }
    </div>
  )
}

export default CardInfo
