import {BooksWishList} from '../models/booksWishList'
import {z} from 'zod'
import Books from "~/server/api/books";

const booksWishListSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    coverUrl: z.string().url("Invalid URL format for cover image").optional(),
})

export const bookWishListService = {
    createBook: async(data: any) => {
        try {
            // Validate the input data
            const validatedData = booksWishListSchema.parse(data);

            // Fetch the cover URL from the external API
            const apiUrl = `https://bookcover.longitood.com/bookcover?book_title=${encodeURIComponent(validatedData.title)}&author_name=${encodeURIComponent(validatedData.author)}`;
            const response = await fetch(apiUrl);
            const apiResult = await response.json();

            if (apiResult.url) {
                validatedData.coverUrl = apiResult.url; // Add the cover URL if found
            } else {
                console.warn(`Cover image not found for book: ${validatedData.title} by ${validatedData.author}`);
            }

            // Create and save the book
            const book = new BooksWishList(validatedData);
            await book.save();

            console.log("Book created successfully:", book);
            return { success: true, data: book };
        } catch (error: any) {
            console.error("Error creating book:", error);
            return { success: false, error: error instanceof z.ZodError ? error.errors : error.message };
        }
    },
    getAllBooks: async() => {
        try {
            // Fetch all books
            const books = await BooksWishList.find();

            console.log("Books retrieved successfully:", books);
            return { success: true, data: books };
        } catch (error: any) {
            console.error("Error retrieving books:", error);
            return { success: false, error: error.message };
        }
    }
}