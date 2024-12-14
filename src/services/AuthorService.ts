import prisma from '../lib/prisma';
import { addAuthorVirtualFields } from '../utils/authorUtils';

class AuthorService {
  static async getCount() {
    return await prisma.author.count();
  }

  static async getAllAuthors() {
    const authors = await prisma.author.findMany({
      orderBy: { family_name: 'asc' },
    });

    return authors.map((author) => addAuthorVirtualFields(author));
  }

  static async getAuthorById(id: number) {
    const author = await prisma.author.findUnique({
      where: { id },
    });

    if (!author) throw new Error('Author not found');

    return addAuthorVirtualFields(author);
  }
}

export default AuthorService;
