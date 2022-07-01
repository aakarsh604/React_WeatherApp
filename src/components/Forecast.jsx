import React from 'react'
import { iconUrlFromCode } from '../services/weatherService'

const Forecast = ({title, items}) => {
console.log('items:', items)

  return (
    <div>
        
        <div className='flex items-center justify-start mt-6 '>
            <p className='text-white font-medium uppercase'>{title}</p>
        </div>
        <hr className='my-2'/>

        <div className='flex flex-row justify-between items-center text-white'>
        {items.map(data => (
                     <div key={data.title} className='flex flex-col justify-center items-center '>
                     <p className='font-light text-sm'>{data.title}</p>
                     <img src={iconUrlFromCode(data.icon)} className='w-12 my-1' />
                     <p className='font-medium'>{`${data.temp.toFixed()}°`}</p>
                 </div>
        ))}
        </div>
    </div>
  )
}

export default Forecast