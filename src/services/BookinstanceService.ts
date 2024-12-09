import prisma from '../lib/prisma';

class BookinstanceService {
  static async getCount(where?: Record<string, unknown>) {
    return await prisma.bookInstance.count({ where });
  }
}

export default BookinstanceService;
