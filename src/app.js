const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const router = require('./routes/taskRouter');
const feedrouter = require('./routes/feedRouter');
const profileRoutes = require('./routes/routes')
const app = express();

app.set('port', process.env.PORT || 3005);
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use('/api', feedrouter )
app.use('/api',profileRoutes)


module.exports = app;
    


