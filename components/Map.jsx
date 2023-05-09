import React from 'react'

const Map = ({longitude,latitude}) => {
  const testRequest = async ()=>{
    const response = await fetch(`../api/sentToServer`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        container_id : '045045---- 145'
      })
    })
    const data = await response.json()
    console.log(data)
  }
  return (
    <div className='h-[350px] w-[700px] bg-slate-900 text-white'>
        {(longitude && latitude) ? (
          
            <div>{longitude}--{latitude}</div>
        ):(
            <div> no values yet</div>
        )}
        <button onClick={testRequest}>Test request</button>
    </div>
  )
}

export default Map