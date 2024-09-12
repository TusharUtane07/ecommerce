import mongoose, { Document, Model, Schema } from "mongoose";

export interface WishlistT extends Document {
    user: mongoose.Schema.Types.ObjectId;
    products: mongoose.Schema.Types.ObjectId[];
}

const WishlistSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: true
        }
    ]
})

const Wishlist: Model<WishlistT> = mongoose.models.Wishlist || mongoose.model<WishlistT>("Wishlist", WishlistSchema);

export default Wishlist;