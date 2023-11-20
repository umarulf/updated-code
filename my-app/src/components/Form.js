import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import List from './List';
import { default as api } from '../store/apiSlice';

export default function Form() {
  const { register, handleSubmit, resetField } = useForm();
  const [addTransaction] = api.useAddTransactionMutation();

  const onSubmit = async (data) => {
    if (!data) return {};

    // Retrieve the user ID from local storage
    const userId = localStorage.getItem('userId');

    // Check if user ID is available
    if (!userId) {
      console.error('User ID not found in local storage.');
      return;
    }

    // Include the user ID in the data being sent to the backend
    const transactionData = {
      ...data,
      userId: parseInt(userId, 10), // Convert to integer if necessary
    };

    // Call the addTransaction mutation with the modified data
    await addTransaction({ ...transactionData, userId }).unwrap();

    // Reset form fields
    resetField('name');
    resetField('amount');
    resetField('date');
  };

  return (
    <div className="form mx-auto w-10/12">
      <h1 className='font-bold pb-4 text-xl'>Home</h1>
      <form id='form' onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="input-group">
            <input type="text" {...register('name')} placeholder='Salary, Groceries, House Rent, SIP, Travel Expenses...' className='form-input' style={{ width: '100%' }} required />
          </div>
          <select className='form-input' {...register('type')}>
          <option value="Savings" defaultValue>Savings</option>
            <option value="Expense">Expense</option>
            <option value="Investment">Investment</option>
           
          </select>
          <div className="input-group">
            <input type="text" {...register('amount')} placeholder='Amount' className='form-input' style={{ width: '100%' }} required/>
          </div>
          <div className="input-group">
            <input type="date" {...register('date')} className='form-input' style={{ width: '100%' }} required/>
          </div>
          <div className="submit-btn">
            <button className='border py-2 mt-2 text-white bg-green-400 w-9/12 hover:bg-emerald-500 rounded-md'>Make Transaction</button>
          </div>
        </div>    
      </form>
      <List></List>
    </div>
  )
}

