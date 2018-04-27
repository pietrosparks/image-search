require('dotenv').load()

let MONGO_DB; 

if (process.env.NODE_ENV="production"){
    MONGO_DB = process.env.MONGODB_PROD;
}
MONGO_DB = process.env.MONGODB_DEV;

module.exports = {
    DATABASE:MONGO_DB,
    CSE: process.env.CSE_ID,
    GOOG_API: process.env.GOOG_SERVER_API
};