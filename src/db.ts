import { MongoClient } from 'mongodb';

const {
  MONGO_URI = 'mongodb+srv://admin:admin@api-challange.4ocpxz5.mongodb.net/test',
} = process.env;

export const client = new MongoClient(MONGO_URI);

export const db = client.db();
