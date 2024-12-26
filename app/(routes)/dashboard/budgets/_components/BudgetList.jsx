"use client"
import React, { useEffect,useState } from 'react'
import CreateBudget from './CreateBudget'
import {db } from '@/utils/dbConfig'
import { getTableColumns } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { sql,eq ,desc} from 'drizzle-orm'
import BudgetItem from './BudgetItem'

function BudgetList() {
    const {user} =useUser();

    const [budgetList,setBudgetList] =useState([]);
    useEffect(()=>{
        user&&getBudgets();
    },[user])
    
    const getBudgets =async()=>{
        const result = await db.select(
            {...getTableColumns(Budgets),
               totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
               totalItems:sql `count(${Expenses.id})`.mapWith(Number)
            }
        ).from(Budgets)
        .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
        .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id))

        if(result){
            console.log(result)
            setBudgetList(result)
        }else{
            console.log('No Budgets Found')
        
        }

    }

  return (

   
   
        

    
    <div className='mt-7'>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <CreateBudget
        refreshData={()=>getBudgets()}
        />

        {
           budgetList?.length>0? budgetList.map((budget,index)=>(
                <BudgetItem budget={budget} key={index} />
            )):
            [1,2,3,4,5].map((item,index)=>(
               <div key={index} className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'></div>


            ))
        }
        </div>
      
    </div>
  )
}

export default BudgetList
