import { configureStore } from "@reduxjs/toolkit"

import cartReducer from "./cartSlice"
import wishlistReducer from "./wishlistSlice"

import storage from "redux-persist/lib/storage"
import { persistStore, persistReducer } from "redux-persist"

const persistCartConfig = {
    key: "cart",
    storage
}

const persistWishlistConfig = {
    key: "wishlist",
    storage
}

const persistedCart = persistReducer(persistCartConfig, cartReducer)
const persistedWishlist = persistReducer(persistWishlistConfig, wishlistReducer)

export const store = configureStore({
    reducer: {
        cart: persistedCart,
        wishlist: persistedWishlist
    },
    devTools: true
})

export const persistor = persistStore(store)