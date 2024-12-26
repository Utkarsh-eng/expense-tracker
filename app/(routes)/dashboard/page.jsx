"use client"
import React, { useEffect } from 'react'
import { UserButton,useUser } from '@clerk/nextjs'
import CardInfo from './_componenets/CardInfo';
import {db } from '@/utils/dbConfig'
import { getTableColumns } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import { sql,eq ,desc} from 'drizzle-orm'
import { useState } from 'react';
import BarChartDashboard from './_componenets/BarChartDashboard';
import BudgetItem from './budgets/_components/BudgetItem';
import Expensetable from './expenses/_components/Expensetable';



function dashboard() {
  const {user} = useUser();

 

    const [budgetList,setBudgetList] =useState([]);
    const [expenseList,setExpenseList]=useState([]);
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

        getAllExpenses();
        


    }

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
    <div className='p-5'>
      <h2 className='font-bold text-3xl '> Hi, {user?.firstName}  🎉</h2>
      <p className='text-gray'>Here's what happening with your money 💰, Lets manage your expense</p>


      <CardInfo budgetList={budgetList}/>

      <div className='grid grid-cols-1 md:grid-cols-3 mt-6'>
        <div className="md:col-span-2">
        <BarChartDashboard  budgetList={budgetList}/>

        <Expensetable
        expenseList={expenseList}
        refreshData={()=>getAllExpenses()}/>
        </div>

       <div className='p-5'>

        <h2 className='font-bold mb-4'>Recent Budgets</h2>
        {
        

          budgetList?.length>0? budgetList.map((budget,index)=>(
            <BudgetItem budget={budget} key={index} />
          ))
          :
          [1,2,3,4,5].map((item,index)=>(
            <div key={index} className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'></div>
          ))
        }
       </div>
      </div>
    </div>
  )
}

export default dashboard


