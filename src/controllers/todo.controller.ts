import { db } from '../db/drizzle';
import { getTodoById } from '../repositories/todo.repository';
import { getTodoList } from  '../repositories/todo.repository';
import { getListTodoRoute} from '../routes/todo.route';
import { getTodoRoute } from '../routes/todo.route';
import { createRouter } from '../utils/router-factory';

export const todoRouter = createRouter();

todoRouter.openapi(getTodoRoute, async (c) => {
	const { id } = c.req.valid('param');
	const todo = await getTodoById(db, id);
	return c.json(todo, 200);
});


todoRouter.openapi(getListTodoRoute, async (c) =>{
  const {isCompleted,userId} = c.req.valid('query');
  const todo = await getTodoList(db,userId,isCompleted);
  return c.json(todo,200);
});
