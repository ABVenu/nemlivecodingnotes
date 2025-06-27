/// all routes of server.js will be tested here
const request = require('supertest');
const app = require("../server");


test("This is first API Test Case", async ()=>{
    let res = await request(app).get("/test");  // this is duty of supertest
    expect(res.statusCode).toBe(200);  // This is jest
    expect(res.body.message).toBe("This is test route"); /// This is jest
})

