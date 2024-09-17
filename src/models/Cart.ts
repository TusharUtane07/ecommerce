import mongoose, { Document, Model, Schema } from "mongoose";

export interface CartT extends Document {
    user: mongoose.Schema.Types.ObjectId;
    products: {
        product: mongoose.Schema.Types.ObjectId;
        quantity: number;
        price: number;
    }[];
}

const CartSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
            price: {
                type: Number,
                required: true,
                min: 0,
            }
        }
    ]
})

const Cart: Model<CartT> = mongoose.models.Cart || mongoose.model<CartT>("Cart", CartSchema);

export default Cart;
