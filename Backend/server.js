const mongoose = require('mongoose');
require('dotenv').config()
const app = require('./app.js');

const url = 'mongodb+srv://$_USERNAME_$:$_PASSWORD_$@cluster0.eimdsfm.mongodb.net/$_DB_NAME_$?retryWrites=true&w=majority&appName=Cluster0';


let dbLink = url.replace("$_USERNAME_$", process.env.DBUSER);
dbLink = dbLink.replace("$_PASSWORD_$", process.env.DBPASSWORD);
dbLink = dbLink.replace("$_DB_NAME_$", process.env.DBNAME);

mongoose.connect(dbLink).then(() => {
    console.log('-------- Database Connected --------');
});

app.listen(1400, () => {
    console.log('----------- App Started -----------')
});