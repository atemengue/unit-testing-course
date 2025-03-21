import { Request, Response } from 'express';
import { HttpResponse } from '../protocols/http';

const expressWrapper = (controller: (req: Request) => Promise<HttpResponse>) => {
  return async (req: Request, res: Response) => {
    try {
      const result = await controller(req);
      res.status(result.status).send(result.body);
    } catch (error) {
      res.status(500).send({ message: 'Internal server error', error });
    }
  };
};

export default expressWrapper;