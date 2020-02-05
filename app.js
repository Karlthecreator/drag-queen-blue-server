require('dotenv').config();
let express = require('express');
// let multer = require('multer');
// let ejs = require('ejs');
// let path = require('path')
let app = express();
let sequelize = require('./db');
let user = require('./controllers/user-controller');
let profile = require('./controllers/profile-controller');

// SET STORAGE ENGINE
// const storage =  multer.discStorage({
//     destination: './public/uploads/',
//     filename: function(req, file, cb){
//         cb(null, file.fieldname)
//     }
// })


// EJS

// app.set('view engine', 'ejs')

// PUBLIC FOLDER

// app.use(express.static('./public'))

app.use(require('./middleware/headers'))
sequelize.sync();
// sequelize.sync({force: true})

app.use(express.json());


app.use('/user', user);
app.use('/profile', profile);



app.listen(process.env.PORT, () => {
    console.log(`App is listening on ${process.env.PORT}.`)
})