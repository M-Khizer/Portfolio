const adminSchema = require('../model/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const PORT= process.env.PORT;
const secretKey = process.env.TOKEN_KEY;
console.log(PORT,secretKey)

exports.getAdmin = async (req, res) => {
    try {
      res.send('hello'); // Sending a plain text response
    } catch (err) {
      res.status(500).send(err); // Handling errors and sending an error response
    }
  };
  

exports.adminRegister = async(req,res)=>{
    
    const {username,password} = req.body;
    console.log(username,password)
    
    if(!(username && password)){
        res.status(400).json({
            success:false,
            message:'All inputs required'
        });
    }

    try{

        const oldUser = await adminSchema.findOne({username});


        if(oldUser){
            res.status(409).send("User already exists");
        }
    
        const hashedPassword = await bcrypt.hash(password,10);
    
        const user = new adminSchema({
            username,
            password:hashedPassword
        })
        
        user.save();
    
        const token = jwt.sign(
            {
                user_id : user._id,username
            },
            secretKey,
            {
                expiresIn: '2h'
            }
            
        )
        user.token = token; 
    
    
        res.status(200).json({
            success:true,
            user
        })

    }
    catch (error) {
        // Handle any potential errors, e.g., database errors, bcrypt errors
        return res.status(500).json({ success: false, message: "Registration failed" });
    }
}


exports.adminLogin = async(req,res)=>{
    try{
        const {username,password} = req.body;
        const user = await adminSchema.findOne({username});
        if(!user){
            res.status(404).send('USer not found')
        }
        res.status(200).json({
            success:true,
            user
        })
    }
    catch(err){
        console.log(err)
    }
    
}