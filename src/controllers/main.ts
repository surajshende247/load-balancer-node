import { Request, Response } from 'express';

export const getHealth = async (req: Request, res: Response) => {
  res.json({ status: 'UP and running' });
}

export const getPing = async (req: Request, res: Response) => {
  res.json({ status: 'PONG' });
}

export const postPing = async (req: Request, res: Response) => {
  res.json({ status: 'PONG' });
}
