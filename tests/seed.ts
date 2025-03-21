import { Mongoose } from 'mongoose';
import Category from '../src/models/category'; // Adjust the path as needed
import Product from '../src/models/product'; // Adjust the path as needed
import { OrderStatus } from '../src/types';

export class SeedData {
  /**
   * Seed the database with initial data.
   * @param mongoose - The Mongoose instance connected to the database.
   */
  static async seed(mongoose: Mongoose) {
    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});

    // Seed categories
    const category1 = await Category.create({ name: 'Electronics', description: '', imageUrl: '' });
    await Category.create({ name: 'Books', description: '', imageUrl: '' });

    // Seed products
    const product = await Product.create({
      name: 'Latte',
      description: 'description',
      imageUrl: 'url-image',
      stock: 15,
      price: 150,
      categoryId: category1.id,
    });



    console.log('Database seeded successfully!');
  }
}