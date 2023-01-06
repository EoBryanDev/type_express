import { Router } from 'express';
import * as TodoHandler from './todos.handles'


const router = Router();

router.get('/',  TodoHandler.findAll);
router.post('/',  TodoHandler.createOne);

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
