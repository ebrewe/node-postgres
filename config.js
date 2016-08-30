var connectionString = process.env.DATABASE_URL || 'postgres://postgres:password123@localhost:5432/todo';

module.exports = connectionString;
