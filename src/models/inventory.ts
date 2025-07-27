import { Schema, model } from 'mongoose';
import { IInventory } from '../types';

const InventorySchema: Schema = new Schema<IInventory>({
  quantity: { type: Number },
  productId: { type: Schema.Types.ObjectId, ref: 'Product' }
}, {
  timestamps: true
});

const Inventory = model<IInventory>('Inventory', InventorySchema);

export default Inventory;