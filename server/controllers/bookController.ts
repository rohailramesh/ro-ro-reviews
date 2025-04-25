import { bookService } from '../services/bookService';
import { readBody } from 'h3';

export const bookController = {
    createBook: async (event: any) => {
        try {
            const body = await readBody(event);
            const result = await bookService.createBook(body);

            if (result.success) {
                return { success: true, data: result.data };
            } else {
                return { success: false, error: result.error };
            }
        } catch (error: any) {
            console.error("Error in createBook controller:", error);
            return { success: false, error: error.message || "An unexpected error occurred" };
        }
    },

    getAllBooks: async () => {
        try {
            const result = await bookService.getAllBooks();

            if (result.success) {
                return { success: true, data: result.data };
            } else {
                return { success: false, error: result.error };
            }
        } catch (error: any) {
            console.error("Error in getAllBooks controller:", error);
            return { success: false, error: error.message || "An unexpected error occurred" };
        }
    },
    getBookById: async (id: string) => {
        try {
            const result = await bookService.getBookById(id);

            if (result.success) {
                return { success: true, data: result.data };
            } else {
                return { success: false, error: result.error };
            }
        } catch (error: any) {
            console.error("Error in getBookById controller:", error);
            return { success: false, error: error.message || "An unexpected error occurred" };
        }
    },

};
