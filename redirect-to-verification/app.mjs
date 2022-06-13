import bodyParser from "body-parser";
import express from "express";
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// config
const port = 3030;
const config = {
  clientId: "b684529c3013ff71ad3b",
  clientSecret: "1ee3795fb7550411dc14d836f460afac85ff07f2e159dbff",
  redirectUri: "http://localhost:3030/oauth",
};
const appState = "test";
const frontendUrl = `https://fidelity-verification.vercel.app`;

// set the view engine to ejs
app.set("view engine", "ejs");

// Home page
app.get("/", (_, res) => {
  // Create redirect uri
  const href = `${frontendUrl}/verify?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&response_type=code&state=${appState}`;
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
