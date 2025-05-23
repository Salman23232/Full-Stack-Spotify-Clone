import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import songRouter from './src/routes/songRouter.js';
import { connect } from 'mongoose';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/albumRoute.js';

dotenv.config()

// app config

const app = express();
const port = process.env.PORT || 4000
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors({
    origin:['https://musiclovers2.onrender.com', 'https://adminmusify.vercel.app']
}
))
    
// initializing routes
app.use("/api/song",songRouter) 
app.use('/api/album',albumRouter)

app.get('/',(req, res)=>
res.send("API Working") 
)

app.listen(port,()=>console.log(`Server started at on ${port}`)
)
