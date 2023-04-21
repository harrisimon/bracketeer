'use strict'

const mongooseBaseName = 'bracketeer'

const database = {
    development: `mongodb://localhost/${mongooseBaseName}-development`,
    test: `mongodb://localhost/${mongooseBaseName}-test`
}

// Identify environment

const localDb = process.env.TESTENV ? database.test : database.development

const currentDb = process.env.MONGODB_URI || localDb

module.exports = currentDb