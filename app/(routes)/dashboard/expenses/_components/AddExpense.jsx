"use client"
import React from 'react'
import {Input } from '@/components/ui/input'
import {useState} from 'react'
import { Button } from '@/components/ui/button';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { toast } from 'sonner';
import moment from 'moment';
import { Loader } from 'lucide-react';

function AddExpense({budgetId,user,refreshData}) {

    const [name,setName]=useState('');
    const [amount,setAmount]=useState('');
    const [loading,setLoading]=useState(false);


    const addNewExpense = async()=>{
        setLoading(true);
        const result =await db.insert(Expenses).values(
            {
                name:name,
                amount:amount,
                budgetId:budgetId,
                createdAt:moment().format('DD/MM/yyyy')
            }
        ).returning({insertedId:Budgets.id})

        if(result){
            refreshData();
            setAmount('');
            setName('');
            setLoading(false);
            toast('Expense Added Successfully')
            console.log(result);
            
        }else{
            setLoading(false);
            toast('Expense Addition Failed')
        }


    }
  return (
    <div className='border rounded-lg p-5 ml-3 '>
      <h2 className='font-bold text-lg text-black '>Add expense</h2>
      <div className='mt-4'>
            <div className='text-black font-medium my-1  '>Expense Name 
                <Input  onChange={(e)=>
                    setName(e.target.value)
                }className='mt-2' value={name}placeholder='e.g House Rent'/>
            </div>
        </div>
        <div className='mt-4'>
            <h2 className='text-black font-medium my-1  '>Expense Amount
                <Input type='number' onChange={(e)=>
                    setAmount(e.target.value)
                   
                } className='mt-2'  value={amount} placeholder='e.g ₹8000'/>
            </h2>
        </div>

        <Button disabled={!(name&&amount)||loading} onClick={()=>addNewExpense()}
         className='mt-5 w-full'>
            {
                loading?
                <Loader className="animate-spin"/>:"Add New Expense" 
            }
            
            </Button>
    </div>
  )
}

export default AddExpense
