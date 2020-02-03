const routes = require("next-routes")();

routes
    .add("/manager", "/manager/Manager")
    .add("/manager/createClub", "/manager/CreateClub");

module.exports = routes;
