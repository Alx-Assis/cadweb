const knex = require("knex")
const configuration = require('../../knexfile')

/*
const configuration = require('../../knexfile')onst config = process.env.NODE_ENV == 'development' ? configuration.development : configuration.test
*/

const config = configuration.development


const connection = knex(config)

module.exports = connection 
