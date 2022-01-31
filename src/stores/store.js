/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

 import {configureStore, combineReducers} from '@reduxjs/toolkit'
 import {reducer as crossword} from './crosswordSlice'
 
 const combinedReducer = combineReducers({
   crossword
 })
 
 const rootReducer = (state, action) => {
   return combinedReducer(state, action)
 }
 
 const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware({
       serializableCheck: false
     })
 })
 
 export default store
 