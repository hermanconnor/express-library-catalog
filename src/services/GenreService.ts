import { Genre } from '@prisma/client';
import prisma from '../lib/prisma';

class GenreService {
  static async getCount() {
    return await prisma.genre.count();
  }

  static async getAllGenres() {
    const genres = await prisma.genre.findMany({
      orderBy: { name: 'asc' },
    });

    return genres.map((genre) => this.addGenreVirtualFields(genre));
  }

  private static addGenreVirtualFields = (genre: Genre) => {
    return {
      ...genre,
      url: `/catalog/genre/${genre.id}`,
    };
  };
}

export default GenreService;
