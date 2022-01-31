// Third party libraries
let express = require('express');
let compression = require('compression');
const { PORT }  = require('./lib/config');

// Routes
const initRoutes = require('./routes')

const app = express();

// Middlwwares
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('env', 'development')
app.disable('x-powered-by')

// Routes
initRoutes(app)

// Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))