import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  console.log('User list route');
  res.json([{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }]);
  return;
});

export const path = '/users';
export { router };
