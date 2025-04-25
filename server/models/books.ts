// File: models/book.ts
import { defineMongooseModel } from '#nuxt/mongoose'

export const Book = defineMongooseModel('Book', {
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    //genre is an array of strings
    genre: {
        type: [String],
        required: true,
    },
    fictionType: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        required: true,
    },
    reviewed: {
        type: Boolean,
        required: true,
    },
    reviewText: {
        type: String,
        required: false,
    },
    literatureOrigin: {
        type: String,
        required: true,
    },
    coverUrl: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
