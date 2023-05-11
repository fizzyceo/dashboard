import React from 'react'
import Containers from './Containers'

import Users from '../pages/Users'

const AdminMain = ({menu}) => {
  return (
    <div className='bg-green-400 flex-grow'>
      {menu==1  && <Containers/>}
      
      {menu==3  && <Users/>}
     
    </div>
  )
}

export default AdminMain