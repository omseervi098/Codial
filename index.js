const express = require("express");
const router = require("./routes/index");

const app = express();
const port = 3000;
//Use express Router
app.use("/", require("./routes/index"));
//Setting up the view engine
app.set('view engine', 'ejs');
app.set('views','./views');
app.listen(port, (err) => {
  if (err) {
    console.log(`Error : ${err}`);
    return;
  }
  console.log(`Server is running on port ${port}`);
});
