const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

fs.readdirSync(__dirname)
  .filter(file => file.endsWith('.js') && file !== 'index.js')
  .forEach(file => {
    const routeName = `/${file.slice(0, -3)}`;
    const routeModule = require(path.join(__dirname, file));
    router.use(routeName, routeModule);
  });

module.exports = router;