import { Genre } from '@prisma/client';
import prisma from '../lib/prisma';
import { addBookUrl, addGenreWithBooks } from '../utils/genreUtils';
import { GenreType } from '../lib/validation';

class GenreService {
  static async getCount() {
    return await prisma.genre.count();
  }

  static async getAllGenres() {
    const genres = await prisma.genre.findMany({
      orderBy: { name: 'asc' },
    });

    return genres.map((genre) => this.addVirtualFields(genre));
  }

  static async getGenreById(id: number) {
    return await prisma.genre.findUnique({ where: { id } });
  }

  static async getGenreWithBooks(id: number) {
    const genre = await prisma.genre.findUnique({
      where: { id },
      include: {
        books: { select: { id: true, title: true, summary: true } },
      },
    });

    if (!genre) throw new Error('Genre not found');

    if (genre.books) {
      genre.books = genre.books.map((book) => addBookUrl(book));
    }

    return addGenreWithBooks(genre);
  }

  static async getGenreByName(name: string) {
    const genre = await prisma.genre.findFirst({
      where: {
        name: {
          equals: name,
        },
      },
    });

    return genre ? this.addVirtualFields(genre) : null;
  }

  static async createGenre(data: GenreType) {
    const genre = await prisma.genre.create({
      data: {
        name: data.name,
      },
    });

    return this.addVirtualFields(genre);
  }

  static async deleteGenre(id: number) {
    return await prisma.genre.delete({
      where: { id },
    });
  }

  static async updateGenre(id: number, name: string) {
    const genre = await prisma.genre.update({
      where: { id },
      data: {
        name,
      },
    });

    return this.addVirtualFields(genre);
  }

  private static addVirtualFields(genre: Genre) {
    return {
      ...genre,
      url: `/catalog/genre/${genre.id}`,
    };
  }
}

export default GenreService;
