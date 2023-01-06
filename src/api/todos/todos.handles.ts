import { NextFunction, Request, Response } from 'express';
import { InsertOneResult } from 'mongodb';
import { ZodError } from 'zod';
import { Todos, TodoWithId, Todo } from './todos.model';

export const findAll = async (
  req: Request,
  res: Response<TodoWithId[]>,
  next: NextFunction
) => {
  try {
    const result = await Todos.find();
    const todos = await result.toArray();
    res.json(todos);
  } catch (error) {
    next(error)
  }
};

export const createOne = async (
  req: Request<{}, TodoWithId, Todo>,
  res: Response<TodoWithId>,
  next: NextFunction
) => {
  try {
   const validateResult = await Todo.parseAsync(req.body)
   const insertResult = await Todos.insertOne(validateResult)
   if(!insertResult.acknowledged) throw new Error('Error inserting todo')
   res.status(201)
   res.json({
    _id: insertResult.insertedId,
    ...validateResult,
   })
  } catch (error) {
    if (error instanceof ZodError) {
        res.status(422)
    }
    next(error)
  }
};
