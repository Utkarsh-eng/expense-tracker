"use client"
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { eq } from 'drizzle-orm';


function EditBudget({budgetInfo,refreshData}) {
    const {user}=useUser();

    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
    const [openEmojiPicker,setOpenEmojiPicker]=useState(false);
    const [amount,setAmount]=useState(budgetInfo?.amount);
    const [name,setName]=useState(budgetInfo?.name);

   useEffect(()=>{
    if(budgetInfo){
        setEmojiIcon(budgetInfo?.icon)
        setAmount(budgetInfo?.amount)
        setName(budgetInfo?.name)
        
    }
        
   }
    ,[budgetInfo]) 

    const UpdateBudget =async()=>{
        const result =await db.update(Budgets)
        .set({
            name:name,
            amount:amount,
            icon:emojiIcon,
        })
        .where(eq(Budgets.id,budgetInfo.id))
        .returning();

        if(result){
            //console.log(result);
            toast('Budget Updated Successfully')
            refreshData();
           }
    }
  return (
    <div>
    

     
    <Dialog>
  <DialogTrigger asChild>  
  <div className='p-3 bg-primary rounded-lg text-sm text-white cursor-pointer hover:bg-blue-500 shadow-md' >Edit</div>
    </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Budget</DialogTitle>
      <DialogDescription>


        <div className='mt-5'>

       
        <Button className='text-lg size-lg' variant='outline'  onClick={()=>(
            setOpenEmojiPicker(!openEmojiPicker)
        )
        }>
        {emojiIcon}
        </Button>
        

        <div className='absolute z-20'>
            {<EmojiPicker 
            open={openEmojiPicker}
            onEmojiClick={(e)=>{
                setEmojiIcon(e.emoji)
                setOpenEmojiPicker(false)}
            }
           
            />}
        </div>
          
        <div className='mt-4'>
            <div className='text-black font-medium my-1 ml-1  '>Budget Name 
                <Input  onChange={(e)=>
                    setName(e.target.value)
                  
                }className='mt-2'placeholder='e.g Home Decor'   defaultValue={budgetInfo.name}/>
            </div>
        </div>
        <div className='mt-4'>
            <h2 className='text-black font-medium my-1 ml-1 '>Budget Amount
                <Input type='number' onChange={(e)=>
                    setAmount(e.target.value)
                } className='mt-2'placeholder='e.g ₹5000' defaultValue={budgetInfo.amount}/>
            </h2>
        </div>
        

        </div>

        
      </DialogDescription>
    </DialogHeader>
    <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
          <Button  onClick={()=>UpdateBudget()} className='mt-5 w-full'>Update Budget</Button>
          </DialogClose>
        </DialogFooter>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default EditBudget
