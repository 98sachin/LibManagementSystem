const {BookModel, UserModel} = require("../models");
const userModel = require("../models/user-model");

// API #1 to get all the user from the table
exports.getAllUsers = async(req,res) => {
    const users = await UserModel.find();

    if(users.length===0){
        return res.status(404).json({
            success: false,
            message:"No User found"
        })
    }
    return res.status(200).json({
        success:true,
        data: users
    })
}

// API #2
exports.getSingleUserById = async(req,res) => {
    const {id} = req.params;

    // now we will crosscheck if the particular id is present or not. this can be written in two ways
    // const user = await UserModel.findById({_id:id})  //one way OR
    const user = await UserModel.findById(id); // the other way both are same
    if(!user){
        return req.status(404).json({
            success: false,
            message: "User Not Found"
        })
    }
    return res.status(200).json({
        success: true,
        data: user
    })
}

// API #4
exports.deleteUser = async(req,res)=>{
    const {id} = req.params;

    const user = await UserModel.deleteOne({
        _id:id,
    })
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User Not Found"
        })
    }
    return res.status(202).json({
        success: true,
        message: "Deleted the User Successfully"
    })
}

// API #5
exports.updateUserById = async(req,res)=>{
    const {id} = req.params;
    const{data} = req.body;

    const updatedUserData = await userModel.findOneAndUpdate({
        _id:id
    },{
        // update the data
        $set:{
            ...data
        }
    },{
        new: true
    })
    return res.status(202).json({
        success:true,
        data: updatedUserData
    })
}

// API #6
exports.createNewUser = async(req,res)=>{
    const {name,surname,email,subscriptionType,subscriptionDate} = req.body; // we are not getting id here is because databse id is automatically generated
    const newUser = await UserModel.create({
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    });
    return res.status(201).json({
        success: true,
        data: newUser
    })
}

// API #7
exports.getSubscriptionDetailsById = async(req,res)=>{
    const {id} = req.params;
    const user = await UserModel.findById(id);

    if(!user)
    return res.status(404).json({
        success:false,
        message:"User Not Found!!"
    })

        const getDateInDays = (data = "")=>{
        let date;
        if(data===""){
            date=new Date();
        }else{
            date= new Date(data);
        }
        let days = Math.floor(data/1000*60*60*24);
        return days;
    }
    const subscriptionType = (date)=>{
        if(user.subscriptionType==="Basic"){
            date=date+90;
        }else if(user.subscriptionType==="Standard"){
           date=date+180;
        }else if(user.subscriptionType==="Premium"){
            date=date+365;
        }
        return date;
    };

    //Subscription expiration calculation
    //Jan 01 1970(dates are calculated from this date as a default parameter) and its always claculated in miliseconds

    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        subscriptionExpired: subscriptionExpiration < currentDate,
        daysLeftForExpiration: subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate,
        fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0,
    }
    return res.status(200).json({
        success: true,
        data,
    })
}