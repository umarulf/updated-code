
// original 

import React from 'react'
import {default as api} from '../store/apiSlice';
import { getLabels } from '../helper/helper';
 
export default function Labels() {
 
   const { data, isFetching , isSuccess, isError } = api.useGetLabelsQuery()
    let Transactions;
 
   
 
    if(isFetching){
        Transactions = <div>Fetching</div>;
    }else if(isSuccess){
        Transactions = getLabels(data, 'type').map((v, i) => <LabelComponent key={i} data={v}></LabelComponent>);
    }else if(isError){
        Transactions = <div>Error</div>
    }
 
  return (
    <div className="flex flex-col pt-2 pb-20 gap-2">
        <h1 className=' font-bold text-xl'>Overview</h1>
        {Transactions}
    </div>
  )
}
 
function LabelComponent({ data }){
    if(!data) return <></>;
    return (
        
        <div className="labels flex justify-between">
            <div className="flex gap-2">
                <div className='w-6 h-2 rounded py-3' style={{background: data.color ?? '#f9c74f'}}></div>
                <h3 className='text-md'>{data.type ?? ''}</h3>
            </div>
            <h3 className='font-bold'>{Math.round(data.percent) ?? 0}%</h3>
        </div>
    )
}
 