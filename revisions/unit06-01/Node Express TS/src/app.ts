import express from 'express';
import dotenv from 'dotenv';
import router from './routes/auth.routes';

dotenv.config();
const app = express();

app.use(express.json());
app.use("/test", (req,res)=>{
    try{
        res.status(200).json({message:"This is test route"})
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Something went wrong"})
    }
})
app.use('/api/auth', router);

export default app;
