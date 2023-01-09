// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
import { Todos } from './todos.model';
import app from '../../app';

beforeAll(async () => {
  try {
    await Todos.drop();
  } catch (error) {}
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

let id = '';
describe('POST /api/v1', () => {
  it('responds an error if data is invalid', async () =>
    request(app)
      .post('/api/v1/todos')
      .set('Accept', 'application/json')
      .send({
        content: '',
      })
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      }));

  it('responds with an inserted object', async () =>
    request(app)
      .post('/api/v1/todos')
      .set('Accept', 'application/json')
      .send({
        content: 'Learn Typescript',
        done: false,
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        id = response.body._id;
        expect(response.body.content).toBe('Learn Typescript');
        expect(response.body).toHaveProperty('content');
        expect(response.body).toHaveProperty('done');
      }));
});

describe('GET /api/v1/todos/:id', () => {
  it('responds responds with an array of todos', async () =>
    request(app)
      .get(`/api/v1/todos/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
        expect(response.body.content).toBe('Learn Typescript');
        expect(response.body).toHaveProperty('content');
        expect(response.body).toHaveProperty('done');
      }));

  it('responds responds with an invalid ObjectId error', (done) => {
    request(app)
      .get(`/api/v1/todos/bcdhsfbchdsnckjdnsjkchkd`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done)
  });

  it('responds responds with a not found error', (done) => {
    request(app)
      .get(`/api/v1/todos/63bc8918027318a621a3133c`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done)
  });
});
