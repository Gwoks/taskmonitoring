const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const db = require("./app/db/_config.db");
const init = require("./app/db/_init.db")
const port = process.env.PORT || 3000;
const isDropDb = process.env.IS_DROP_DB || false;
const app = express();

var corsOptions = {
    origin: [process.env.CORS_ORIGIN,
    process.env.CORS_ORIGIN_WEB],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Access-Control-Allow-Methods",
        "Access-Control-Request-Headers",
        "x-access-token"
    ],
    credentials: true,
    enablePreflight: true
};
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.Database.sync({ force: isDropDb }).then(() => {
    init()
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

require("./app/routes/task.routes")(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);