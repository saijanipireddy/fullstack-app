import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import { addFood } from './controllers/foodController.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js'
import bcryptjs from 'bcryptjs';
//app config 

const app = express()
const port = process.env.PORT || 4000

// middleware 

app.use(express.json())
app.use(cors())
app.use('/images', express.static(path.join(__dirname, 'uploads')));

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

