import { Book } from '@prisma/client';
import { BookType } from '../lib/validation';
import prisma from '../lib/prisma';
import { addAuthorVirtualFields } from '../utils/authorUtils';

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

  static async getBookById(id: number) {
    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        author: true,
        genres: true,
      },
    });

    if (!book) throw new Error('Book not found');

    if (book.author) {
      book.author = addAuthorVirtualFields(book.author);
    }

    return this.addVirtualFields(book);
  }

  static async createBook(bookData: BookType) {
    const book = await prisma.book.create({
      data: {
        title: bookData.title,
        summary: bookData.summary,
        isbn: bookData.isbn,
        author: { connect: { id: parseInt(bookData.author, 10) } },
        genres: bookData.genre
          ? {
              connect: bookData.genre.map((id) => ({ id: parseInt(id, 10) })),
            }
          : undefined,
      },
    });

    return this.addVirtualFields(book);
  }

  static async deleteBook(id: number) {
    return await prisma.book.delete({
      where: { id },
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
