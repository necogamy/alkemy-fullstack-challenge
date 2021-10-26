const express = require('express');
const server = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

const authRouter = require('./routes/jwtAuth');
const dashboardRouter = require('./routes/dashboard');


server.use(express.json());
server.use(express.static(path.join(__dirname, 'client/build')));

server.use(authRouter);
server.use(dashboardRouter);


server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
