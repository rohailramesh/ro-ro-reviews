import {defineMongooseModel} from "#nuxt/mongoose";

export const BooksWishList = defineMongooseModel("BooksWishList", {
    title:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    coverUrl:{
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});