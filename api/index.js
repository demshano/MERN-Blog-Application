const express = require('express');
const app =express();

app.get('/test', (req,res)=>{
    res.json('test ok and nodemon is working');
});

app.listen(4000);