const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
  // be sure to include its associated Products
    include: Product
  })
    .then((dbCatData) => res.json(dbCatData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
  // be sure to include its associated Products
    include: {
      model: Product
    }
  })
    .then((dbCatData) => {
      if (!dbCatData) {
        res.status(404).json({ message: 'There is no Category with that ID' });
        return;
      }
      res.json(dbCatData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then((dbCatData) => res.json(dbCatData))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Category was not created' }, err)
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then((dbCatData) => {
      if(!dbCatData[0]) {
        res.status(404).json({ message: 'There is no Category with that id' });
        return;
      }
      res.json(dbCatData);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((dbCatData) => {
      if(!dbCatData) {
        res.status(404).json({ message: 'There is no Category with that id' });
        return;
      }
      res.json(dbCatData);
    })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
});

module.exports = router;
