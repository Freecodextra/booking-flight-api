const express = require("express");
const { json } = require("express");
const routes = require("./routes/flightRoute");

const app = express();

app.use(json());

app.use("/", routes);
app.use('/flights', routes);
app.use('/flights/:id', routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
