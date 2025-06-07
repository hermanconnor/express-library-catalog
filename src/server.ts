import app from './app';
import prisma from './lib/prisma';

const PORT = process.env.PORT || '5000';

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const gracefulShutdown = async (signal: string) => {
  console.log(`\nReceived signal: ${signal}. Initiating graceful shutdown...`);

  server.close(async (err) => {
    if (err) {
      console.error('Error closing server:', err);
      process.exit(1);
    }

    if (global.prisma) {
      await global.prisma.$disconnect();
      console.log('Prisma client disconnected from global.');
      delete global.prisma; // Clear it to allow re-initialization if needed
    } else {
      await prisma.$disconnect(); // Fallback in case `global.prisma` wasn't set or cleared
      console.log('Prisma client disconnected.');
    }

    console.log('Server closed.');
    console.log('Graceful shutdown complete. Exiting process.');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Forcing shutdown after timeout!');
    process.exit(1);
  }, 10000).unref(); // 10 seconds timeout, unref prevents this from keeping the event loop alive
};

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('--- Uncaught Exception ---');
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  // process.exit(1);

  gracefulShutdown('uncaughtException');
});

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('--- Unhandled Rejection ---');
  console.error('Reason:', reason);
  console.error('Promise:', promise);

  gracefulShutdown('unhandledRejection');
});

// Handle process termination signals
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGQUIT', () => gracefulShutdown('SIGQUIT'));
