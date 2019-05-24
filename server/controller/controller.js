const User = require("../schemas/user");

module.exports = function(connect) {
  return {
    registerUser: (req, res) => {
      const { firstName, lastName, email, location } = req.body;
      connect()
        .then(async connection => {
          const user = await User.create({
            firstName,
            lastName,
            email,
            location
          });
        })
        .then(() => {
          User.find({}).then(user => {
            res.status(200).send(user);
          });
        })
        .catch(err => res.status(200).send(err.errmsg));
    },
    findUser: (req, res) => {
      connect()
        .then(async connection => {
          User.find({ firstName: req.query.name })
            .then(student => {
              // technically student a javascript object, it is a document object
              res.status(200).send(student);
            })
            .catch(e => res.status(200).send(e.errmsg));
        })
        .catch(err => console.log(err));
    }
  };
};
