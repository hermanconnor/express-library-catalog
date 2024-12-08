import app from './app';

const PORT = process.env.PORT || '5000';

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const gracefulShutdown = () => {
  console.log('Starting graceful shutdown...');

  server.close(() => {
    console.log('Express server closed');
    process.exit(0);
  });
};

// Handle process termination signals
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  console.error(err.stack);
  process.exit(1);
});

// Handle unhandled rejections
process.on(
  'unhandledRejection',
  (reason: unknown, promise: Promise<unknown>) => {
    console.error('Unhandled Rejection at:', promise);

    if (reason instanceof Error) {
      console.error('Reason:', reason);
      console.error(reason.stack || 'No stack trace available');
    } else {
      console.error('Reason (non-error):', reason);
    }
  },
);
