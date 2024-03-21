const express = require("express");

const app = express();

const portNumber = 5016;

const sourceDir = "dist";

app.use(express.static(sourceDir));

app.use(express.static("public"));

app.listen(portNumber, () => {
    console.log(`Server started on http://localhost:${portNumber}`);

    console.log(`Serving content from /${sourceDir}/`);
});