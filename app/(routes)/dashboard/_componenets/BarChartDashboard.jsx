import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, BarChart, ResponsiveContainer } from 'recharts';

function Charts({budgetList}) {

    
  return (
    <div className='p-5 border rounded-lg'>
     <div className='font-bold ml-5'>Activity</div>
     <ResponsiveContainer width='80%' height={300}>
    <BarChart width={350} height={350} data={budgetList}
    margin={{top:5,right:5,left:25,bottom:5}}>

      <XAxis dataKey='name'/>
      <YAxis/>
      <CartesianGrid strokeDasharray='3 3'/>
      <Tooltip/>
      <Legend/>
      <Bar dataKey='totalSpend' fill='#4845d2' stackId="a"/>
      <Bar dataKey='amount' fill='#C3C2FF' stackId="a"/>
      



      </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Charts
