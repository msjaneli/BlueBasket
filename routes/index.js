// Mounts the routes on the express app.

const test = require("./test");
const user = require("./user");
const restaurant = require("./restaurant");
const listing = require("./listing");
const order = require("./order");
const shelter = require("./shelter");
const donation = require("./donation");

module.exports = app => {
  app.use("/test", test);
  app.use("/user", user);
  app.use("/restaurant", restaurant);
  app.use("/listing", listing);
  app.use("/order", order);
  app.use("/shelter", shelter);
  app.use("/donation", donation);
};
