const express = require("express");
const cors = require("cors");

const app = express()

app.use(cors());
app.use(express.json())


app.get('/', function (req, res, next) {
    res.json({success: true});
});

app.post('/login', function (req, res, next) {
    const success = req.body.username === "admin" && req.body.password === "1234";
    if (success) {
        res.status(200);
    } else {
        res.status(401);
    }
    res.send();
});

app.post('/register', function (req, res, next) {
    res.json({id: 'new-generated-id'});
});

app.listen(8080, function () {
    console.log('starting wbox-forms test server');
});
