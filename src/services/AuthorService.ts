import { Author } from '@prisma/client';
import prisma from '../lib/prisma';
import { addAuthorVirtualFields } from '../utils/authorUtils';

type AuthorWithoutId = Omit<Author, 'id'>;

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

  static async createAuthor(authorData: AuthorWithoutId) {
    const author = await prisma.author.create({
      data: {
        first_name: authorData.first_name,
        family_name: authorData.family_name,
        date_of_birth: authorData.date_of_birth,
        date_of_death: authorData.date_of_death,
      },
    });

    return addAuthorVirtualFields(author);
  }

  static async deleteAuthor(id: number) {
    return await prisma.author.delete({ where: { id } });
  }

  static async updateAuthor(id: number, data: AuthorWithoutId) {
    const updatedAuthor = await prisma.author.update({
      where: { id },
      data: {
        first_name: data.first_name,
        family_name: data.family_name,
        date_of_birth: data.date_of_birth,
        date_of_death: data.date_of_death,
      },
    });

    return addAuthorVirtualFields(updatedAuthor);
  }
}

export default AuthorService;
