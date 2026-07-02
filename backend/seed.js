require('dotenv').config();
const seedDatabase = require('./seed-runner');

seedDatabase()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Database seeding failed:', err);
    process.exit(1);
  });
