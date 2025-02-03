import foodModel from "../models/foodModel.js";
import foodRouter from "../routes/foodRoute.js";
import fs from 'fs';
import path from "path";


//ADD FOOD API // 

const addFood = async (req,res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })

    try {
        await food.save();
        return res.json({success:true, message:"Food Added"})
    }
    catch(err) {
        console.log(err);
        return res.json({success:false,message:"Error"});
    }

}

//ADD FOOD API ENDING ///


//ALL FOOD LIST //

const foodList = async (req,res) => {
    try {
        const foods = await foodModel.find({})
        res.json({success:"true", data: foods})

    }
    catch(error) {
        console.log(error);
        res.json({success: "false", message: "Error"})
    }
}

//ALL FOOD LIST ENDING //  



// REMOVE FOODITEM //

const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        fs.unlink(`uploads/${food.image}`, () => {})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Food Removed Succesfully"})
    }
   catch(error) {
        console.log(error)
        res.json({success:false, message: "Error"})
   }
}

//REMOVE FOODITEM END //


export {addFood, foodList, removeFood}