import { Book } from '../models/books';
import { z } from 'zod';

// Define a schema for validation using zod
const bookSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    genre: z.array(z.string()).nonempty("At least one genre is required"),
    read: z.boolean().default(false),
    fictionType: z.enum(["fiction", "non-fiction"], {
        errorMap: () => ({ message: "Fiction type must be either 'fiction' or 'non-fiction'" }),
    }),
    literatureOrigin: z.string().min(1, "Literature origin is required"),
    coverUrl: z.string().url("Invalid URL format for cover image").optional(),
    reviewed: z.boolean().default(false),
    reviewText: z.string().min(1, "Review text is required"),
});

export const bookService = {
    createBook: async (data: any) => {
        try {
            // Validate the input data
            const validatedData = bookSchema.parse(data);

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
            const book = new Book(validatedData);
            await book.save();

            console.log("Book created successfully:", book);
            return { success: true, data: book };
        } catch (error: any) {
            console.error("Error creating book:", error);
            return { success: false, error: error instanceof z.ZodError ? error.errors : error.message };
        }
    },

    getAllBooks: async () => {
        try {
            // Fetch all books
            const books = await Book.find();

            console.log("Books retrieved successfully:", books);
            return { success: true, data: books };
        } catch (error: any) {
            console.error("Error retrieving books:", error);
            return { success: false, error: error.message };
        }
    },
    getBookById: async (id: string) => {
        try {
            // Fetch a book by ID
            const book = await Book.findById(id);

            if (!book) {
                return { success: false, error: "Book not found" };
            }

            console.log("Book retrieved successfully:", book);
            return { success: true, data: book };
        } catch (error: any) {
            console.error("Error retrieving book:", error);
            return { success: false, error: error.message };
        }
    },

};