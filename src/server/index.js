const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const router = express.Router();
const isProduction = ["production", "development"].includes(
  process.env.NODE_ENV
);

const buildPath = path.normalize(
  path.join(__dirname, isProduction ? "../build" : "../../local_build")
);
const buildIndexHtml = path.join(buildPath, "index.html");

app.use(cookieParser());

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

app.use("/static", express.static(`${buildPath}/static`));
app.use("/favicon.ico", express.static(`${buildPath}/favicon.ico`));

if (isProduction) {
  app.use("/manifest.json", express.static(`${buildPath}/manifest.json`));
} else {
  app.use("/static/bundle.js", express.static(`${buildPath}/static/bundle.js`));
}

router.get("*", (req, res, next) => {
  fs.readFile(buildIndexHtml, "utf-8", (err, data) => {
    if (err) {
      console.error("SERVER_ERROR: ", err);
      return res
        .status(500)
        .send(
          "Something went wrong on our side. Please contact our technical team"
        );
    }

    return res.send(data);
  });
});

if (process.env.PORT) {
  app.listen(process.env.PORT, () =>
    console.log(`Listening the app on port ${process.env.PORT}`)
  );
}

app.use("/", router);

module.exports = app;
