const routes = require("next-routes")();

routes
    .add("/manager", "/manager/Manager")
    .add("/manager/createClub", "/manager/CreateClub")
    .add("/manager/club/:clubAddress", "/manager/Club");

module.exports = routes;
