// Write your tests here
const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')

const user = { username: 'Cooper', password: '123'}

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
	await db('users').truncate();
})

afterAll(async () => {
	await db.destroy();
})

test('sanity', () => {
  expect(false).toBe(false)
})

describe('[POST] Register new user', () => {
  it('Returns 201 status code', async () => {
    const res = await request(server).post('/api/auth/register').send(user)
    expect(res.status).toBe(201)
  })
  it('Returns new user', async () => {
    const res = await request(server).post('/api/auth/register').send(user)
    expect(res.body.username).toBe('Cooper')
  })
}) 
describe('[POST] LOGIN user', () => {
  it('Returns 200 status code', async () => {
    await request(server).post('/api/auth/register').send(user)
    const res = await request(server).post('/api/auth/login').send(user)
    expect(res.status).toBe(200)
  })
  it('Returns new user', async () => {
    await request(server).post('/api/auth/register').send(user)
    const res = await request(server).post('/api/auth/login').send(user)
    expect(res.body.message).toBe('welcome, Cooper')
  })
}) 

describe('[GET] /api/jokes', () => {
  it('Returns 200 status code', async () => {
    await request(server).post('/api/auth/register').send(user)
    const res = await request(server).post('/api/auth/login').send(user)
    expect(res.status).toBe(200)
  })
  it('Returns array of jokes', async() => {
    await request(server).post('/api/auth/register').send(user)
    const res = await request(server).post('/api/auth/login').send(user)
    const jokes = await request(server).get('/api/jokes').set('Authorization', res.body.token)
    expect(jokes.body).toHaveLength(3)
  })
})
