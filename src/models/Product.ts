import mongoose, { Document, model, models, Schema } from "mongoose";

export interface ProductT extends Document {
  name: string;
  price: string;
  description: string;
  category: string;
  brand: string;
  imageUrl: string;
}

const ProductSchema = new Schema<ProductT>({
  name: {
    type: String,
    required: [true, "Product Name is required"],
    minLength: [3, "Product Name must be at least 3 characters long"],
    maxLength: [100, "Product Name must not exceed 100 characters"],
  },
  price: {
    type: String,
    required: [true, "Product Price is required"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
  },
  imageUrl: {
    type: String,
    required: [true, "Image Url is required"],
  },
  brand: {
    type: String,
    required: [true, "Product brand is required"],
  },
});

const Product = models.Product || model<ProductT>("Product", ProductSchema);
export default Product;
