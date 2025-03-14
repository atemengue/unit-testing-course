import { Response } from 'express'

export interface HttpResponse {
  status: number,
  body: any
}
