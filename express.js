const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const portNumber = 5016;

const sourceDir = "dist";

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(sourceDir));

app.use(express.static("public"));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(portNumber, () => {
    console.log(`Server started on http://localhost:${portNumber}`);

    console.log(`Serving content from /${sourceDir}/`);
});