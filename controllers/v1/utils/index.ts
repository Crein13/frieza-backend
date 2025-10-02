import type { Request, Response } from 'express';

const promiseController = (api: any) => async (req: Request, res: Response) => {
  try {
    const response = await api(req, res);
    res.json(response);
  } catch (error: Error | any) {
    console.log('promiseController', error);
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    });
  }
};

export default promiseController;