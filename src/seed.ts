import mongoose from 'mongoose';
import Category from './models/category';

const categories = [
  { name: 'Electronics', description: 'Devices and gadgets' },
  { name: 'Books', description: 'Printed and digital books' },
  { name: 'Clothing', description: 'Apparel and accessories' },
  { name: 'Home', description: 'Home appliances and furniture' },
  { name: 'Sports', description: 'Sporting goods and equipment' },
];

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/coffee', );
  await Category.deleteMany({});
  await Category.insertMany(categories);
  console.log('Categories seeded!');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});