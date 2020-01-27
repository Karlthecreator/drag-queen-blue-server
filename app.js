require('dotenv').config();
let express = require('express');
let app = express();
let sequelize = require('./db');
let user = require('./controllers/user-controller');
let profile = require('./controllers/profile-controller');

sequelize.sync();
// sequelize.sync({force: true})

app.use(express.json());
app.use(require('./middleware/headers'))


app.use('/user', user);
app.use('/profile', profile);



app.listen(process.env.PORT, () => {
    console.log(`App is listening on ${process.env.PORT}.`)
})