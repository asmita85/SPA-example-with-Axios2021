const express = require("express");
const router = express.Router();
const Pizza = require("../models/pizza");

//Create 
  router.post('/', (request, response) => {
    const newPizza = new Pizza.model(request.body)
    newPizza.save((err, pizza) => {
      return err ? response.sendStatus(500).json(err) : response.json(pizza)
    })
  })

  //Read all 
  router.get('/', (request, response) => {
    Pizza.model.find({}, (error, data) => {
      if (error) return response.sendStatus(500).json(error)
      return response.json(data)
    })
  })


//Read one by ID
router.get('/:id', (request, response) => {
    Pizza.model.findById(request.params.id, (error, data) => {
        if (error) return response.sendStatus(500).json(error)
        return response.json(data)
    });
});

//Delete by ID 
router.delete('/:id', (request, response) => {
    Pizza.model.findByIdAndDelete(request.params.id, (error, data) => {
        if (error) return response.sendStatus(500).json(error)
        return response.json(data)
    });
});

//Update route
router.put('/:id', (request, response) => {
    const body = request.body;
    Pizza.model.findByIdAndUpdate(
      request.params.id,
      { $set: {	"crust": body.crust,
        "cheese": body.cheese,
        "sauce": body.sauce,
        "toppings": body.toppings
      } },
      (error, data) => {
        if (error) return response.sendStatus(500).json(error);
        return response.json(request.body);
      }
    );
  });


  

    module.exports = router;
