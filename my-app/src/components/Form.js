import React from 'react'
import { useForm } from 'react-hook-form';
import List from './List';
import {default as api} from '../store/apiSlice';
 
export default function Form() {
 
    const {register, handleSubmit, resetField} = useForm();
    const [addTransaction] = api.useAddTransactionMutation();
 
    const onSubmit = async (data) => {
        if(!data) return {};
        await addTransaction(data).unwrap();
        resetField('name');
        resetField('amount')
        resetField('date');
    }
 
  return (
    <div className="form max-w-sm mx-auto w-96">
       
        <h1 className='font-bold pb-4 text-xl'>Transaction</h1>
 
        <form id='form' onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
                <div className="input-group">
                    <input type="text" {...register('name')} placeholder='Salary,Groceries, House Rent, SIP,Travel Expenses..' className='form-input' required />
                </div>
                <select className='form-input' {...register('type')}>
                    <option value="Investment" defaultValue>Investment</option>
                    <option value="Expense">Expense</option>
                    <option value="Savings">Savings</option>
                </select>
                <div className="input-group">
                    <input type="text" {...register('amount')} placeholder='Amount' className='form-input' required/>
                </div>
                <div className="input-group">
                    <input type="date" {...register('date')} className='form-input' required/>
                </div>
                <div className="submit-btn">
                    <button className='border py-2 text-white bg-green-400 w-full hover:bg-emerald-500 rounded-md'>Make Transaction</button>
                </div>
            </div>    
        </form>
 
        <List></List>
    </div>
  )
}
 