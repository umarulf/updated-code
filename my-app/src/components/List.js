import React from 'react';
import 'boxicons';
import { default as api } from '../store/apiSlice';

export default function List() {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  const [deleteTransaction] = api.useDeleteTransactionMutation();
  let Transactions;

  const handlerClick = (id) => {
    if (!id) return 0;
    deleteTransaction(id);
  };

  if (isFetching) {
    Transactions = <div>Fetching</div>; //
  } else if (isSuccess) {
    Transactions = data.map((v, i) => (
      <Transaction key={i} category={v} handler={handlerClick} showDetails={i === 0}></Transaction>
    ));
    // console.log(data);
  } else if (isError) {
    Transactions = <div>Error</div>; //
  }

  return (
    <div className="flex flex-col pt-4 pb-1 gap-2">
      
      <h1 className='pt-3 pb-3 font-bold text-xl'>
           My Expenditures <box-icon type='solid' color='grey' name='hand-down'></box-icon>{' '}
      </h1>
           <thead>
           
              <tr>
                <th className='pl-24 py-2 ' style={{ color: 'green', textDecoration: 'underline' }}>Spendings</th>
                <th className='pl-20 py-2 ' style={{ color: 'green', textDecoration: 'underline' }}>Category</th>
                <th className='pl-24 py-2 ' style={{ color: 'green', textDecoration: 'underline' }}>Date</th>
                <th className='pl-20 py-2 ' style={{ color: 'green', textDecoration: 'underline' }}>Amount</th>
              </tr>
          
          </thead>

           {Transactions}
    </div>
  );
}

function Transaction({ category, handler, showDetails }) {
  if (!category) return null;

  // og 

  const { id, _id, name, color, amount, date, type } = category;

  // Function to format the amount as currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  return (
    <div className="item flex bg-gray-50 py-2 rounded-r gap-2" style={{ borderRight: `8px solid ${color ?? '#e5e5e5'}` }}>
      <button className='ml-4' onClick={() => handler(id)}>
        <box-icon data-id={_id ?? ''} color={color ?? '#e5e5e5'} size="22px" name="trash"></box-icon>
      </button>
      <div>
        <table className="w-full" style={{ tableLayout: 'fixed' }}>
       
          <tbody>
            <tr> 
              <td className='px-4 py-2 w-[180px] overflow-hidden overflow-ellipsis whitespace-nowrap'>{name}</td>
              <td className='px-4 py-2 w-[154px] overflow-hidden overflow-ellipsis whitespace-nowrap'>{type}</td>
              <td className='px-4 py-2 w-[120px] overflow-hidden overflow-ellipsis whitespace-nowrap'>{date}</td>
              {/* Format the amount as currency */}
              <td className='px-4 py-2 w-[143px] overflow-hidden overflow-ellipsis whitespace-nowrap'>{formatCurrency(amount)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
