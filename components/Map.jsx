import React from 'react'

const Map = ({longitude,latitude}) => {
  return (
    <div className='h-[350px] w-[700px] bg-slate-900 text-white'>
        {(longitude && latitude) ? (
          
            <div>{longitude}--{latitude}</div>
        ):(
            <div> no values yet</div>
        )}
    </div>
  )
}

export default Map