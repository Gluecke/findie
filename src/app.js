const express = require("express");
const doordashRouter = require('./routes/doordashRouter');
const managementRouter = require('./routes/managementRouter');
const app = express();
const port = process.env.PORT || 8080;

app.use('/api/doordash', doordashRouter);
app.use('/api/management', managementRouter);

app.listen(port, () => console.log(`App listening on port ${port}!`));
