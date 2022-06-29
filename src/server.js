const express = require("express");
const router = require("./routes/routes.js");

const PORT = process.env.PORT || 5005;
const app = express();

app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`server run: localhost:${PORT}`));
