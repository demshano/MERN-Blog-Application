const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const app =express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'});
const fs = require('fs');

const salt = bcrypt.genSaltSync(10);
const secret= 'dsgsrgthrtbh';

    app.use(cors({credentials:true,origin:'http://localhost:3000'}));
    app.use(express.json());
    app.use(cookieParser());
    app.use('/uploads', express.static(__dirname + '/uploads'));

     mongoose.connect('mongodb+srv://delabro99:sYdFZFTqsZwdsc9u@cluster0.t1lmi0o.mongodb.net/?retryWrites=true&w=majority');
//mongodb+srv://delabro99:sYdFZFTqsZwdsc9u@cluster0.t1lmi0o.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://delabro99:<password>@cluster0.t1lmi0o.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://delabro99:sYdFZFTqsZwdsc9u@cluster0.t1lmi0o.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://delabro99:sYdFZFTqsZwdsc9u@cluster0.t1lmi0o.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://delabro99:sYdFZFTqsZwdsc9u@cluster0.t1lmi0o.mongodb.net/?retryWrites=true&w=majority
    app.post('/register', async (req,res)=>{
        const {userName, password} = req.body;

        // algorithm start


        //algorithm end
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
                    res.cookie('token', token).json({
                        id:userDoc._id,
                        userName,
                    });
                    //res.json(token);
            })
        }
        else
        {
                res.status(400).json('wrong credentials');
        }
        
    });

    
    app.get('/profile', (req,res)=>{
        const {token} =req.cookies;
        jwt.verify(token,secret,{},(err,info)=>{
                if(err) throw err;
                res.json(info);
        })
        res.json(req.cookies);
    });

    app.post('/logout', (req,res)=>{
        res.cookie('token', '').json('ok');
    })

        
    app.post('/post', uploadMiddleware.single('file'), async (req,res)=>{
        const {originalname, path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path+'.'+ext
        fs.renameSync(path, newPath);

        const {token} =req.cookies;
        jwt.verify(token,secret,{}, async(err,info)=>{
                if(err) throw err;

                const {title,summary,content} = req.body;

                const postDoc = await Post.create({
                    title,
                    summary,
                    content,
                    cover:newPath,
                    author:info.id,
        });
        res.json(postDoc);

                //res.json(info);
        })

        
            //res.json(postDoc);

    });

    app.get('/post', async (req,res)=>{
        //const posts = await Post.find();
        res.json(await Post.find()
        .populate('author', ['userName'])
        .sort({createdAt: -1})
        .limit(20)
        );
    });


    app.get('/post/:id', async (req, res) =>{
        const {id} = req.params;
        const postDoc = await Post.findById(id).populate('author', ['userName']);
        res.json(postDoc)
    })

    // app.put('/post', uploadMiddleware.single('file'), async (req,res)=>{

    //     let newPath =null;
    //     if(req.file)
    //     {
    //         const {originalname, path} = req.file;
    //         const parts = originalname.split('.');
    //         const ext = parts[parts.length - 1];
    //          newPath = path+'.'+ext
    //         fs.renameSync(path, newPath);
    //     }
        
    //     const {token} =req.cookies;
    //     jwt.verify(token,secret,{}, async (err,info)=>{
    //             if(err) throw err;

    //         const {id,title,summary,content} = req.body;
    //         const postDoc =  await Post.findById(id)

    //         const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    //             //res.json({isAuthor,postDoc,info});
    //         //res.json({isAuthor})
    //         if(!isAuthor){
    //         return res.status(400).json('you are not author');
            
    //         }

    //            await postDoc.update(
    //             {
    //                 title,
    //                 summary, 
    //                 content,
    //                 //cover: newPath ? newPath : postDoc.cover,
    //             }
    //         )


    
         
    //     res.json(postDoc);

                
    //     })

    // })

    app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
        try {
          let newPath = null;
          if (req.file) {
            const { path } = req.file;
            newPath = path;
          }
      
          const { token } = req.cookies;
          jwt.verify(token, secret, {}, async (err, info) => {
            if (err) {
              throw err;
            }
      
            const { id, title, summary, content } = req.body;
            const postDoc = await Post.findById(id);
      
            if (!postDoc) {
              return res.status(404).json({ error: 'Post not found' });
            }
      
            if (postDoc.author.toString() !== info.id) {
              return res.status(403).json({ error: 'You are not the author of this post' });
            }
      
            postDoc.title = title;
            postDoc.summary = summary;
            postDoc.content = content;
      
            if (newPath) {
              postDoc.cover = newPath;
            }
      
            await postDoc.save();
      
            res.json(postDoc);
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred' });
        }
      });

    
app.listen(4000);