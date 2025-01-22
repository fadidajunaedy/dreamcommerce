import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    products: [],
    total: 0
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isProductExist = state.products.find(product => product.id === action.payload.id)
            if (isProductExist) {
                isProductExist.quantity++ 
                isProductExist.total_price = isProductExist.price * isProductExist.quantity
                
                let total = 0
                state.products.forEach(item => total += item.total_price)
                state.total = total
                return
            }

            state.products.push({ ...action.payload, quantity: 1, total_price: action.payload.price })
            
            let total = 0
            state.products.forEach(item => total += item.total_price)
            state.total = total
        },

        decreaseQuantityCart: (state, action) => {
            const product = state.products.find(product => product.id === action.payload.id)
            if (product.quantity == 1) {
                const filterCart = state.products.filter(product => product.id !== action.payload.id)
                state.products = filterCart
            } else {
                product.quantity--  
                product.total_price = product.price * product.quantity
            }
            
            let total = 0
            state.products.forEach(item => total += item.total_price)
            state.total = total
        },

        deleteCart: (state, action) => {
            const filterCart = state.products.filter(product => product.id !== action.payload.id)
            state.products = filterCart

            let total = 0
            state.products.forEach(item => total += item.total_price)
            state.total = total
        }
    }
})

export const { addToCart, decreaseQuantityCart, deleteCart } = cartSlice.actions
export default cartSlice.reducer