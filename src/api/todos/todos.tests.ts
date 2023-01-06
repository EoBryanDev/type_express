// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
import { Todos } from './todos.model';
import app from '../../app';

beforeAll(async () => {
  try {
    await Todos.drop();
    
  } catch (error) {
    
  }
});

describe('GET /api/v1', () => {
  it('responds responds with an array of todos', async () =>
    request(app)
      .get('/api/v1/todos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(0);

      }));
});
