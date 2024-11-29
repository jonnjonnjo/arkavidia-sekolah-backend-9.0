import { db } from '../db/drizzle';
import { getTodoById,updateTodo, getTodoList,insertTodo} from '../repositories/todo.repository.ts';
import { putTodoRoute, getListTodoRoute, getTodoRoute,postTodoRoute } from '../routes/todo.route';
import { createRouter } from '../utils/router-factory';
import {PostTodobodySchema, PutTodoBodySchema} from '../types/todo.type.ts';

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

todoRouter.openapi(postTodoRoute, async (c) =>{
  const obj:PostTodoBodySchema = await c.req.json();
  const todo =  await insertTodo(db,obj); 
  return c.json(todo,201);
});

todoRouter.openapi(putTodoRoute, async (c) =>{
  const {id} = c.req.valid('param');
  const obj:PutTodoBodySchema = await c.req.json();
  const todo = await updateTodo(db,obj,id);
  return c.json(todo,200);
});
