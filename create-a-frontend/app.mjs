import bodyParser from "body-parser";
import express from "express";
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// config
const port = 3030;
// set the view engine to ejs
app.set("view engine", "ejs");

// Home page
app.get("/", (_, res) => {
  // Create redirect uri
  const href = "#";
  res.render("index", { href });
});

// OAuth callback for frontend app
app.get("/oauth", async (req, res) => {
  const { code, state } = req.query;
  if (!code) {
    res.send("No code");
    return;
  }

  console.log("code:", code, "state:", state);
  res.send("Code: " + code + " State: " + state);
});

// Start server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
