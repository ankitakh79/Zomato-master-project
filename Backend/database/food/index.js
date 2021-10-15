import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({ 

    name: { type: String, requires: true },
    descript: { type: String, require: true },
    isVeg: { type: Boolean, require: true },
    isContainsEgg: { type: Boolean, required: true },
    category: { type: String, required: true },
    photos: {
        type: mongoose.Types.ObjectId,
        ref: "Images",        
    },
    price: { type: Number, default: 150,reduired: true },
    addOns: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Foods",
        },
    ],
    restaurant: {
        type: mongoose.Types.ObjectId,
        ref: "Restaurants",
        required: true,
    },
    reviews: {
        type: mongoose.Types.ObjectId,
        ref: "Reviews",
    },
 },
    {
        timestamps: true,
    }
 );

 export const FoodModel = mongoose.model("Foods", FoodSchema);