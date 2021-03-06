const { authJwt } = require("../middleware/_index");
const tasks = require("../controllers/task.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/tasks",
    [authJwt.verifyToken, authJwt.isUser], tasks.create);

  app.get("/api/tasks", [authJwt.verifyToken], tasks.findAll);

  app.get("/api/tasks/:id", [authJwt.verifyToken], tasks.findOne);

  app.put("/api/tasks/:id", [authJwt.verifyToken, authJwt.isUser], tasks.update);

  app.delete("/api/tasks/:id", [authJwt.verifyToken], tasks.delete);

};
