import { Request, Response } from 'express';
import { beforeEach } from 'node:test';
import { describe, expect, it, vi } from 'vitest';
import orderController from '../../src/controllers/order.controller';
import { NotFoundError } from '../../src/errors';
import Order from '../../src/models/order';

vi.mock('../../src/models/order', () => {
  return {
    default: {
    findById: vi.fn(),
    }
  }
});

describe('getOrder', () => {
  // let req: Partial<Request>;
  // let res: Partial<Response>;

  beforeEach(() => {
    vi.resetAllMocks();
  }
  );

  it('should throw NotFoundError if order is not found', async () => {

          // Arrange
        const  req = {
            params: {
              id: '123'
            }
            }  as unknown as Request;
      
          const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn()
            } as unknown as Response;

        
    (Order.findById as any).mockResolvedValue(null);

    await expect(orderController.getOrder(req , res)).rejects.toThrow(NotFoundError);
  });

  it('should return 500 with a server error message if order is found', async () => {
    
          // Arrange
          const  req = {
            params: {
              id: '123'
            }
            }  as unknown as Request;
      
          const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn()
            } as unknown as Response;

    
    (Order.findById as any).mockResolvedValue({ id: '123' });
    
    await orderController.getOrder(req as Request, res as Response);

    expect(Order.findById).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ message: 'Server Error' });
  });
});