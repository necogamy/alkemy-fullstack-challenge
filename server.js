const express = require('express');
const server = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

const authRouter = require('./routes/jwtAuth');



server.use(express.json());
server.use(express.static(path.join(__dirname, 'client/build')));
server.use(authRouter);


server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
