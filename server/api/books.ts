import { bookController } from '../controllers/bookController';

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

        return bookController.createBook(event);
    } else if (method === 'GET') {
        const query = getQuery(event);
        const id = query.id as string;
        if (id) {
            return bookController.getBookById(id);
        }
        else {
            return bookController.getAllBooks();
        }
        } else {
        return {
            success: false,
            error: `Method ${method} is not supported.`,
        };
    }
});
