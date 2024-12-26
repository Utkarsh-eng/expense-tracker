"use client"
import React, { useEffect,useState } from 'react'
import {db } from '@/utils/dbConfig'
import { getTableColumns } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { sql,eq ,desc} from 'drizzle-orm'
import BudgetItem from '../../budgets/_components/BudgetItem'
import AddExpense from '../_components/AddExpense'
import Expensetable from '../_components/Expensetable'
import { ArrowLeft, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { PenBox } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import EditBudget from '../_components/EditBudget'
import { useRouter } from 'next/navigation' 




function ExpenseScreen({params}) {
  const router =useRouter();
    const {user} =useUser();
   

    const [budgetInfo,setBudgetInfo] =useState({});
    const [expenseList,setExpenseList]=useState([]);
    useEffect(()=>{
        //console.log(params)
        user&&getBudgetinfo();
        
    },[user]);

    const deleteBudget =async(id)=>{

        const expenses =await db.delete(Expenses)
        .where(eq(Expenses.budgetId,id))
        .returning();
        if(expenses){
          const result =await db.delete(Budgets)
          .where(eq(Budgets.id,id))
          .returning();
  
          if(result){
              console.log(result)
              toast('Budget Deleted Successfully')
              window.location.href='/dashboard/budgets'
          }
        }
       
    }

    const getBudgetinfo =async()=>{
        const result = await db.select(
            {...getTableColumns(Budgets),
               totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
               totalItems:sql `count(${Expenses.id})`.mapWith(Number)
            }
        ).from(Budgets)
        .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
        .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
        .groupBy(Budgets.id)
        .where(eq(Budgets.id,params.id))

        if(result){
            console.log(result)
            getExpenses();
            setBudgetInfo(result[0])
            //setBudgetList(result)
        }else{
            console.log('No Budgets Found')
        
        }
    }

    const getExpenses =async()=>{
      const result =await db.select().from(Expenses)
      .where(eq(Expenses.budgetId,params.id))
      .orderBy(desc(Expenses.id))

    setExpenseList(result)
      console.log(result)
    }
  return (
    <div className='p-5  md:p-10'>

      
      <h2 className='text-2xl md:text-2xl font-bold flex justify-between items-center '> <span className='flex gap-2 items-center'>
      <ArrowLeft  className='cursor-pointer' onClick={()=>router.back()} />My Expenses
      </span>
     
      
      <div className='flex gap-6'>
      <EditBudget  budgetInfo={budgetInfo} refreshData={()=>getBudgetinfo()}/>
      <AlertDialog>
  <AlertDialogTrigger className='flex gap-2'> <div className='p-2 md:p-3 bg-red-500 rounded-lg text-sm text-white hover:bg-red-400' >Delete Budget</div></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your current budget
        with all its expenses.
       
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>deleteBudget(params.id)}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
      </div>
     
       
        </h2>
   
      <div className='grid grid-cols-1 md:grid-cols-2 mt-6 '>

        {
            budgetInfo? <BudgetItem budget={budgetInfo}/>:
            <div  className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'></div>
          
        }
        <AddExpense budgetId={params.id} user={user}
        refreshData={()=>getBudgetinfo()}
        />
        
      </div>

      <div className='mt-5'>
        
        <Expensetable expenseList={expenseList} refreshData={()=>{getExpenses() 
        getBudgetinfo()
        }}  />
      </div>
    </div>
  )
}

export default ExpenseScreen
