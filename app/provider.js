import React from 'react';
import {AppProvider} from '@/context/AppContext'

const Provider = ({children}) => {
  return (
    <AppProvider>{children}</AppProvider>
  )
}

export default Provider