const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const authRoutes = require('./routes/auth');
const verifyToken = require('./routes/verifyToken');

app.get('/', (req, res) => {
    res.send('Welcome to the auth system');
})

app.get('/api/user/profile', verifyToken, (req, res) => {
    res.send({success: true, data: req.user})
})

app.use('/api/users', authRoutes);

mongoose.connect('mongodb+srv://stocksapp:gxcx5XEiUaAG0oDi@stocks-app.vczyf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

    .then(()=>{
        app.listen(3000, () => console.log('server is running'));
    })
    .catch(err => console.log(err))


//import routes 
const stockslistsRouter = require('./routes/stockslists');


// list routes 
const listRoutes = require('./routes/stockslists');

app.use('/stockslist',stockslistsRouter);
