const express = require('express');
const posts = require('./postDb');
// custom middleware
const { validatePostId, validatePost } = require('../middleware/middleware');

const router = express.Router();


router.get('/', (req, res) => {
  const message = process.env.MESSAGE || "hello from localhost"
  res.status(200).json ({api: "up", message});
  // do your magic!
  posts.get(req.query)
  .then(post => {
    res.status(200).json(post);
  })
  .catch(err => {
    res.status(500).json({
      error: 'Error finding post info.'
    });
  });
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  posts.getById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({errorMessage: 'Error finding posts with ID', err}))
  });


router.delete('/:id',validatePostId, (req, res) => {
  // do your magic!
  posts.remove(req.params.id)
  .then(post => {
    res.status(200).json({message:`post has been deleted`})
  })
  .catch(err => res.status(404).json({errorMessage: `Error deleting  post`, err}))
});

router.put('/:id', validatePost, validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params;

  posts.update(id, req.body)
    .then(() => {
      res.status(200).json({ success: 'Post was successfuly updated!', info: req.body });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Cant save the updates!', err });
    });
});


// function validatePostId(req, res, next) {
//   // do your magic!

// }

module.exports = router;
