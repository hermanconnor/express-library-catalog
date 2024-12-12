import { BookInstance } from '@prisma/client';
import prisma from '../lib/prisma';
import { formatDueBack, formatDueBackToISO } from '../utils/bookinstanceUtils';

class BookinstanceService {
  static async getCount(where?: Record<string, unknown>) {
    return await prisma.bookInstance.count({ where });
  }

  static async getBookInstancesByBookId(bookId: number) {
    const bookInstances = await prisma.bookInstance.findMany({
      where: { bookId },
    });

    return bookInstances.map((bookInstance) =>
      this.addVirtualFields(bookInstance),
    );
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
