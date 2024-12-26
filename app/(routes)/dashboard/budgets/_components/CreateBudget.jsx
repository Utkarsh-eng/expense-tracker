"use client"
import React, { useState } from 'react'
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
import {db}  from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';



  
function CreateBudget({refreshData}) {
    const {user}=useUser();

    const [emojiIcon, setEmojiIcon] = useState('😊');
    const [openEmojiPicker,setOpenEmojiPicker]=useState(false);
    const [amount,setAmount]=useState('');
    const [name,setName]=useState('');


    const onCreateBudget =async()=>{
        const result =await db.insert(Budgets)
        .values(
            {
                name:name,
                amount:amount,
                icon:emojiIcon,
                createdBy:user?.primaryEmailAddress?.emailAddress
            }
        ).returning({insertedId:Budgets.id})

        if(result){
            //console.log(result);
           
            refreshData();
            toast('Budget Created Successfully')
            
        }else{
            toast('Budget Creation Failed')
        }
    }
  return (
    <div>

 

    <Dialog>
  <DialogTrigger asChild>  
    <div className='bg-slate-100 p-10 rounded-md 
    items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md '>
        <h2 className='text-3xl'>+</h2>
      Create a New Budget
    </div>
    </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create New Budget</DialogTitle>
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
                }className='mt-2'placeholder='e.g Home Decor'/>
            </div>
        </div>
        <div className='mt-4'>
            <h2 className='text-black font-medium my-1 ml-1 '>Budget Amount
                <Input type='number' onChange={(e)=>
                    setAmount(e.target.value)
                } className='mt-2'placeholder='e.g ₹5000'/>
            </h2>
        </div>
        

        </div>

        
      </DialogDescription>
    </DialogHeader>
    <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
          <Button disabled={!(name&&amount)} onClick={()=>onCreateBudget()} className='mt-5 w-full'>Create Budget</Button>
          </DialogClose>
        </DialogFooter>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default CreateBudget
