import { Router, Request, Response } from 'express';
import Todo from './todos.model';

const router = Router();

router.get('/', (req: Request, res: Response<Todo[]>) => {
  res.json([
    {
      content: 'learn typescript',
      done: false,
    },
  ]);
});

/* router.get<{}, Todo[]>('/', (req, res) => {
  res.json([
    {
      content: 'learn typescript',
      done: false,
    },
  ]);
});
*/
export default router;
