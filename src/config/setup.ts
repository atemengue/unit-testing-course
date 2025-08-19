import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import Category from '../../src/models/category';
import Inventory from '../../src/models/inventory';
import Order from '../../src/models/order';
import Product from '../../src/models/product';
import User from '../../src/models/user';


let mongodb: MongoMemoryServer;

const seedDatabase = async () => {
  
    // nettoyage
  await Category.deleteMany();
  await Product.deleteMany();
  await User.deleteMany();
  await Order.deleteMany();

  // seed data
  await Category.create({ name: 'Coffee Chaud', description: "", imageUrl: "www.imageurl.test"});
  const category = await Category.create({ name: 'Coffee Froid', description: "", imageUrl: "www.imageurl.test"});

  const product = await Product.create({
    name: 'ICE LATE',
    description: "Ice late coffee froid",
    imageUrl: "url-image",
    stock: 5,
    categoryId: category?.id
  });

  await Inventory.create({
    quantity: product.stock,
    productId: product?.id
  });
  
  const user = await User.create({
    name: 'herve',
    email: "herve@email.com",
    password: "12345678"
  });

  const user1 = await User.create({
    name: "authuser1",
    email: "authuser@email.com",
    password: "1234abcDE"
  })
}

const setupTestDB = async () => {

  mongodb = await MongoMemoryServer.create();
  const uri = mongodb.getUri();

  await mongoose.connect(uri);

}

const tearDownTestDB = async () => {
  // 1 suppression des collections
  const collections = await mongoose.connection?.db?.collections();
  if (collections) {
    for(let collection of collections) {
      await collection.deleteMany({});
    }
  }
  // 2. deconnexion instance
    await mongoose.disconnect();
  // 3. arret du serveur
  await mongodb.stop()

}

export {
  seedDatabase, setupTestDB,
  tearDownTestDB
};



