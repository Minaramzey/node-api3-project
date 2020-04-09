const express = require('express');
const users = require('./userDb.js');
const posts = require('../posts/postDb');

const router = express.Router();

//custom middleware
const { validateUser, validateUserId, validatePost } = require('../middleware/middleware');

router.post('/', validateUser, (req, res) => {
  // do your magic!
  const userInfo = req.body;
  users.insert(userInfo)
    .then((user) => {
      res.status(201).json({ success: true, user });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: 'Error saving the user to the database', err });
    });
});

router.post('/:id/posts',  validatePost, validateUserId, (req, res) => {
  // do your magic!
  const userid = req.params.id;
  const { text } = req.body;

  users.getById(userid)
    .then((post) => {
      if (!post) {
        null;
      } else {
        const newPost = { text, userid };
        posts.insert(newPost)
          .then((postnew) => res.status(201).json({ success: postnew }));
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'Error while saving the post to the database', err });
    });
});

router.get('/', (req, res) => {
  // do your magic!
  users.get(req.query)
  .then((users) => {
    res.status(200).json(users);
  })
  .catch((err) => {
    res.status(500).json({
      message: 'Error getting the users', err,
    });
  });
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  users.getById(req.params.id)
  .then((user) => {
    res.status(200).json(user);
  })
  .catch((err) => {
    res.status(500).json({ message: 'Error getting the user 500', err });
  });
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  users.getUserPosts(req.params.id)
  .then((post) => {
    res.status(200).json({ success: true, post });
  })
  .catch((err) => {
    res.status(500).json({ error: 'Posts information could not be retrieved.', err });
  });
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  users.remove(req.params.id)
  .then(() => {
    res.status(200).json({ message: 'User has been deleted' });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ message: 'Error deleting the user 500', err });
  });
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  const { id } = req.params;

  users.update(id, req.body)
    .then((user) => {
      res.status(200).json({ success: 'Info Updated!', info: req.body, user });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Cant provide any info', err });
    });
});


// function validateUserId(req, res, next) {
//   // do your magic!
// }

// function validateUser(req, res, next) {
//   // do your magic!
// }

// function validatePost(req, res, next) {
//   // do your magic!
// }

module.exports = router;
