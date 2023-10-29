const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const app =express();
const jwt = require('jsonwebtoken');

const salt = bcrypt.genSaltSync(10);
const secret= 'dsgsrgthrtbh';

    app.use(cors({credentials:true,origin:'http://localhost:3000'}));
    app.use(express.json());
     mongoose.connect('mongodb+srv://delabro99:sYdFZFTqsZwdsc9u@cluster0.t1lmi0o.mongodb.net/?retryWrites=true&w=majority');

    app.post('/register', async (req,res)=>{
        const {userName, password} = req.body;
        try{

            const userDoc= await User.create(
                {
                    userName,
                    password:bcrypt.hashSync(password,salt),
                }
                );
            res.json(userDoc);
        }
        catch(e){
            res.status(400).json(e);
        }
        //res.json('test ok and nodemon is working and the server is fine...');

    });

    //for login
    app.post('/login', async (req,res)=>{
        const {userName, password} = req.body;
        const userDoc = await User.findOne({userName});
        //res.json(userDoc);
        const passOk=bcrypt.compareSync(password, userDoc.password);
        //res.json(passOk);
        if(passOk)
        {
            //logged in
            jwt.sign({userName,id:userDoc._id}, secret ,{},(err,token)=>{
                    if(err) throw err;
                    res.cookie('token', token).json('ok');
                    //res.json(token);
            })
        }
        else
        {
                res.status(400).json('wrong credentials');
        }
        
    });

    
        
        


    //const passOk=bcrypt.compareSync(password, userDoc.password);
        //res.json(passOk);
app.listen(4000);