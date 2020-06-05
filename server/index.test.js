const request = require('supertest')
const app = require('./index')
const { expect } = require('chai')
const db = require('./db')
const seedUsers = require('../script/users.json')


describe('GET /users', () => {

  before(async () => {
    console.log("db", db)
    console.log("start", new Date())
    const sync = await db.sync({ force: true })
    console.log("after sync", new Date() + sync)

    const users = await db.models.user.bulkCreate(seedUsers)
    console.log("after bulk create", new Date() + users)

  })

  it('should return list of users', async () => {
    const res = await request(app).get('/api/users')
    expect(res.status).to.equal(200)
    expect(res.body.length).to.equal(seedUsers.length)

  })
})
