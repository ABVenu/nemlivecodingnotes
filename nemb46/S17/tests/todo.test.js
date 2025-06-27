require("dotenv").config()
const request = require('supertest');
const app = require("../server");

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

describe("Protected Routes Testing", ()=>{

    /// For Add Todo Testing, I need Token 
    /// How will i get token, i should call the login

    let token = "";

    test("User Signup Test", async ()=>{
        let res = await request(app)
        .post("/users/signup")
        .send({name:"Test User", email:"test1@gmail.com", password:"pass@123"})
    })

    test("User Login", async()=>{
            let res = await request(app)
            .post("/users/login")
            .send({email:"test1@gmail.com", password:"pass@123"})
            
            token = res.body.token;
            console.log("Token", res.body)
        })

    test("Add Todo - Protected Route", async()=>{
        

        let res = await request(app)
        .post("/todos/add-todo")
        .set({authorization:`bearer ${token}`})
        .send({title:"This is First Todo From Testing"})


        expect(res.statusCode).toBe(201)
        expect(res.body.message).toBe("Todo Added")
        expect(res.body.todo.title).toBeDefined()

        console.log("Todo Addition with Auth Passed")
    })
})