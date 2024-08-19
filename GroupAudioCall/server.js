const path = require("path");
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require("./webpack.config.js");

const app = express();
const compiler = webpack(webpackConfig);

const PORT = process.env.PORT || 3000;
const HOST = "planet-kit-quick-start.linecorp.com";

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
);

app.use(webpackHotMiddleware(compiler));

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

const https = require("https");
const selfsigned = require("selfsigned");

const attrs = [{ name: "commonName", value: HOST }];
const pems = selfsigned.generate(attrs, { days: 365 });

const options = {
  key: pems.private,
  cert: pems.cert,
};

https.createServer(options, app).listen(PORT, HOST, () => {
  console.log(`HTTPS Server is running on https://${HOST}:${PORT}`);
});
