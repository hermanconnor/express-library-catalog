import { BookInstance } from '@prisma/client';
import prisma from '../lib/prisma';
import { formatDueBack, formatDueBackToISO } from '../utils/bookinstanceUtils';
import { BookinstanceType } from '../lib/validation';

class BookinstanceService {
  static async getCount(where?: Record<string, unknown>) {
    return await prisma.bookInstance.count({ where });
  }

  static async getAllBookInstances() {
    const bookInstances = await prisma.bookInstance.findMany({
      include: {
        book: true,
      },
    });

    return bookInstances.map((bookInstance) =>
      this.addVirtualFields(bookInstance),
    );
  }

  static async getBookCopies() {
    return await prisma.book.findMany({
      select: { id: true, title: true },
      orderBy: { title: 'asc' },
    });
  }

  static async getBookInstanceById(id: number) {
    const bookInstance = await prisma.bookInstance.findUnique({
      where: { id },
      include: {
        book: true,
      },
    });

    if (!bookInstance) throw new Error('Book instance not found');

    return this.addVirtualFields(bookInstance);
  }

  static async getBookInstancesByBookId(bookId: number) {
    const bookInstances = await prisma.bookInstance.findMany({
      where: { bookId },
    });

    return bookInstances.map((bookInstance) =>
      this.addVirtualFields(bookInstance),
    );
  }

  static async createBookinstance(data: BookinstanceType) {
    const bookInstance = await prisma.bookInstance.create({
      data: {
        bookId: Number(data.book),
        imprint: data.imprint,
        status: data.status,
        due_back: data.due_back,
      },
    });

    return this.addVirtualFields(bookInstance);
  }

  static async deleteBookinstance(id: number) {
    return await prisma.bookInstance.delete({
      where: { id },
    });
  }

  static async updateBookinstance(id: number, data: BookinstanceType) {
    const bookInstance = await prisma.bookInstance.update({
      where: { id },
      data: {
        bookId: Number(data.book),
        imprint: data.imprint,
        status: data.status,
        due_back: data.due_back,
      },
    });

    return this.addVirtualFields(bookInstance);
  }

  private static addVirtualFields(bookInstance: BookInstance) {
    return {
      ...bookInstance,
      url: `/catalog/bookinstance/${bookInstance.id}`,
      due_back_formatted: formatDueBack(bookInstance.due_back),
      due_back_yyyy_mm_dd: formatDueBackToISO(bookInstance.due_back),
    };
  }
}

export default BookinstanceService;
