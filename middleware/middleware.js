const posts = require('../posts/postDb');
const users = require('../users/userDb');

function logger(req, res, next) {
  console.log(`Method: ${req.method} 
  URL: ${req.originalUrl}`);
  next();
}

function validatePostId(req, res, next) {
  const { id } = req.params;
  posts.getById(id)
    .then((post) => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(404).json({ message: 'Error post ID' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error post ID 500', err });
    });
}

function validateUserId(req, res, next) {
    const { id } = req.params;
    users.getById(id)
      .then((user) => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(404).json({ message: 'Error user ID' });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: 'Error user ID 500', err });
      });
}

function validateUser(req, res, next) {
    resource = {
        name: req.body.name
      };
  
      if (!req.body.name) {
        return res.status(404).json({ message: "Error missing user data" });
      } else {
        req.user = resource;
        next();
      }
    };

function validatePost(req, res, next) {
  resource = {
    text: req.body.text,
    user_id: req.params.id
  };

  if (!req.body.text) {
    return res.status(404).json({ message: "Error missing post data" });
  } else {
    req.text = resource;
    next();
  }
};



module.exports = {logger,validatePostId,validatePost,validateUserId,validateUser};