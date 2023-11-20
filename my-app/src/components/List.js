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
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    Transactions = data.map((v, i) => (
      <Transaction key={i} category={v} handler={handlerClick} showDetails={i === 0}></Transaction>
    ));
    console.log(data);
  } else if (isError) {
    Transactions = <div>Error</div>;
  }

  return (
    <div className="flex flex-col pt-4 pb-1 gap-4">
      <h1 className='pt-3 pb-3 font-bold text-xl'>
        {' '}
        My Expenditures <box-icon type='solid' color='grey' name='hand-down'></box-icon>{' '}
      </h1>

      {Transactions}
    </div>
  );
}

function Transaction({ category, handler, showDetails }) {
  if (!category) return null;

  const { id, _id, name, color, amount, date, type } = category;

  return (
    <div className="item flex bg-gray-50 py-2 rounded-r" style={{ borderRight: `8px solid ${color ?? '#e5e5e5'}` }}>
      <button className='ml-4' onClick={() => handler(id)}>
        <box-icon data-id={_id ?? ''} color={color ?? '#e5e5e5'} size="22px" name="trash"></box-icon>
      </button>
      <div>
        <table>
          <thead>
            {showDetails && (
              <tr>
                <th className='px-14'>Spendings</th>
                <th className='px-10'>Category</th>
                <th className='px-10'>Date</th>
                <th className='px-10'>Amount</th>
              </tr>
            )}
          </thead>
          <tbody>
            <tr>
              <td className='px-14'>{name}</td>
              <td className='px-10'>{type}</td>
              <td className='px-10'>{date}</td>
              <td className='px-10'>{amount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

