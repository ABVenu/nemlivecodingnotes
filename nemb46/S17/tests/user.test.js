require("dotenv").config()
const request = require('supertest');
const app = require("../server");
const mongoose = require("mongoose")


/// start testing the user signup routes

beforeAll(async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB in Jest")
    }catch(err){
        console.log(err)
        console.log("Err in connecting DB in Jest")
    }
})

afterAll(async () => {
  try{
     await mongoose.connection.dropDatabase() 
     await mongoose.connection.close();
   console.log("Connection Closed")
  }catch(err){
    console.log("Err in closing the conection")
  }
});


/// signup/login testcases
/// Integration testing 
/// All unit testing under one head

describe("User Auth Integration Testing", ()=>{
    /// Unit Test Cases Here

    test("User Signup Test", async ()=>{
        let res = await request(app)
        .post("/users/signup")
        .send({name:"Test User", email:"test@gmail.com", password:"pass@123"})

        expect(res.statusCode).toBe(201)
        expect(res.body.message).toBe("Signup Success")
    })


    test("User Login", async()=>{
        let res = await request(app)
        .post("/users/login")
        .send({email:"test@gmail.com", password:"pass@123"})
        
        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe("Login Success")
        expect(res.body.token).toBeDefined()
    })
})