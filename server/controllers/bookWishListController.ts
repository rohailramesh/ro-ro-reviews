import {bookWishListService} from "~/server/services/bookWishListService";
import {readBody} from "h3";

export const bookWishListController = {
    createBook: async (event: any) => {
        try {
            const body = await readBody(event);
            const result = await bookWishListService.createBook(body);

            if (result.success) {
                return {success: true, data: result.data};
            } else {
                return {success: false, error: result.error};
            }
        } catch (error: any) {
            console.error("Error in createBook controller:", error);
            return {success: false, error: error.message || "An unexpected error occurred"};
        }
    },

    getAllBooks: async () => {
        try {
            const result = await bookWishListService.getAllBooks();

            if (result.success) {
                return {success: true, data: result.data};
            } else {
                return {success: false, error: result.error};
            }
        } catch (error: any) {
            console.error("Error in getAllBooks controller:", error);
            return {success: false, error: error.message || "An unexpected error occurred"};
        }
    },
}