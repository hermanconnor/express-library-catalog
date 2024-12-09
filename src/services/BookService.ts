import { Book } from '@prisma/client';
import prisma from '../lib/prisma';

class BookService {
  static async getCount() {
    return await prisma.book.count();
  }

  static async getAllBooks() {
    const books = await prisma.book.findMany({
      include: {
        author: true,
        genres: true,
      },
    });

    return books.map((book) => {
      return this.addVirtualFields(book);
    });
  }

  private static addVirtualFields(book: Book) {
    return {
      ...book,
      url: `/catalog/book/${book.id}`,
    };
  }
}

export default BookService;
