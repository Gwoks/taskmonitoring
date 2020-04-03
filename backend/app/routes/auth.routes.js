const { verifySignUp, authJwt } = require("../middleware/_index");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup/user",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post(
    "/api/auth/signup/manager",
    [
      verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted,
      authJwt.verifyToken, authJwt.isAdmin
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};
