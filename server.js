const express = require('express');
const server = express();
const path = require('path');
const PORT = process.env.PORT || 5000;

// middlewares
server.use(express.json());

// serve client files
server.use(express.static(path.join(__dirname, 'client/build')));

// server routes
const authRouter = require('./routes/jwtAuth');
const dashboardRouter = require('./routes/dashboard');

server.use(authRouter);
server.use(dashboardRouter);

// redirect to client files
server.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
