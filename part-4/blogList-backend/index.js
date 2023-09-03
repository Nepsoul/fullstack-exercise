const mongoUrl = require("./utils/config");
const { info } = require("./utils/logger");
const app = require("./app");

app.listen(mongoUrl.PORT, () => {
  info(`Server running on PORT ${mongoUrl.PORT}`, "logging from index file");
});
