import prisma from '../lib/prisma';

class AuthorService {
  static async getCount() {
    return await prisma.author.count();
  }
}

export default AuthorService;
