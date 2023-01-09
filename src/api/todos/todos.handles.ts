import { NextFunction, Request, Response } from 'express';
import { InsertOneResult, ObjectId } from 'mongodb';
import { ZodError } from 'zod';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
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
   const insertResult = await Todos.insertOne(req.body)
   if(!insertResult.acknowledged) throw new Error('Error inserting todo')
   res.status(201)
   res.json({
    _id: insertResult.insertedId,
    ...req.body,
   })
  } catch (error) {
    next(error)
  }
};

export const findOne = async ( req: Request<ParamsWithId, TodoWithId, {}> , res: Response<TodoWithId>, next: NextFunction) => {
  try {
    const result = await Todos.findOne({
      _id: new ObjectId(req.params.id),
    })
    if(!result){
      res.status(404)
      throw new Error(`Todo with id "${req.params.id}" was not found!`)
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
}

export const updateOne = async (req: Request<{},TodoWithId, Todo>, res: Response<TodoWithId>, next: NextFunction) => {
  try {
    
  } catch (error) {
    next(error)
  }
}