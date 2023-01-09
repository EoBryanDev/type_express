import { Router } from 'express';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { validateRequest } from '../../middlewares';
import * as TodoHandler from './todos.handles';
import { Todo } from './todos.model';

const router = Router();

router.get('/', TodoHandler.findAll);

router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  TodoHandler.findOne
);

router.post(
  '/',
  validateRequest({
    body: Todo,
  }),
  TodoHandler.createOne
);

router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: Todo,
  }),
  TodoHandler.updateOne
);

router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  TodoHandler.deleteOne
);

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
