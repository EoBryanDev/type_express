import { Router, Request, Response } from 'express';
import {  Todos, TodoWithId } from './todos.model';

const router = Router();

router.get('/', async (req: Request, res: Response<TodoWithId[]>) => {
  const result = await Todos.find()
  const todos = await result.toArray()
  res.json(todos);
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
