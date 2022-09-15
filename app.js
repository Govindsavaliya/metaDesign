require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./db/conn");
const bcrypt = require("bcryptjs");


const User = require("./model/user.model");
const Meta = require("./model/meta.model");

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

const userRoutes = require("./routes/meta.routes");
app.use("/meta", userRoutes);

app.listen(port, () => {
    console.log(`Server Running At PORT : ${port}`);
})


