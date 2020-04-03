const db = require("../db/_config.db");
const Task = db.tasks;

exports.create = (req, res) => {
  if (!req.body.title || !req.body.userId) {
    res.status(400).send({
      message: "Error! JSON can not be empty!"
    });
    return;
  }

  const json = {
    title: req.body.title,
    description: req.body.description,
    userId: req.body.userId,
  };
  Task.create(json)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message
      });
    });
};

exports.findAll = (req, res) => {
  if (!req.body.userId) {
    res.status(400).send({
      message: "Error! JSON can not be empty!"
    });
    return;
  }

  const json = { userId: req.body.userId };

  Task.findAll({ where: json })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Task.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error! " + id + " not found"
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Task.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Success"
        });
      } else {
        res.send({
          message: `Error! ${id} not found`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error! ${id} not found`
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Task.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Success"
        });
      } else {
        res.send({
          message: `Error! ${id} not found`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error! ${id} not found`
      });
    });
};