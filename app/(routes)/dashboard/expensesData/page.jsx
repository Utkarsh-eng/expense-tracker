"use client"
import React from 'react'
import {eq,desc} from 'drizzle-orm'
import {useUser} from '@clerk/nextjs'
import { db } from '@/utils/dbConfig'
import { Expenses,Budgets } from '@/utils/schema'
import { useEffect,useState } from 'react'
import Expensetable from '../expenses/_components/Expensetable'



function expensesData() {
  const {user} = useUser();

 

 
  const [expenseList,setExpenseList]=useState([]);
  useEffect(()=>{
      user&&getAllExpenses();
    
  },[user])
    const getAllExpenses =async()=>{
        const result =await db.select(
            {
              id:Expenses.id,
              amount:Expenses.amount,
              name:Expenses.name,
              createdAt:Expenses.createdAt,
            }
        ).from(Budgets)
        .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
        .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Expenses.id))
  
        console.log(result)
        setExpenseList(result)
  
      }
  return (

   
     <div>
       <Expensetable
        expenseList={expenseList}
        refreshData={()=>getAllExpenses()}/>
     </div>
   
  )
}

export default expensesData
