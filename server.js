const express = require('express');
const server = express();
const PORT = process.env.PORT || 5000;
const path = require('path');


server.use(express.static(path.join(__dirname, 'client/build')));


server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
