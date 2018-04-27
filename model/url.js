const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = Schema({
   search_term:{
       type: String
   },
   when:{
       type:Date,
       default: Date.now()
   }
})

module.exports = mongoose.model('Urls', urlSchema);