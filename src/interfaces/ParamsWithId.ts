import { ObjectId } from 'mongodb'
import * as z from 'zod'

export const ParamsWithId = z.object({
    id:z.string().min(1).refine((value) => {
        try{
        return new ObjectId(value)
    } catch (error) {
        return false;
    }}, {
        message: 'Invalid ObjectId'
    }),
})

export type ParamsWithId = z.infer<typeof ParamsWithId>