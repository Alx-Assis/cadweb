const knex = require('knex')
const configuration = require('../../knexfile');

/*const config = process.env.NODE_ENV == 'development' ? configuration.development : configuration.test
*/
  
const config = configuration.production;
const connection = knex(config);
module.exports = connection 
