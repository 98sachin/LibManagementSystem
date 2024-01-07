const express = require("express");

//JSON data import
// importing the data here form the data folder
const{users} = require("../data/users.json");
const { getAllUsers, getSingleUserById, deleteUser, updateUserById, createNewUser, getSubscriptionDetailsById } = require("../controllers/user-controller");

const router = express.Router();  // initializing the router

// now we can start defining the APIs.

/**
 * route: /users
 * method: GET
 * description: get all users
 * access: Public
 * parameters: None
 */
// building /users api, to get all the users
// router.get("/",(req,res)=>{
//     res.status(200).json({
//         success: "True",
//         data: users
//     })
// })
router.get("/", getAllUsers);


/**
 * route: /users
 * method: GET
 * description: get all users
 * access: Public
 * parameters: None
 */
// building /users/:id api, to get all the users
// router.get("/:id",(req,res)=>{
//     const {id} = req.params; // getting the id
//     const user = users.find((each)=> each.id===id); //crosschecking the user with the given id really exist or not
//     if(!user){  // if we don't find the user
//         return res.status(404).json({
//             success:false,
//             message: "user not found"
//         })
//     }
//     return res.status(200).json({  // if we find the user
//         success: true,
//         data: user
//     })
// })
router.get("/:id",getSingleUserById)

/**
 * route: /users
 * method: POST
 * description: create a new user
 * access: Public
 * parameters: None
 */
// router.post("/",(req,res)=>{
//     const {id,name,surname,email,subscriptionType,subscriptionDate} = req.body;
//     const user = users.find((each)=>each.id===id); //crosscheck if the user exist in the particular table or not

//     if(user){
//         return res.status(404).json({
//             success:false,
//             message: "User already exist with the given id"
//         })
//     }
//     users.push({
//         id,
//         name,
//         surname,
//         email,
//         subscriptionType,
//         subscriptionDate
//     })
//     return res.status(201).json({
//         success: true,
//         data: users
//     })
// })
router.post("/",createNewUser)

/**
 * route: /users/:id
 * method: PUT
 * description: updating user by id
 * access: Public
 * parameters: id
 */
// router.put("/:id",(req,res)=>{
//     const {id} = req.params;  //to get the id
//     const {data} = req.body;  // user wants to update a random info. which is passed via body

//     const user = users.find((each)=>each.id===id); // crosscheck if the user is present or not
//     if(!user){ // if we don't have the user
//         return res.status(404).json({
//             success: false,
//             message: "user not found"
//         })
//     }
//     const updateUser = users.map((each)=>{  // if we have the user, then we need to update the user
//         if(each.id===id){
//             return{      // if it matches then we will update(here we are using spread operator)
//                 ...each,
//                 ...data
//             };
//         }
//         return each;  // if it doesn't matches the we will get the same thing.
//     })
//     return res.status(200).json({
//         success: true,
//         data: updateUser
//     })
// })
router.put("/:id",updateUserById)

/**
 * route: /users/:id
 * method: DELETE
 * description: deleting user by id
 * access: Public
 * parameters: id
 */
// router.delete("/:id",(req,res)=>{
//     const {id} = req.params;
//     const user = users.find((each)=>each.id===id);
//     if(!user){   // if we don't find the user
//         return res.status(404).json({
//             success: false,
//             message: "User Not Found"
//         })
//     }
//     const index = users.indexOf(user);    // if we find the user then we need to delete the user
//     users.splice(index,1);

//     return res.status(200).json({
//         success: true,
//         data:users
//     })
// })
router.delete("/:id",deleteUser)

/**
 * route: /users/subscription-details/:id
 * method: GET
 * description: Get all user subscription details
 * access: Public
 * parameters: Id
 */
// router.get("/subscription-details/:id",(req,res)=>{
//     const {id} = req.params;  // to check whether the user exist for a particular id.
//     const user = users.find((each)=>each.id===id);

//     if(!user){
//         return res.status(404).json({
//             success:false,
//             message:"user not found"
//         })
//     }
//     const getDateInDays = (data = "")=>{
//         let date;
//         if(data===""){
//             date=new Date();
//         }else{
//             date= new Date(data);
//         }
//         let days = Math.floor(data/1000*60*60*24);
//         return days;
//     }
//     const subscriptionType = (date)=>{
//         if(user.subscriptionType==="Basic"){
//             date=date+90;
//         }else if(user.subscriptionType==="Standard"){
//            date=date+180;
//         }else if(user.subscriptionType==="Premium"){
//             date=date+365;
//         }
//         return date;
//     };

//     //Subscription expiration calculation
//     //Jan 01 1970(dates are calculated from this date as a default parameter) and its always claculated in miliseconds

//     let returnDate = getDateInDays(user.returnDate);
//     let currentDate = getDateInDays();
//     let subscriptionDate = getDateInDays(user.subscriptionDate);
//     let subscriptionExpiration = subscriptionType(subscriptionDate);

//     const data = {
//         ...user,
//         subscriptionExpired: subscriptionExpiration < currentDate,
//         daysLeftForExpiration: subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate,
//         fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0,
//     }
//     return res.status(200).json({
//         success: true,
//         data,
//     })
// })
router.get("/subscription-details/:id",getSubscriptionDetailsById)

module.exports = router;