import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import { addFood } from './controllers/foodController.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js'
import bcryptjs from 'bcryptjs';
import path from 'path'; 
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
//app config 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express()
const port = process.env.PORT || 4000

// middleware 

app.use(express.json())
app.use(cors({
    origin: "https://fullstack-app-admin.onrender.com/"
}))
app.use('/images', express.static(join(__dirname, 'uploads')));

// DB Connection 
connectDB();


app.get('/', (req,res) => {
    res.send('API IS WORKING FINE')
})


//api endpoints 

app.use('/api/food', foodRouter)
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use("/api/cart", cartRouter);


app.listen(port, () => {
    console.log('Sever Running on http://localhost:4000');
})

