import { Trash, TrashIcon } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import { db } from '@/utils/dbConfig'
import { Expenses } from '@/utils/schema'
import { toast } from 'sonner'
import { sql,eq ,desc} from 'drizzle-orm'

function Expensetable({expenseList,refreshData}) {

    const deleteExpense =async (id)=>{
        const result =await db.delete(Expenses)
        .where(eq(Expenses.id,id))
        .returning();

        console.log(result)
        if(result){
            toast('Expense deleted successfully')
            refreshData();
        }

    }
  return (



    <div className='mt-3 ml-4 border p-3 rounded-lg'>

        <h2 className='font-bold mb-3 text-2xl'>Latest Expenses</h2>
        <div className='grid grid-cols-4 bg-slate-300 p-2'>
            <h2 className='font-bold'>Name</h2>
            <h2 className='font-bold'>Amount</h2>
            <h2 className='font-bold ml-4'>Date</h2>
            <h2 className='font-bold ml-3'>Action </h2>

        </div>

        {
            expenseList.map((expense,index)=>(
            <div className='grid grid-cols-4  p-2 hover:bg-slate-100 cursor-pointer gap-2'> 

                <h2 className='text-sm md:text-base '>{expense.name}</h2>
                <h2 className='text-sm md:text-base '>{expense.amount}</h2>
                <h2 className='text-sm md:text-base '>{expense.createdAt}</h2>
                <h2>
                    <TrashIcon className='cursor-pointer text-sm md:text-base text-red-600  ml-4 hover:shadow-sm 'onClick={()=>deleteExpense(expense.id)} />
                </h2>

                </div>
    
            )
        )
        }
      
    </div>
  )
}

export default Expensetable
