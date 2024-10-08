import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductDetails {
    price: string;
}

interface PurchasingProductState {
    product: ProductDetails | null;
}

const initialState: PurchasingProductState = {
    product: null
}

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        addProductToPurchaseList: (state, action: PayloadAction<ProductDetails>) => {
            state.product = action.payload
        },
        clearProductToPurchaseList: (state) => {
            state.product = null;
        }
    }
})

export const { addProductToPurchaseList, clearProductToPurchaseList } = checkoutSlice.actions;
export default checkoutSlice.reducer;
