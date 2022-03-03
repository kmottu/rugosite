const { authJwt } = require("../middlewares");
const controller = require("../controllers/data.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    authJwt.verifyToken(req, res, next);
    // next();
  });

  app.post("/api/data/mesure", controller.postMesure);
  app.get("/api/data/mesures", controller.getMesure);
  app.delete("/api/data/mesure/:id", controller.deleteMesure);

  app.get("/api/data/utilisateurs", controller.getUtilisateur);
  app.delete("/api/data/utilisateur/:id", controller.deleteUtilisateur);

  app.post("/api/data/organisme", controller.postOrganisme);
  app.get("/api/data/organismes", controller.getOrganisme);
  app.delete("/api/data/organisme/:id", controller.deleteOrganisme);

  app.post("/api/data/rugosite", controller.postRugosite);
  app.get("/api/data/rugosite", controller.getRugosite);
  app.delete("/api/data/rugosite/:id", controller.deleteRugosite);

  app.post("/api/data/transformation", controller.postTransformation);
  app.get("/api/data/transformations", controller.getTransformation);
  app.delete("/api/data/transformation/:id", controller.deleteTransformation);
}