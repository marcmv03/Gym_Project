const dotenv = require('dotenv').config();

module.exports = {

  HOST: process.env.HOST ,
  PORT: process.env.PORT ,
  SECRET_KEY : process.env.SECRET_KEY,
  DATABASE : process.env.DATABASE,
  USER_DB : process.env.USER_DB,
  PASSW_DB : process.env.PASSW_DB || ""

} ;