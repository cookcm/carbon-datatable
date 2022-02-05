import {createSlice} from '@reduxjs/toolkit'

const slice = 'crossword'

const initialState = {
    favorites:[],
    // readyList:[]
}

const crosswordSlice = createSlice({
    name: slice,
    initialState: initialState,
    reducers: {
        addRemoveFavorite(state, action){
            if(!state.favorites.includes(action.payload)){
                state.favorites.push(action.payload)
            }else{
                state.favorites = state.favorites.filter((fav) => fav !== action.payload)
            }
        },
        // addRemoveReady(state, action){
        //     if(!state.readyList.includes(action.payload)){
        //         state.readyList.push(action.payload)
        //     }else{
        //         state.readyList = state.readyList.filter((ready) => ready !== action.payload)
        //     }
        // }
    }
})

export const selectFavorites = (state) => {
  if (!state || !state[slice]) return ''
    return state[slice].favorites
}
// export const selectReady = (state) => {
//   if (!state || !state[slice]) return ''
//     return state[slice].readyList
// }  

export const { addRemoveFavorite } = crosswordSlice.actions

export const reducer = crosswordSlice.reducer