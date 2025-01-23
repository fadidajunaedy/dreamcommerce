import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    products: [],
}

export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        toggleWishlist: (state, action) => {
            const isProductExist = state.products.find(product => product.id === action.payload.id)
            if (isProductExist) {
                const filterProducts = state.products.filter(product => product.id !== action.payload.id)
                state.products = filterProducts
                return
            }

            state.products.push(action.payload)
        },
    }
})

export const { toggleWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer