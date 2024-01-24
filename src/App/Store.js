import { configureStore } from '@reduxjs/toolkit'
import logdinReducer from '../features/user/logdinSlice'
import activeUser from '../features/user/activeSlice'


export default configureStore({
  reducer: {
    logdin : logdinReducer,
    active: activeUser
  },
})