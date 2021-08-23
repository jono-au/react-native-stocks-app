
const router = require('express').Router();

let Stocklist = require('../models/stockslist.model'); 


router.get('/list' , async (req, res) => {
    const list = await Stocklist.find({ userId: req.user._id});

    res.send(list);
});



 //first route incoming get request
 router.route('/').get((req, res) =>{
     Stocklist.find()
         .then(stocklists => res.json(stocklists))
         .catch(err => res.status(400).json('Error: '+ err));
 });

 router.route('/:id').get((req, res) =>{
    Stocklist.findById(req.params.id)
        .then(stocklists => res.json(stocklists))
        .catch(err => res.status(400).json('Error: '+ err));
});

 router.route('/add').post((req, res) =>{
     const list = req.body.list;

     //create new instance of user
     const newStocklist = new Stocklist({list});

     //save to database mongodb
     newStocklist.save()
         .then(() => res.json('Stock added to List!'))
         .catch(err => res.status(400).json('Error: ' + err));
 });

 module.exports = router;


//update data api endpoint 
router.route('/update/:id').put((req, res) => {
    Stocklist.findById(req.params.id)
        .then(stockslist => {
            stockslist.list = req.body.list;

            stockslist.save()
                .then(() => res.json('List updated!'))
                .catch(err => res.status(400).json('Error: '+ err));
        })
         .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/delete/:id').delete((req, res) => {
    Stocklist.findByIdAndDelete(req.params.id)
        .then(() => res.json('list deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

