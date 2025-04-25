import {bookWishListController} from "~/server/controllers/bookWishListController";
export default defineEventHandler(async (event) => {
    const method = event._method;

    if (!method) {
        return {
            success: false,
            error: "HTTP method is missing.",
        };
    }

    if (method === 'POST') {
        const body = await readBody(event);

        // Basic validation check for required fields
        if (!body.title || !body.author) {
            return {
                success: false,
                error: "Title and author are required fields.",
            };
        }

        return bookWishListController.createBook(event);
    } else if (method === 'GET') {
        return bookWishListController.getAllBooks();
    } else {
        return {
            success: false,
            error: `Method ${method} is not supported.`,
        };
    }
});