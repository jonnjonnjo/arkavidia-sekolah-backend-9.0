import { eq,and } from 'drizzle-orm';
import type { Database } from '../db/drizzle';
import { todo } from '../db/schema/todo.schema';
import {PutTodoBodySchema, PostTodoBodySchema} from '../types/todo.type.ts';

export const getTodoById = async (db: Database, id: string) => {
	return await db.select().from(todo).where(eq(todo.id, id));
};

export const getTodoList = async(db:Database, userId?:string,isCompleted?:boolean) =>{
  const listFilters = [];
  
  // check for isCompleted
  if(isCompleted !== undefined){
    listFilters.push(eq(todo.isCompleted,isCompleted));
  }

  // check for userId
  if(userId !== undefined){
    listFilters.push(eq(todo.authorId,userId));
  }

  const combineAll = listFilters.length > 0 ? and(...listFilters) : undefined;

  return await db.select().from(todo).where(combineAll);
};

export const insertTodo = async(db:Database, todoInsert: PostTodoBodySchema) =>{
  return await db.insert(todo).values(todoInsert).returning();
};

export const updateTodo = async(db:Database, todoUpdate:PutTodoBodySchema, id:String)=>{
  return await db.update(todo).set(todoUpdate).where(eq(todo.id,id)).returning(); 
}

export const deleteTodo = async(db:Database, id:string)=>{
  return await db.delete(todo).where(eq(todo.id,id)).returning();
}
