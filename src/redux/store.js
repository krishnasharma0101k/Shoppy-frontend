import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../redux/cardSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer
    }
})

export default store