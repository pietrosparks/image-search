const mongoose = require('mongoose');
const dbConnection = mongoose.connection;
const secrets = require('./secrets');
mongoose.connect(secrets.DATABASE);
mongoose.Promise = global.Promise;
module.exports = {

    connect() {
        dbConnection.on('error', console.error.bind(console, 'Mongoose Encountered an error'));
        dbConnection.once('open', () => {
            console.log('Connected to ImageDB');
        })

    }
}