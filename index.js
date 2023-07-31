const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

apiTimeout = 5 * 1000;
// app.setTimeout(10 * 1000)

const delay = (t, val) => new Promise((resolve) => setTimeout(resolve, t, val));

app.post("/api/timeout", async (request, response, next) => {
  response.setTimeout(apiTimeout, () => {
    let err = new Error("Service Unavailable");
    err.status = 503;
    next(err);
  });
});

app.get("/api/ping", async (request, response, next) => {
  response.send({
    data: {
      status: "OK",
    },
  });
});

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
