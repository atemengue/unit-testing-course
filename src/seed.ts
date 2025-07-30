import mongoose from 'mongoose';
import Category from './models/category';

const categories = [
  { name: 'Arabica', description: 'Goût doux, faible en caféine, souvent fruité ou floral'},
  { name: 'Robusta', description: 'Plus amer, plus corsé, plus de caféine, souvent utilisé dans l’espresso' },
  { name: 'Liberica', description: 'Goût unique, boisé, moins courant' },
  { name: 'Excelsa', description: 'Rare, saveur acidulée et complexe' },
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