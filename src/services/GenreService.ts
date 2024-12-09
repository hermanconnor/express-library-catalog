import prisma from '../lib/prisma';

class GenreService {
  static async getCount() {
    return await prisma.genre.count();
  }
}

export default GenreService;
