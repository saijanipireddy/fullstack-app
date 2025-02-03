import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import validator from 'validator'


const loginUser = async (req,res) => {
  const {email,password} = req.body;

  try {
    const user = await userModel.findOne({email})

    if (!user) {
        return res.json({success:false,message:"User Not Found"});
    }
    const isMatched = await bcryptjs.compare(password,user.password);
    if(!isMatched) {
        return res.json({success:false, message: "Invalid Credentials"})
    }
    const token = createToken(user._id);
    res.json({success:true, token})
  }
  catch(error) {
    console.log(error);
    return res.json({success: false, message: "Error"})
  }
}

const createToken = (id) => {
    return jwt.sign({id}, 'secretKey');
}

//Register User 
const registerUser = async (req,res) => {
    const {name,email,password} = req.body;
    try {
        const exist = await userModel.findOne({email})
        if (exist) {
            return res.json({success:false, message:"User Already Exists"})
        }
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Please Enter a Valid Email"})
        }
        if (password.length < 8) {
            return res.json({success:false, message: "Please Enter a Strong Password"})
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const newuser = new userModel ({
            name: name,
            email: email,
            password: hashedPassword
        })
        const user = newuser.save();
        const token = createToken(user._id);
        res.json({success:true,token});
    }
    catch(error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }

}

export {loginUser,registerUser}